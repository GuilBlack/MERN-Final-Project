const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//schema for user model
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		min: 3,
		max: 16,
	},
	password: {
		type: String,
		required: true,
		min: 8,
	},
	cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
});

//happens before saving an instance of this model in the db
UserSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	bcrypt.hash(this.password, 10, (err, passwordHash) => {
		//encrypt passwd with salt = 10 so 2^10 rounds
		if (err) return next(err);
		this.password = passwordHash;
		next();
	});
});

UserSchema.methods.validatePassword = function (password, cb) {
	//used with passport to see if it's the correct password
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if (err) {
			return cb(err);
		} else {
			if (!isMatch)
				return cb(null, isMatch, { message: "Incorrect Password" });
			return cb(null, this);
		}
	});
};

module.exports = mongoose.model("User", UserSchema);
