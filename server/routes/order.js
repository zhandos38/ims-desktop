const express = require("express"),
  router = express.Router(),
  { Order, OrderItems } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Order.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
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
    const order = await Order.create({
      ...dataForm,
      created_at: Date.now() / 1000,
      updated_at: Date.now() / 1000
    });
    await order.save();

    dataForm.products.forEach(async function(item) {
      await order.createOrderItem(item);
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get", async (req, res) => {
  const { id } = req.query;

  Order.findOne({
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

router.get("/get-by-number", async (req, res) => {
  const { number } = req.query;

  Order.findOne({
    where: {
      number: number
    },
    include: [
      { model: OrderItems }
    ]
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = router;
