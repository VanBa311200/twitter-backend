const express = require("express");
const userController = require("../controller/user");
const { validateParams, schemas } = require("../helpers/routerValidate");
const { restrict } = require("../middleware/authenticate");

const router = express.Router();

router
  .get("/", restrict, userController.getAllUser)
  .post("/getUser", userController.getUser)
  .post("/", validateParams(schemas.userSchema), userController.createUser);

module.exports = router;
