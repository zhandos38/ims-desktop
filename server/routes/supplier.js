const express = require('express'),
    router = express.Router(),
    Supplier = require('../models/supplier');

router.get('/', (req, res) => {
  Supplier.findAll()
    .then(invoice => {
      res.json(invoice)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = router;
