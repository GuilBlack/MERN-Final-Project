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

userRouter.route("/register").post(register);

userRouter.post(
	"/login",
	passport.authenticate("local", { session: false }),
	login
);

userRouter.get(
	"/logout",
	passport.authenticate("jwt", { session: false }),
	logout
);

userRouter.get(
	"/authenticated",
	passport.authenticate("jwt", { session: false }),
	authenticated
);

module.exports = userRouter;
