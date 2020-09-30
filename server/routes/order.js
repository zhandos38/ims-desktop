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

router.post("/set-transaction", async (req, res) => {
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

router.post("/return", async (req, res) => {
  const { id, comment, products } = req.body;

  try {
    const order = await Order.findOne({
      where: {
        id: id
      }
    });

    const orderReturn = await OrderReturn.create({
      order_id: order.id,
      created_by: order.created_by,
      comment: comment,
      created_at: Date.now() / 1000
    });

    let orderSum = 0;

    for (const product of products) {
      orderSum += product.price * product.quantity;

      const orderItem = await OrderItems.findOne({
        where: {
          id: product.id
        }
      });

      const totalItemQuantity = orderItem.quantity - product.quantity;
      if (totalItemQuantity > 0) {
        orderItem.status = 2;
      } else if (totalItemQuantity <= 0) {
        orderItem.status = 0;
      }

      await orderItem.save();

      await orderReturn.createOrderReturnItem({
        order_items_id: orderItem.id,
        product_name: product.name,
        quantity: product.quantity,
        price: product.price,
        created_at: Date.now() / 1000
      });
    }

    const orderItems = await order.getOrderItems();
    const totalOrderSum = orderItems.reduce(function(sum, item) {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);

    const orderReturnItems = await orderReturn.getOrderReturnItems();
    const totalOrderReturnSum = orderReturnItems.reduce(function(sum, item) {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);

    const orderCount = totalOrderSum - totalOrderReturnSum;
    if (orderCount > 0) {
      order.status = 2;
    } else if (orderCount <= 0) {
      order.status = 0;
    }

    await order.save();

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
