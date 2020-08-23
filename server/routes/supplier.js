const express = require("express"),
  router = express.Router(),
  { Supplier } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Supplier.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
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
    const supplier = await Supplier.create({
      name: name,
      phone: phone,
      created_at: Date.now() / 1000
    });
    await supplier.save();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/update", async (req, res) => {
  const dataForm = req.body;

  try {
    await Supplier.update({ ...dataForm }, {
      where: {
        id: dataForm.id
      }
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get-by-id", async (req, res) => {
  const { id } = req.query;

  Supplier.findOne({
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
