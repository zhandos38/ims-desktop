const express = require("express"),
  router = express.Router(),
  { Customer, Sequelize } = require("../models/index"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  Customer.findAndCountAll({ limit, offset, order: [["id", "DESC"]] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.get("/list", (req, res) => {
  Customer.findAll()
    .then(suppliers => {
      res.json(suppliers);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/create", async (req, res) => {
  const dataForm = req.body;

  try {
    const customer = await Customer.create({
      ...dataForm,
      created_at: Date.now() / 1000
    });
    await customer.save();

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/update", async (req, res) => {
  const dataForm = req.body;

  try {
    await Customer.update(
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

router.get("/get-by-id", async (req, res) => {
  const { id } = req.query;

  Customer.findOne({
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

router.get("/search", async (req, res) => {
  const { name, phone } = req.query;

  Customer.findAll({
    where: {
	  	[Sequelize.Op.or]: {
  			full_name: {
	      		[Sequelize.Op.like]: `%${name}%`
	      	},
      		phone: {
	      		[Sequelize.Op.like]: `%${phone}%`
	      	}
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

module.exports = router;
