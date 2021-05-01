const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

UserSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	bcrypt.hash(this.password, 10, (err, passwordHash) => {
		if (err) return next(err);
		this.password = passwordHash;
		next();
	});
});

UserSchema.methods.validatePassword = function (password, cb) {
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
