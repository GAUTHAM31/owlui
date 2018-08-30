var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('date', { title: 'Express' });
});
router.get('/:date', function(req, res, next) {
  res.render('date_mr', { date: req.params.date });
});

router.get('/:date/:mrno/:time/Images/:eye', function(req, res, next) {

	var date_ = req.params.date;
	var mrno_ = req.params.mrno;
	var eye_  = req.params.eye;
	var time_ = req.params.time;
 	res.render('view_photo', { date: date_ ,mrno: mrno_ ,eye: eye_, time: time_});
});

router.get('/:date/:mrno/Images/:eye', function(req, res, next) {
  res.render('view_photo', { date: req.params.date ,mrno: req.params.mrno,eye: req.params.eye});
});


router.get('/:date/:mrno/:time', function(req, res, next) {
  res.render('view', { date: req.params.date ,mrno: req.params.mrno,time: req.params.time});
});



module.exports = router;
