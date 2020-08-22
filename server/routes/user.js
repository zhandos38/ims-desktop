const express = require("express"),
    router = express.Router(),
    Model = require("../models/user"),
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

router.post("/login", (req, res) => {
  console.log(req);
  const { username, password } = req.body;

    Model.findOne({
    where: {
      username: username
    }
  })
    .then(user => {
      if (!user) {
        res.status("404").send("invalid username or password");
      }

      // bcrypt.compare(password, user.password_hash, function (err, result) {
      //   if (result === true) {
      //     console.log('hello')
      //   } else {
      //     console.log('error')
      //     // return res.status('400').send('Incorrect password')
      //   }
      // })

      res.status("200").send(user);
    })
    .catch(err => {
      return res.status("500").send("error: " + err);
    });
});

router.post("/create", async (req, res) => {
    const dataForm = req.body;

    try {
        const supplier = await Model.create({
            ...dataForm,
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
        let supplier = await Model.update({ ...dataForm }, {
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

    Model.findOne({
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
