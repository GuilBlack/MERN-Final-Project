const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	cityId: {
		type: Number,
		required: true,
	},
	lat: {
		type: Number,
		required: true,
	},
	lon: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("City", CitySchema);
