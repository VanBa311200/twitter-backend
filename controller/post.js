const postSchema = require("../models/Post");

const postController = {
  async getAllPost(req, res) {
    try {
      const posts = await postSchema
        .find({})
        .populate("userRef")
        .sort({ createdAt: -1 });
      return res
        .status(200)
        .json({ data: posts, message: "Success find all posts." });
    } catch (error) {
      return res.status(400).json({ message: "Error while finding Posts." });
    }
  },

  async createPost(req, res) {
    try {
      const newPost = await new postSchema({
        ...req.body,
      }).save();
      return res
        .status(201)
        .json({ message: "Success create new post.", data: newPost });
    } catch (error) {
      return res.status(400).json({ message: "Error while create new post." });
    }
  },
};

module.exports = postController;
