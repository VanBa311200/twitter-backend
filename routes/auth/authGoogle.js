const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.SERVER_URL + "/api/auth/login/failed",
    session: false,
  }),
  (req, res) => {
    const accessToken = req.accessToken;
    console.log({ accessToken });
    res.redirect(`${process.env.CLIENT_URL}?auth_accessToken=${accessToken}`);
  }
);

module.exports = router;
