const express = require("express"),
  router = express.Router(),
  { CashboxTransactions, Cashbox } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  CashboxTransactions.findAndCountAll({
    limit,
    offset,
    order: [["id", "DESC"]]
  })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/create", async (req, res) => {
  const dataForm = req.body;

  const cashbox = await Cashbox.findOne({
    where: {
      id: dataForm.cashbox_id
    }
  });

  if (dataForm.type === "1") {
    cashbox.balance = parseFloat(cashbox.balance) + parseFloat(dataForm.amount);
  } else if (dataForm.type === "0") {
    let amount = parseFloat(cashbox.balance) - parseFloat(dataForm.amount);
    if (amount < 0) {
      res.status("200").send("not_enough");
      return;
    }

    cashbox.balance = amount;
  }

  const cashboxTransactions = await CashboxTransactions.create({
    ...dataForm,
    created_at: Date.now() / 1000,
    updated_at: Date.now() / 1000
  });

  await cashbox.save();

  res.status("200").send("Ok");
});

router.get("/get", async (req, res) => {
  const { id } = req.query;

  CashboxTransactions.findOne({
    where: {
      id: id
    }
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = router;
