const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: String,
    phone: String,
    mobile: String,
    address: String,
    siteId: String,
  })
);

module.exports = Customer;
