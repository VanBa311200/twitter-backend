const UserSchema = require("../models/User");
const passport = require("passport");
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
        return done(null, newUser);
      } else return done(null, result);
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log(`\n--------> Serialize User:`);
  // console.log(user);
  // The USER object is the "authenticated user" from the done() in authUser function.
  // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.

  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log("\n--------- Deserialized User:");
  // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
  // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

  done(null, user);
});
