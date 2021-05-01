const express = require("express");
const passport = require("passport");
const passportConfig = require("../auth/passport");
const cityRouter = express.Router();
const {
	createCity,
	getCity,
	getCities,
	deleteCity,
} = require("../Controller/cityController");

cityRouter.post(
	"/add",
	passport.authenticate("jwt", { session: false }),
	createCity
);

cityRouter.get(
	"/get",
	passport.authenticate("jwt", { session: false }),
	getCity
);

cityRouter.get(
	"/get-cities",
	passport.authenticate("jwt", { session: false }),
	getCities
);

cityRouter.delete(
	"/delete",
	passport.authenticate("jwt", { session: false }),
	deleteCity
);

module.exports = cityRouter;
