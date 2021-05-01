const express = require("express");
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { routes } = require("./src/Routes/appRoutes");

const app = express();
const PORT = 6969;

mongoose.Promise = global.Promise;
mongoose.connect(
	"mongodb://localhost:27017/finalproj",
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
	},
	(err) => {
		if (!err) {
			console.log("successfully connected to mongoDB");
		} else {
			console.log("an error occured while connecting to the db: " + err);
		}
	}
);

// app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(PORT, () => {
	console.log(`node express API running on port ${PORT}`);
});
