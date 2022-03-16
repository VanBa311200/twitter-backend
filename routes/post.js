const express = require("express");
const postController = require("../controller/post");
const { validateParams, schemas } = require("../helpers/routerValidate");
const router = express.Router();
const { restrict } = require("../middleware/authenticate");

router
  .get("/", restrict, postController.getAllPost)
  .post(
    "/",
    restrict,
    validateParams(schemas.postSchema),
    postController.createPost
  );

module.exports = router;
