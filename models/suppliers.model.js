const mongoose = require("mongoose");

const Supplier = mongoose.model(
  "Supplier",
  new mongoose.Schema({
    company_name: String,
    phone: String,
    mobile: String,
    address: String,
    siteId: String,
    manager_name: String,
    bank_acc_title: String,
    bank_acc_number: String,
    bank_sort_code: String,
  })
);

module.exports = Supplier;
