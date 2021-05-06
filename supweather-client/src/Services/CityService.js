const axios = require("axios").default;

const cityService = {
	getCities: () => {
		return axios
			.get("/city/get-cities")
			.then((res) => res.data)
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						return { message: "Unauthorized", msgError: true };
					} else {
						return err.response.data;
					}
				} else {
					return {
						message: "Houston, we have a problem.",
						msgError: true,
					};
				}
			});
	},

	addCity: (city) => {
		return axios
			.post("/city/add", city)
			.then((res) => res.data)
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						return { message: "Unauthorized", msgError: true };
					} else {
						return err.response.data;
					}
				} else {
					return {
						message: "there was an error while contacting the API",
						msgError: true,
					};
				}
			});
	},

	getCity: (cityId) => {
		return axios
			.get("/city/get", {
				params: {
					cityid: cityId,
				},
			})
			.then((res) => res.data)
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						return { message: "Unauthorized", msgError: true };
					} else {
						return err.response.data;
					}
				} else {
					return {
						message: "Houston, we have a problem.",
						msgError: true,
					};
				}
			});
	},

	deleteCity: (cityId) => {
		console.log(cityId);
		return axios
			.delete("/city/delete", {
				data: {
					cityid: cityId,
				},
			})
			.then((res) => res.data)
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						return { message: "Unauthorized", msgError: true };
					} else {
						return err.response.data;
					}
				} else {
					return {
						message: "Houston, we have a problem.",
						msgError: true,
					};
				}
			});
	},
};

export default cityService;
