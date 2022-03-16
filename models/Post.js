const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    images: {
      type: [String],
    },
    text: {
      type: String,
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    like: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    comment: {
      type: [mongoose.Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
