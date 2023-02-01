const express = require("express");
const router = express.Router();
const transactionType = require("../../../database/transaction-types");
const User = require("../../../models/user.model");
const Transaction = require("../../../models/transaction.model");

router.get("/get-types", (req, res) => {
  res.send(transactionType);
});

router.get("/get-all", async (req, res) => {
  const { siteId } = req.user;
  if (siteId) {
    const allTransactions = await Transaction.find({ siteId });
    res.send(allTransactions);
  } else {
    res.send({ message: "Auth error" });
  }
});

router.post("/add", async (req, res) => {
  const { title, amount, transactionType, remarks, images } = req.body;
  const { userId, siteId } = req.user;
  if (userId && siteId && title && amount && transactionType) {
    let newTransaction = new Transaction({
      title,
      amount: Number(amount),
      transactionType,
      remarks,
      images,
      createdAt: new Date(),
      userId: userId,
      siteId: siteId,
    });
    newTransaction.save((err, result) => {
      if (err) {
        res.send({
          message: "Something went wrong",
          error: err,
        });
      } else {
        res.send({
          message: "Transaction successfully added",
          result: result,
        });
      }
    });
  } else {
    res.send({ message: "Please enter all required fields" });
  }
});

router.get("/", (req, res) => {
  res.send({ message: "Token verified" });
});

module.exports = router;
