const express = require("express");
const router = express.Router();

const transaction = require("./transaction/transaction");

router.use("/transaction", transaction);
router.get("/aa", (req, res) => {
  res.send({ message: "alpha" });
});
router.use("/", (req, res) => {
  res.send({ message: "Token verified" });
});

module.exports = router;
