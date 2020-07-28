const express = require("express"),
  router = express.Router(),
  Supplier = require("../models/supplier"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  console.log(req.query);
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Supplier.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/list", (req, res) => {
  Supplier.findAll()
    .then(suppliers => {
      res.json(suppliers);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/create", async (req, res) => {
    const { name, phone } = req.body;

    try {
        const supplier = await Supplier.create({ name: name, phone: phone, created_at: Date.now() / 1000 });
        await supplier.save();
        res.status("200").send("Ok");
    } catch (err) {
        res.status("500").send("error: " + err);
    }
});

module.exports = router;
