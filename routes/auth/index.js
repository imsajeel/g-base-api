const express = require("express");
const jwt = require("jsonwebtoken");

const authenticateToken = require("../../middlewares/authenticateToken");
const Site = require("../../models/sites.model");
const User = require("../../models/user.model");
const router = express.Router();
const login = require("./login");
const register = require("./register");

router.use("/login", login);
router.use("/register", register);

router.use("/", (req, res) => {
  if (req.headers && req.headers.authorization) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) res.send({ message: "Something went wrong!", err });
      if (user) {
        let fetchedUser = await User.findOne({ _id: user.userId });
        if (fetchedUser) {
          let fetchedSite = await Site.findOne({
            _id: fetchedUser.siteId,
          });
          if (fetchedUser.isActive) {
            fetchedUser.password = undefined;
            res.json({
              message: "User found.",
              userData: { ...fetchedUser._doc, token },
              siteData: fetchedSite,
            });
          } else {
            res.send({ message: "Access denied! This user is blocked" });
          }
        } else {
          res.send({ message: "Unable to login" });
        }
      }
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
