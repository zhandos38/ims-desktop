const express = require("express"),
  router = express.Router(),
  { OrderReturn, OrderReturnItems, Order, User } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  OrderReturn.findAndCountAll({
    include: [
      Order,
      OrderReturnItems
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

  OrderReturn.findOne({
    include: [
      Order,
      OrderReturnItems,
      User
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

module.exports = router;
