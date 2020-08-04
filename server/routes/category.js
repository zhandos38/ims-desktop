const express = require("express"),
  router = express.Router(),
  Model = require("../models/category"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Model.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/list", (req, res) => {
  Model.findAll()
    .then(models => {
      res.json(models);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/create", async (req, res) => {
  const { name, color } = req.body;

  try {
    const supplier = await Model.create({
      name: name,
      color: color,
      created_at: Date.now() / 1000
    });
    await supplier.save();
    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

module.exports = router;
