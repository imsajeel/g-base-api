const express = require("express");
const router = express.Router();

const customers = require("./customers/customers");
const employees = require("./employees/employees");
const suppliers = require("./suppliers/suppliers");
const transaction = require("./transaction/transaction");

router.use("/customers", customers);
router.use("/employees", employees);
router.use("/suppliers", suppliers);
router.use("/transaction", transaction);
router.get("/aa", (req, res) => {
  res.send({ message: "alpha" });
});
router.use("/", (req, res) => {
  res.send({ message: "Token verified" });
});

module.exports = router;
