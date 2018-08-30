var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  	res.download('https://srujana.blob.core.windows.net/pupil-data/N109156/2018/08/17/15_39_43/Images/plot.svg', "download"); 

});

module.exports = router;
