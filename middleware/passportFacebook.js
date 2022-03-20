const UserSchema = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const FBStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

passport.use(
  new FBStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      passReqToCallback: true,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async function (req, accessToken, refreshToken, profile, done) {
      const defaultO = {
        email: profile.emails[0].value,
        fullName: profile.displayName,
        photoURL: profile.photos[0].value,
        providerId: profile.provider,
        tag: `@${profile.displayName}`,
        uid: profile.id,
      };

      const result = await UserSchema.findOne({ uid: profile.id }).catch(
        (err) => done(err, null)
      );
      if (!result) {
        const newUser = await UserSchema({
          ...defaultO,
        })
          .save()
          .catch((error) => done(error, null));
        const accessToken = await jwt.sign(
          { user: newUser },
          process.env.SECRET_KEY_APP
        );
        req.accessToken = accessToken;
        return done(null, newUser);
      } else {
        const accessToken = await jwt.sign(
          { user: result },
          process.env.SECRET_KEY_APP
        );
        req.accessToken = accessToken;
        return done(null, result);
      }
    }
  )
);
