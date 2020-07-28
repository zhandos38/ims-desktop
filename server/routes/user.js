const express = require("express"),
  router = express.Router(),
  User = require("../models/user");

router.get("/", (req, res) => {
  User.findAll()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/login", (req, res) => {
  console.log(req);
  const { username, password } = req.body;

  User.findOne({
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

module.exports = router;
