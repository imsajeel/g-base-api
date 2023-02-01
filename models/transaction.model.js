const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "transaction",
  new mongoose.Schema({
    title: String,
    amount: Number,
    transactionType: String,
    remarks: String,
    images: [String],
    createdAt: String,
    userId: String,
    siteId: String,
  })
);

module.exports = Transaction;
