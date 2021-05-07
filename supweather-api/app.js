const express = require("express");
// const cors = require("cors");
const https = require("https");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
var RateLimit = require("express-rate-limit");
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

var limiter = new RateLimit({
	windowMs: 60 * 1000, // 1 minutes
	max: 70, // limit each IP to 200 requests per windowMs
	delayMs: 0, // disable delaying - full speed until the max limit is reached
});

// app.use(cors());
app.use(limiter);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

const sslServer = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
		cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
	},
	app
);

sslServer.listen(PORT, () => {
	console.log(`node express API running on port ${PORT}`);
});
