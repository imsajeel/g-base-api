const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    name: String,
    phone: String,
    mobile: String,
    address: String,
    siteId: String,
    department: String,
    occupation: String,
    bank_acc_title: String,
    bank_acc_number: String,
    bank_sort_code: String,
  })
);

module.exports = Employee;
