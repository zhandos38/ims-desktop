const express = require("express"),
  router = express.Router(),
  { Settings } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.post("/create", async (req, res) => {
  const dataForm = req.body;

  console.log(dataForm);

  try {
    const settings = await Settings.create(dataForm);

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get-all", async (req, res) => {
  Settings.findAll()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.send("error: " + err);
      });
});

router.get("/get", async (req, res) => {
  const { id } = req.query;

  Settings.findOne({
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
