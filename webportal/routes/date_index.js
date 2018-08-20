var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('date', { title: 'Express' });
});
router.get('/:date', function(req, res, next) {
  res.render('date_mr', { date: req.params.date });
});

router.get('/:date/:mrno/Images/:eye', function(req, res, next) {
  res.render('view_photo', { date: req.params.date ,mrno: req.params.mrno,eye: req.params.eye});
});


router.get('/:date/:mrno', function(req, res, next) {
  res.render('view', { date: req.params.date ,mrno: req.params.mrno});
});



module.exports = router;
