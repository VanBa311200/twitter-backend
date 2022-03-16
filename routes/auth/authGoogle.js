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
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.SERVER_URL + "/api/auth/login/failed",
    failureMessage: "Error!!! Try again.",
  })
);

module.exports = router;
