const express = require("express"),
  router = express.Router(),
  {
    User,
    Customer,
    Order,
    OrderItems,
    OrderReturn,
    OrderReturnItems,
    CustomerDebtHistory,
    Cashbox,
    CashboxTransactions
  } = require("../models/index"),
  { Op } = require("sequelize"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Order.findAndCountAll({
    include: [User, Customer],
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
    const order = await Order.create({
      ...dataForm,
      created_at: Date.now() / 1000,
      updated_at: Date.now() / 1000
    });
    await order.save();

    for (item of dataForm.products) {
      await order.createOrderItem({
        ...item,
        created_at: Date.now() / 1000,
        updated_at: Date.now() / 1000
      });
    }

    if (order.customer_id) {
      const customer = await order.getCustomer();
      customer.sale_sum =
        parseFloat(customer.sale_sum) + parseFloat(order.cost);
      if (order.is_debt) {
        customer.debt_sum =
          parseFloat(customer.debt_sum) + parseFloat(order.debt_amount);
      }

      await customer.save();
    }

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get", async (req, res) => {
  const { id } = req.query;

  Order.findOne({
    include: [User, OrderItems],
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

router.get("/get-by-date", async (req, res) => {
  const { startDate, endDate } = req.query;

  Order.findAll({
    include: [OrderItems],
    where: {
      created_at: {
        [Op.gte]: startDate,
        [Op.lte]: endDate
      }
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
    include: [{ model: OrderItems }]
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/esc-sign", async (req, res) => {
  const { toSign } = req.query;

  var key = "private-key.pem";
  var crypto = require("crypto");
  var fs = require("fs");
  var path = require("path");

  function strip(key) {
    if (key.indexOf("-----") !== -1) {
      return key.split("-----")[2].replace(/\r?\n|\r/g, "");
    }
  }

  fs.readFile(path.join(__dirname, "/file/" + key), "utf-8", function(
    err,
    privateKey
  ) {
    // privateKey = strip(privateKey);

    var sign = crypto.createSign("SHA1"); // Use "SHA1" for QZ Tray 2.0 and older

    sign.update(toSign);
    var signature = sign.sign({ key: privateKey }, "base64");

    res.send(signature);
  });
});

module.exports = router;
