const express = require("express");
const passport = require("passport");
const passportConfig = require("../auth/passport");
const userRouter = express.Router();
const {
	register,
	login,
	logout,
	authenticated,
} = require("../Controller/userController");

//different routes to access the user controller are defined here
userRouter.route("/register").post(register);

userRouter.post(
	"/login",
	passport.authenticate("local", { session: false }), //used to authenticate user
	login
);

userRouter.get(
	"/logout",
	passport.authenticate("jwt", { session: false }), //used to see if the user is authorize
	logout
);

userRouter.get(
	"/authenticated",
	passport.authenticate("jwt", { session: false }),
	authenticated
);

module.exports = userRouter;
