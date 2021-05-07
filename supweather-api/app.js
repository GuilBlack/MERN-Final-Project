const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
var RateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const { routes } = require("./src/Routes/appRoutes");

const app = express();
const PORT = 6969;

//setting up connection with mongodb
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

//limits the number of connections per client
var limiter = new RateLimit({
	windowMs: 60 * 1000, // 1 minutes
	max: 100, // limit each IP to 200 requests per windowMs
	delayMs: 0, // disable delaying - full speed until the max limit is reached
});
app.use(limiter);

//parse data so that we can use it later
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing system
routes(app);

//make server https
const sslServer = https.createServer(
	{
		key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
		cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
	},
	app
);

//listen to specific port connection
sslServer.listen(PORT, () => {
	console.log(`node express API running on port ${PORT}`);
});
