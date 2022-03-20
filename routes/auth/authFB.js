const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
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
