var express = require('express');
var router = express.Router();
var user = require('../model_mongo/model');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user : req.session.user
  });
});

router.get('/house_list', function(req, res, next){
  res.render('house_list');
});

router.get('/publish', function(req, res, next){
  res.render('publish');
});


//注册模块
router.post('/register', function (req, res, next) {

  var account = {
  phonenum : req.body.phonenum,
  username : req.body.username,
  password : req.body.password
  };

  user.saveAccount(account, function (err, result) {
    if (err)  throw err;
    if (result == false) {
      console.log("账号已存在");
      res.send('<p>账号已存在</p>');

    }
    else{
      req.session.user = req.body.username;
      res.redirect('/');
    }
   });

});


//注销模块
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
});


router.post('/login', function (req, res, next) {

  var account = {
    phonenum : req.body.phonenum,
    password : req.body.password
  };

  user.findAccount(account, function (result) {
    console.log(result);
    if (result.length == 0) {
      res.send('<p>您的账号或密码错误</p>');
    }
    else{
      req.session.user = result[0].username;
      res.redirect('/');
    }
  })
})



module.exports = router;
