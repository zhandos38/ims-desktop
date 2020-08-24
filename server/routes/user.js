const express = require("express"),
  router = express.Router(),
  { User, Sequelize } = require("../models/index"),
  bcrypt = require("bcrypt"),
  { getPagination, getPagingData } = require("../functions");

router.get("/", (req, res) => {
  const { page, size } = req.query;

  const { limit, offset } = getPagination(page, size);

  User.findAndCountAll({ limit, offset, where: { "role": { [Sequelize.Op.not]: "director" } }, order: [["id", "DESC"]] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: {
      username: username
    }
  })
    .then(user => {
      if (!user) {
        res.status("404").send("User is not found");
        return;
      }

      bcrypt.compare(password, user.password_hash, (err, result) => {
        if (result) {
          res.status("200").send(user);
        } else {
          res.status("404").send("Incorrect username or password");
        }
      });
    })
    .catch(err => {
      res.status("500").send("error: " + err);
    });
});

router.post("/create", async (req, res) => {
  const dataForm = req.body;

  try {
    await bcrypt.hash(dataForm.password, 10, async (err, hash) => {
      const user = await User.create({
        username: dataForm.username,
        full_name: dataForm.full_name,
        role: dataForm.role,
        status: dataForm.status,
        password_hash: hash,
        created_at: Date.now() / 1000,
        updated_at: Date.now() / 1000
      });

      await user.save();
    });

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.post("/update", async (req, res) => {
  const dataForm = req.body;

  try {
    if (dataForm.password) {
      await bcrypt.hash(dataForm.password, 10, async (err, hash) => {
        await User.update(
          {
            username: dataForm.username,
            full_name: dataForm.full_name,
            role: dataForm.role,
            status: dataForm.status,
            password_hash: hash,
            updated_at: Date.now() / 1000
          },
          {
            where: {
              id: dataForm.id
            }
          }
        );

        await user.save();
      });
    } else {
      await User.update(
        {
          username: dataForm.username,
          full_name: dataForm.full_name,
          role: dataForm.role,
          status: dataForm.status,
          updated_at: Date.now() / 1000
        },
        {
          where: {
            id: dataForm.id
          }
        }
      );

      await user.save();
    }

    res.status("200").send("Ok");
  } catch (err) {
    res.status("500").send("error: " + err);
  }
});

router.get("/get-by-id", async (req, res) => {
  const { id } = req.query;

  User.findOne({
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
