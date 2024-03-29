const axios = require("axios").default;
const User = require("../Models/User");
const City = require("../Models/City");

const appid = "fe8a035542aca872caaca2fdf86f4825";

const createCity = (req, res) => {
	//get city from open weather api with info that the user sent
	axios
		.get(
			`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
				req.body.cityname
			)},${encodeURI(req.body.countrycode)}&appid=${appid}&units=metric`,
			{
				headers: {},
			}
		)
		.then((response) => {
			const data = response.data; //get data from response
			const city = new City({
				name: data.name,
				cityId: data.id,
				lat: data.coord.lat,
				lon: data.coord.lon,
			}); //create new city
			User.findById({ _id: req.user._id })
				.populate("cities")
				.exec((err, doc) => {
					if (err)
						res.status(500).json({
							message:
								"An Error Occured while querying the database.",
							msgError: true,
						});
					else {
						var doesCityExists = doc.cities.find((obj) => {
							return obj.cityId == city.cityId;
						}); //used to see if the user already has a city like this

						if (doesCityExists == undefined) {
							city.save((err) => {
								if (err)
									res.status(500).json({
										message:
											"An Error Occured while querying the database.",
										msgError: true,
									});
								else {
									req.user.cities.push(city); //saves a ref of the city is the cities that the user have
									req.user.save((err) => {
										if (err)
											res.status(500).json({
												message:
													"An Error Occured while querying the database.",
												msgError: true,
											});
										else {
											res.status(201).json({
												message:
													"city successfully created.",
												msgError: false,
											});
										}
									});
								}
							});
						} else {
							res.status(409).json({
								message:
									"You already have access to this city.",
								msgError: true,
							});
						}
					}
				});
		})
		.catch((err) => {
			if (err.response) {
				console.log(err);
				res.status(err.response.status).json({
					message: err.response.data.message,
					msgError: true,
				});
			} else {
				res.status(400).json({
					message: "There was an error while contacting the API",
					msgError: true,
				});
			}
		});
};

const getCities = (req, res) => {
	//get all the cities that the user has
	User.findById({ _id: req.user._id })
		.populate("cities")
		.exec((err, doc) => {
			if (err)
				res.status(500).json({
					message: "An Error Occured while querying the database.",
					msgError: true,
				});
			else {
				let promises = [];
				doc.cities.forEach((city) => {
					promises.push(
						axios.get(
							`https://api.openweathermap.org/data/2.5/weather?id=${city.cityId}&appid=${appid}&units=metric`
						)
					);
				}); //get all cities info one by one
				//wait for all the responses
				Promise.all(promises)
					.then((results) => {
						cities = [];
						results.forEach((response) => {
							cities.push(response.data);
						});
						res.status(200).json({
							cities: cities,
							isAuthenticated: true,
						}); //give cities to front end
					})
					.catch((err) => {
						res.status(503).json({
							message:
								"There was an error while contacting the weather API please try again later.",
							msgError: true,
						});
					});
			}
		});
};

const getCity = (req, res) => {
	User.findById({ _id: req.user._id })
		.populate("cities")
		.exec((err, doc) => {
			if (err)
				res.status(500).json({
					message: "An Error Occured while querying the database.",
					msgError: true,
				});
			else {
				var city = doc.cities.find((obj) => {
					return obj.cityId == req.query.cityid;
				}); //used to see if the user already has a city like this

				if (city == undefined)
					res.status(404).json({
						message: "City not found.",
						msgError: true,
					});
				else {
					axios
						.get(
							`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=metric`
						)
						.then((response) => {
							res.status(200).json({
								city: response.data,
								isAuthenticated: true,
							}); //gives the specific city info to front end
						})
						.catch((err) => {
							if (err.response) {
								console.log(err);
								res.status(err.response.status).json({
									message: err.response.data.message,
									msgError: true,
								});
							} else {
								res.status(400).json({
									message:
										"There was an error while contacting the API",
									msgError: true,
								});
							}
						});
				}
			}
		});
};

const deleteCity = (req, res) => {
	User.findById({ _id: req.user._id })
		.populate("cities")
		.exec((err, user) => {
			if (err)
				res.status(500).json({
					message: "An Error Occured while querying the database.",
					msgError: true,
				});
			else {
				let city = user.cities.find((obj) => {
					return obj.cityId == req.body.cityid;
				}); //used to see if the user already has a city like this

				if (city == undefined)
					res.status(404).json({
						message: "City not found.",
						msgError: true,
					});
				else {
					console.log(city._id);
					//delete city but return it's value as a doc
					City.findByIdAndDelete(city._id, (err, doc) => {
						if (err)
							res.status(500).json({
								message:
									"An Error Occured while querying the database.",
								msgError: true,
							});
						if (doc) {
							const index = req.user.cities.indexOf(doc._id);
							req.user.cities.splice(index, 1); //remove city from user
							req.user.save((err) => {
								if (err)
									res.status(500).json({
										message:
											"An Error Occured while querying the database.",
										msgError: true,
									});
								else {
									res.status(200).json({
										message: "city successfully removed",
										msgError: false,
									});
								}
							});
						}
					});
				}
			}
		});
};

module.exports = {
	createCity: createCity,
	getCities: getCities,
	getCity: getCity,
	deleteCity: deleteCity,
};
