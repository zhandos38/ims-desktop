const express = require("express"),
  router = express.Router(),
  Supplier = require("../models/supplier"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  console.log(req.query);
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Supplier.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/list", (req, res) => {
  Supplier.findAll()
    .then(invoice => {
      res.json(invoice);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = router;
