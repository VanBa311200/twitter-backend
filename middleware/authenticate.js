// Define it
const restrict = (req, res, next) => {
  // console.log(req.user);
  if (req.user) next();
  else return res.status(401).json({ message: "Unthorization, please login" });
};
module.exports = { restrict };
