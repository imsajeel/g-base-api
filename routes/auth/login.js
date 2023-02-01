const express = require("express");
const router = express.Router();
const Site = require("../../models/sites.model");
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function generateAccessToken(userId, siteId) {
  return jwt.sign({ userId, siteId }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
}

router.post("/", async (req, res) => {
  const { siteCode, username, password } = req.body;
  if ((siteCode, username, password)) {
    let fetchedSite = await Site.findOne({
      siteCode: siteCode,
    });
    if (fetchedSite) {
      let date = new Date();
      let expiry = new Date(fetchedSite.expiry);
      if (fetchedSite.isActive && expiry > date) {
        let fetchedUser = await User.findOne({
          username: username.toLowerCase(),
          siteId: fetchedSite._id,
        });
        if (fetchedUser && fetchedUser.isActive) {
          bcrypt.compare(password, fetchedUser?.password, (error, result) => {
            if (result) {
              const token = generateAccessToken(
                fetchedUser._id,
                fetchedSite._id
              );
              let modiefiedUser = { ...fetchedUser._doc };

              delete modiefiedUser.password;
              delete modiefiedUser.__v;
              res.json({
                message: "User found.",
                result,
                userData: { ...modiefiedUser, token },
                siteData: fetchedSite,
              });
            } else {
              res.json({ message: "Wrong password!" });
            }
          });
        } else {
          res.json({ message: "User doesn't exist." });
        }
      } else {
        res.json({
          message:
            "You site is suspended, Please call our customer service for more details.",
        });
      }
    } else {
      res.json({ message: "Invalid site id provided" });
    }
    // res.json({ message: "AAAA to gBase application." });
  } else {
    res.json({ message: "Please enter all feilds " });
  }
});

module.exports = router;
