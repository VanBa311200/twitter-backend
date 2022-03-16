const express = require("express");
const router = express.Router();
const authRoute = require("../routes/auth");
const PostRoute = require("../routes/post");
const UserRoute = require("../routes/user");

router.use("/auth", authRoute);
router.use("/post", PostRoute);
router.use("/user", UserRoute);

module.exports = router;
