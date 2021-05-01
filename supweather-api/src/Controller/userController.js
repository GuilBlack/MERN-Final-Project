const User = require("../Models/User");
const City = require("../Models/City");
const jwt = require("jsonwebtoken");
const passportConfig = require("../auth/passport");

const register = (req, res) => {
	const { username, password } = req.body;
	User.findOne({ username: username }, (err, user) => {
		if (err)
			res.status(500).json({
				message: "An Error Occured while querying the database.",
				msgError: true,
			});
		if (user)
			res.status(400).json({
				message: "This username is already taken",
				msgError: true,
			});
		else {
			const newUser = new User({
				username: username,
				password: password,
			});
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
	if (req.isAuthenticated()) {
		const { _id, username } = req.user;
		const token = signToken(_id);
		res.cookie("access-token", token, { httpOnly: true, sameSite: true }); //httpOnly prevents corss-site scripting attacks and sameSite prevents against cross-site request forgery attacks
		res.status(200).json({ isAuthenticated: true, user: { username } });
	}
};

const logout = (req, res) => {
	res.clearCookie("access-token");
	res.json({ user: { username: "" }, success: true });
};

const authenticated = (req, res) => {
	const { username } = req.user;
	res.status(200).json({ isAuthenticated: true, username: username });
};

const signToken = (userID) => {
	return jwt.sign(
		{
			issuer: "www.supweather.com",
			sub: userID,
		},
		"I l0v3 c4tS mOR3 tH4n D0gS",
		{ algorithm: "HS512", expiresIn: "7 days" }
	);
};

module.exports = {
	register: register,
	login: login,
	logout: logout,
	authenticated: authenticated,
};
