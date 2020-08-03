const express = require("express"),
  router = express.Router(),
  Barcode = require("../models/barcode");

router.get("/search-by-barcode", (req, res) => {
    const { barcode } = req.query;

    Barcode.findOne({
        where: {
            number: barcode
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
