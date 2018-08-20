var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:mrno', function(req, res, next) {
	var mrno = req.params.mrno;
	res.render('mrno', { title: mrno });
});

module.exports = router;