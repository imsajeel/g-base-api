const express = require("express");
const router = express.Router();
const Site = require("../../models/sites.model");
const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { masterCode, siteCode, username, password } = req.body;
  if ((masterCode, siteCode, username, password)) {
    if (masterCode === "s4j33L") {
      if (siteCode) {
        let fetchedSite = await Site.findOne({
          siteCode: siteCode,
        });
        if (fetchedSite) {
          let fetchedUser = await User.findOne({
            username: username.toLowerCase(),
            siteId: fetchedSite._id,
          });
          if (!fetchedUser) {
            bcrypt.hash(password, 10, (err, hash) => {
              if (err) {
                res.json({ message: "Something went wrong", err });
                return;
              }
              let newUser = new User({
                username: username.toLowerCase(),
                siteCode,
                siteId: fetchedSite._id,
                password: hash,
                isActive: true,
              });
              newUser.save((errr, result) => {
                if (errr) {
                  res.json({ message: "Something went wrong", errr });
                } else {
                  res.json({
                    message: "User succefully created",
                    result: {
                      username: result?.username,
                      siteCode: result?.siteCode,
                      siteId: result?.siteId,
                      _id: result?._id,
                    },
                  });
                }
              });
            });
          } else {
            res.json({ message: "User already exist." });
          }
        } else {
          res.json({ message: "Invalid site id provided" });
        }
      }
    } else {
      res.json({ message: "You're not allowed to perform this operation." });
    }
  } else {
    res.json({ message: "Missing entries!" });
  }
});

module.exports = router;
