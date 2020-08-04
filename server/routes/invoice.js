const express = require("express"),
  router = express.Router(),
  Invoice = require("../models/invoice"),
  { getPagination, getPagingData } = require("../functions"),
  db = require("../database");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Invoice.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
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

  try {
    await db.sequelize.transaction(async t => {
      const invoiceInstant = await Invoice.create(
        {
          ...invoice,
          created_at: Date.now() / 1000
        },
        { transaction: t }
      );

      for (const item of invoiceItems) {
        await invoiceInstant.createItem(item, { transaction: t });
      }

      res.status("200").send("Ok");
    });
  } catch (error) {
    res.status("500").send("error: " + error);
  }
});

module.exports = router;
