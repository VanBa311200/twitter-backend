const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const UserSchema = require("../models/User");

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_APP,
    },
    function (jwtPayload, done) {
      return UserSchema.findById({ _id: jwtPayload._id })
        .then((value) => done(null, value))
        .catch((err) => done(err));
    }
  )
);
