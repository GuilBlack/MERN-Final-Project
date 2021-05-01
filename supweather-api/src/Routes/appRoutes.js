const userRouter = require("./userRouter");
const cityRouter = require("./cityRouter");

module.exports = {
	routes: (app) => {
		app.use("/user", userRouter);
		app.use("/city", cityRouter);
	},
};
