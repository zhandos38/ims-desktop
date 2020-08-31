const express = require("express"),
  router = express.Router(),
  { Cashbox } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Cashbox.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
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
    const cashbox = await Cashbox.create({
      ...dataForm,
      created_at: Date.now() / 1000
    });
    await cashbox.save();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/list", async (req, res) => {
  const { id } = req.query;

  Cashbox.findAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send("error: " + err);
      });
});

router.get("/get", async (req, res) => {
  const { id } = req.query;

  Cashbox.findOne({
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
