const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/login/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.SERVER_URL + "/api/auth/login/failed",
    failureMessage: "Error!!! Try again.",
  })
);

module.exports = router;
