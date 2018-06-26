var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/home', function(req, res, next){
  res.render('home');
});

router.get('/publish', function(req, res, next){
  res.render('publish');
});

module.exports = router;
