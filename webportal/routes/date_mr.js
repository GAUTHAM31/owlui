var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:date', function(req, res, next) {
  res.render('date_mr', { date: req.params.date });
});

router.get('/:date/:mrno', function(req, res, next) {
  res.render('view', { date: req.params.date ,mrno: req.params.mrno});
});
module.exports = router;