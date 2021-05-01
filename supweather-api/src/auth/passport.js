const passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	JwtStrategy = require("passport-jwt").Strategy;
const User = require("../Models/User");

const cookieExtractor = (req) => {
	var token = null;
	if (req && req.cookies) token = req.cookies["access-token"];
	return token;
};

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: "I l0v3 c4tS mOR3 tH4n D0gS",
		},
		(jwtPayload, done) => {
			User.findById({ _id: jwtPayload.sub }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

passport.use(
	new LocalStrategy((username, password, done) => {
		User.findOne({ username: username }, (err, user) => {
			if (err) return done(err);
			if (!user)
				return done(null, false, { message: "Incorrect Username." });
			user.validatePassword(password, done);
		});
	})
);
