const UserSchema = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const callbackURL = `${process.env.SERVER_URL}/api/auth/google/callback`;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: callbackURL,
      passReqToCallback: true,
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
