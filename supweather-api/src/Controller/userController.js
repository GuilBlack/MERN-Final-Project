const User = require("../Models/User");
const City = require("../Models/City");
const jwt = require("jsonwebtoken");
const passportConfig = require("../auth/passport");

const register = (req, res) => {
	const { username, password } = req.body; //extract username and passwd from the req
	//find if there is a user that already exists with this username
	User.findOne({ username: username }, (err, user) => {
		if (err)
			res.status(500).json({
				message: "An Error Occured while querying the database.",
				msgError: true,
			});
		if (user)
			//if user already exists, the user will not be able to register
			res.status(400).json({
				message: "This username is already taken",
				msgError: true,
			});
		else {
			//create new user model
			const newUser = new User({
				username: username,
				password: password,
			});
			//save user
			newUser.save((err) => {
				if (err)
					res.status(500).json({
						message:
							"An Error Occured while saving this new entry.",
						msgError: true,
					});
				else
					res.status(201).json({
						message: "Account successfully created :D",
						msgError: false,
					});
			});
		}
	});
};

const login = (req, res) => {
	//is authenticated is added by passport to the request
	if (req.isAuthenticated()) {
		const { _id, username } = req.user; //user is added by passport to the request
		const token = signToken(_id); //see method bellow
		res.cookie("access-token", token, { httpOnly: true, sameSite: true }); //httpOnly prevents corss-site scripting attacks and sameSite prevents against cross-site request forgery attacks
		res.status(200).json({ isAuthenticated: true, user: { username } });
	}
};

const logout = (req, res) => {
	res.clearCookie("access-token"); //clear cookie from the user's browser
	res.json({ user: { username: "" }, success: true });
};

const authenticated = (req, res) => {
	const { username } = req.user;
	res.status(200).json({ isAuthenticated: true, username: username }); //response used in front end
};

const signToken = (userID) => {
	//setting up the jwt token
	return jwt.sign(
		{
			issuer: "www.supweather.com",
			sub: userID,
		},
		"I l0v3 c4tS mOR3 tH4n D0gS", //secret
		{ algorithm: "HS512", expiresIn: "7 days" } //sets max age and encryption algorithm for this token
	);
};

module.exports = {
	register: register,
	login: login,
	logout: logout,
	authenticated: authenticated,
};
