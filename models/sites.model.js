const mongoose = require("mongoose");

const Site = mongoose.model(
  "Site",
  new mongoose.Schema({
    name: String,
    siteCode: String,
    expiry: String,
    isActive: Boolean,
    address: String,
    phone: String,
    logoImage: String,
  })
);

module.exports = Site;
