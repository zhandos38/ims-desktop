const express = require("express"),
  router = express.Router(),
  { Product } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions"),
  { Op } = require("sequelize");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Product.findAndCountAll({
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
        [Op.like]: "%" + term + "%"
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
        [Op.like]: "%" + term + "%"
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
  const dataForm = req.body;

  try {
    const product = await Product.create({
      ...dataForm,
      created_at: Date.now() / 1000,
      updated_at: Date.now() / 1000
    });
    await product.save();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/update", async (req, res) => {
  const dataForm = req.body;

  try {
    let product = await Product.update(
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

router.get("/get", (req, res) => {
  const { id } = req.query;

  Product.findOne({
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

router.get("/get-by-category", (req, res) => {
  const { id } = req.query;

  Product.findAll({
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

router.post("/set-category", (req, res) => {
  const { categoryId, newLinkedProductIds, unlinkedProductIds } = req.body;

  try {
    if (typeof newLinkedProductIds !== "undefined") {
      newLinkedProductIds.forEach(async id => {
        await Product.update(
          {
            category_id: categoryId
          },
          {
            where: {
              id: id
            }
          }
        );
      });
    }

    if (typeof unlinkedProductIds !== "undefined") {
      unlinkedProductIds.forEach(async id => {
        await Product.update(
          {
            category_id: null
          },
          {
            where: {
              id: id
            }
          }
        );
      });
    }

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

module.exports = router;
