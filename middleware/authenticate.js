const jwt = require("jsonwebtoken");

// Define it
const restrict = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];
  if (token) {
    try {
      const decode = await jwt.verify(token, process.env.SECRET_KEY_APP);
      req.user = decode.user;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "unauthorized" });
    }
  } else
    return res.status(401).json({ success: false, message: "unauthorized" });
};
module.exports = { restrict };
