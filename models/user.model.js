const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    siteId: String,
    isActive: Boolean,
  })
);

module.exports = User;
