const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    providerId: {
      type: String,
    },
    tag: {
      type: String,
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
