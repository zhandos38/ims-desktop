const express = require("express"),
  router = express.Router(),
  { User, Shift, Cashbox, CashboxTransactions, Order, CustomerDebtHistory } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Shift.findAndCountAll({
    include: [
      User,
      Cashbox
    ],
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

  try {
    const shift = await Shift.create({
      ...dataForm,
      opened_at: Date.now() / 1000
    });
    await shift.save();

    res.json(shift);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/update", async (req, res) => {
  const dataForm = req.body;

  try {
    const shift = await Shift.findOne({
      where: {
        id: dataForm.id
      }
    });

    shift.status = true;
    shift.sum_at_close = dataForm.sum_at_close;
    shift.closed_at = Date.now() / 1000;

    await shift.save();

    res.json(shift);
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get", async (req, res) => {
  const { id } = req.query;

  Shift.findOne({
    include: [
      User,
      Cashbox
    ],
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

router.get("/get-last", async (req, res) => {
  const { id } = req.query;

  Shift.findOne({
    where: {
      user_id: id
    },
    order: [["id", "DESC"]]
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/get-report", async (req, res) => {
  const { id } = req.query;

  Shift.findOne({
  	include: [
  		Order,
  		Cashbox,
  		CashboxTransactions,
  		CustomerDebtHistory
  	],
    where: {
      id: id
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = router;
