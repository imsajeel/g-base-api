const express = require("express");
const Customer = require("../../../models/customers.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const { siteId } = req.user;
  if (req.body.name || req.body.address) {
    let newCustomer = new Customer({ ...req.body, siteId });

    newCustomer.save((err, result) => {
      if (err) {
        res.send({
          message: "Something went wrong",
          error: err,
        });
      } else {
        res.send({
          message: "Customer successfully added",
          result: result,
        });
      }
    });
  } else {
    res.send({ message: "Please enter at least one feild" });
  }
});

router.put("/", async (req, res) => {
  if (req.body.customerId) {
    Customer.findByIdAndUpdate(req.body.customerId, req.body, (err, doc) => {
      if (err) res.send({ message: "Somethng went wrong" });
      res.send({
        message: "Customer successfully updated",
        result: doc,
      });
    });
  } else {
    res.send({ message: "Please select a customer" });
  }
});

router.delete("/", async (req, res) => {
  if (req.body.customerId) {
    Customer.findByIdAndDelete(req.body.customerId, (err, doc) => {
      if (err) res.send({ message: "Somethng went wrong" });
      res.send({
        message: "Customer successfully deleted",
        result: doc,
      });
    });
  } else {
    res.send({ message: "Please select a customer" });
  }
});

router.get("/", async (req, res) => {
  const { siteId } = req.user;
  if (siteId) {
    const allCustomers = await Customer.find({ siteId });
    res.send(allCustomers);
  } else {
    res.send({ message: "Auth Error" });
  }
});

module.exports = router;
