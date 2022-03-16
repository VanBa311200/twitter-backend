const express = require("express");
const router = express.Router();
const authGoole = require("./authGoogle");
const authFB = require("./authFB");

/**
 * Router: /login/failed
 * Method: GET
 * Desc: handle login failed
 */
router.get("/login/failed", (req, res) => {
  res.status(401).json({ success: false, message: "Unauthorization." });
});

/**
 * Router: api/auth/getAuth
 * Method: GET
 * Desc: handle login success
 */
router.get("/getAuth", (req, res) => {
  if (req.user) {
    return res
      .status(200)
      .json({ success: true, message: "Success.", data: req.user });
  }
  return res.status(401).json({ success: false, message: "Unauthorization." });
});

/**
 * Router: /logout
 * Method: GET
 * Desc: handle logout
 */
router.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  return res.json({ message: "Logout success!", success: true });
});

router.use(authGoole);
router.use(authFB);

module.exports = router;
