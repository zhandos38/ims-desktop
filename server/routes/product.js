const express = require("express"),
  router = express.Router(),
  Product = require("../models/product"),
  { getPagination, getPagingData } = require("../functions"),
  { Op } = require("sequelize");

router.get("/", (req, res) => {
  console.log(req.query);
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Product.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/list", (req, res) => {
    Product.findAll()
    .then(suppliers => {
      res.json(suppliers);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/search-by-barcode", (req, res) => {
    const { term } = req.query;

    Product.findAll({
        where: {
            barcode: {
                [Op.like]: '%' + term + '%',
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

router.get("/search-by-name", (req, res) => {
    const { term } = req.query;

    Product.findAll({
        where: {
            name: {
                [Op.like]: '%' + term + '%',
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

router.post("/create", async (req, res) => {
    const { name, phone } = req.body;

    try {
        const supplier = await Product.create({ name: name, phone: phone, created_at: Date.now() / 1000 });
        await supplier.save();
        res.status("200").send("Ok");
    } catch (err) {
        res.status("500").send("error: " + err);
    }
});

router.post("/get-product-by-id", async (req, res) => {
    const { barcode } = req.body;

    Product.findOne({
        where: {
            barcode: barcode
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
