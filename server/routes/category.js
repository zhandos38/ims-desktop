const express = require("express"),
  router = express.Router(),
  { Category } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Category.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/list", (req, res) => {
  Category.findAll()
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
    let category = await Category.create({
      name: name,
      color: color,
      created_at: Date.now() / 1000
    });
    await category.save();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/update", async (req, res) => {
  const dataForm = req.body;

  try {
    await Category.update(
      { ...dataForm },
      {
        where: {
          id: dataForm.id
        }
      }
    );

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get-all", async (req, res) => {
  Category.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/get-by-id", async (req, res) => {
  const { id } = req.query;

  Category.findOne({
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

router.get("/get-by-category", async (req, res) => {
  const { id } = req.query;

  Category.findAll({
    where: {
      category_id: id
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
