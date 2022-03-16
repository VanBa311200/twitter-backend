const userSchema = require("../models/User");

const userController = {
  createUser(req, res) {
    try {
      const user = new userSchema({
        ...req.body,
      });
      user.save();

      res
        .status(200)
        .json({ message: "[POST]Success create new user!!!", data: user });
    } catch (error) {
      res.status(400).json({ message: "Error while create user." });
    }
  },
  getAllUser(req, res) {
    userSchema
      .find({})
      .then((result) =>
        res.status(200).json({ message: "Success get all user.", data: result })
      )
      .catch(() =>
        res.status(400).json({ message: "Error while finding all user." })
      );
  },
  getUser(req, res) {
    const { _id } = req.body;

    if (_id) {
      try {
        const user = userSchema.findById(_id);
        if (user)
          return res
            .status(200)
            .json({ data: user, message: "✅ Get user success." });
        else return res.status(404).json({ message: "❌ User not found." });
      } catch (error) {
        return res.status(500).json({ message: "❌ Server interval." });
      }
    } else return res.status(404).json({ message: "❌ Missing field _id." });
  },
};

module.exports = userController;
