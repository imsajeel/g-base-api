const express = require("express");
const Employee = require("../../../models/employees.model");
const router = express.Router();

router.post("/", async (req, res) => {
  const { siteId } = req.user;
  if (req.body.name) {
    let newEmployee = new Employee({ ...req.body, siteId });

    newEmployee.save((err, result) => {
      if (err) {
        res.send({
          message: "Something went wrong",
          error: err,
        });
      } else {
        res.send({
          message: "Employee successfully added",
          result: result,
        });
      }
    });
  } else {
    res.send({ message: "Please enter the name of employee" });
  }
});

router.put("/", async (req, res) => {
  if (req.body.employeeId) {
    Employee.findByIdAndUpdate(req.body.employeeId, req.body, (err, doc) => {
      if (err) res.send({ message: "Somethng went wrong" });
      res.send({
        message: "Employee successfully updated",
        result: doc,
      });
    });
  } else {
    res.send({ message: "Please select a employee" });
  }
});

router.delete("/", async (req, res) => {
  if (req.body.employeeId) {
    Employee.findByIdAndDelete(req.body.employeeId, (err, doc) => {
      if (err) res.send({ message: "Somethng went wrong" });
      res.send({
        message: "Employee successfully deleted",
        result: doc,
      });
    });
  } else {
    res.send({ message: "Please select a employee" });
  }
});

router.get("/", async (req, res) => {
  const { siteId } = req.user;
  if (siteId) {
    const allEmployee = await Employee.find({ siteId });
    res.send(allEmployee);
  } else {
    res.send({ message: "Auth Error" });
  }
});

module.exports = router;
