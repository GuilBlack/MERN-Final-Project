const userRouter = require("./userRouter");
const cityRouter = require("./cityRouter");

//routing system for user and city
module.exports = {
	routes: (app) => {
		app.use("/user", userRouter);
		app.use("/city", cityRouter);
	},
};
