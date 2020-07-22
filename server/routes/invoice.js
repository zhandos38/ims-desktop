const express = require('express'),
    router = express.Router(),
    Invoice = require('../models/invoice');

router.get('/', (req, res) => {
  console.log(req.query)
  const {page, size} = req.query

  const { limit, offset } = getPagination(page, size);

  Invoice.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.json(response)
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: invoice } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  const records = invoice;

  return { totalItems, records, totalPages, currentPage };
};

module.exports = router;
