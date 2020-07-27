const express = require("express"),
  router = express.Router(),
  Invoice = require("../models/invoice"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  console.log(req.query);
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Invoice.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = router;
