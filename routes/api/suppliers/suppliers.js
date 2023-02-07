const express = require("express");
const Supplier = require("../../../models/suppliers.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const { siteId } = req.user;
  if (req.body.company_name) {
    let newSupplier = new Supplier({ ...req.body, siteId });

    newSupplier.save((err, result) => {
      if (err) {
        res.send({
          message: "Something went wrong",
          error: err,
        });
      } else {
        res.send({
          message: "Supplier successfully added",
          result: result,
        });
      }
    });
  } else {
    res.send({ message: "Please enter the name of supplier" });
  }
});

router.put("/", async (req, res) => {
  if (req.body.supplierId) {
    Supplier.findByIdAndUpdate(req.body.supplierId, req.body, (err, doc) => {
      if (err) res.send({ message: "Somethng went wrong" });
      res.send({
        message: "Supplier successfully updated",
        result: doc,
      });
    });
  } else {
    res.send({ message: "Please select a supplier" });
  }
});

router.delete("/", async (req, res) => {
  if (req.body.supplierId) {
    Supplier.findByIdAndDelete(req.body.supplierId, (err, doc) => {
      if (err) res.send({ message: "Somethng went wrong" });
      res.send({
        message: "Supplier successfully deleted",
        result: doc,
      });
    });
  } else {
    res.send({ message: "Please select a supplier" });
  }
});

router.get("/", async (req, res) => {
  const { siteId } = req.user;
  if (siteId) {
    const allSupplier = await Supplier.find({ siteId });
    res.send(allSupplier);
  } else {
    res.send({ message: "Auth Error" });
  }
});

module.exports = router;
