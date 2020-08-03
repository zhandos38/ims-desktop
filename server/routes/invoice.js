const express = require("express"),
  router = express.Router(),
  Invoice = require("../models/invoice"),
  { getPagination, getPagingData } = require("../functions"),
  Sequelize = require("sequelize");

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

router.post("/create", async (req, res) => {
  const { invoice, invoiceItems } = req.body;

  return Sequelize.transaction(function(t) {
    return Invoice.create(
      {
        ...invoice,
        created_at: Date.now() / 1000
      },
      { transaction: t }
    )
      .then(function(invoice) {
        return invoice.setItems(
          {
            ...invoiceItems
          },
          { transaction: t }
        );
      })
      .then(function(result) {
        res.status("200").send("Ok");
      })
      .catch(function(err) {
        res.status("500").send("error: " + err);
      });
  });
});

module.exports = router;
