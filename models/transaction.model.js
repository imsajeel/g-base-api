const mongoose = require("mongoose");

const Transaction = mongoose.model(
  "transaction",
  new mongoose.Schema({
    userId: String,
    siteId: String,
    created_at: String,
    title: String,
    amount: Number,
    amount_paid: Number,
    images: [String],
    transaction_to_ref: String,
    transaction_to_ref_id: String,
    remarks: String,
    payment_method: String,
  })
);

module.exports = Transaction;
