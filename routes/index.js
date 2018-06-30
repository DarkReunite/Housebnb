var express = require('express');
var router = express.Router();
var User = require('../model_mongo/model');
var fs = require('fs');
var multer = require('multer');   //接收图片

//定义图片上传的临时目录
var upload = multer({
  dest: './uploads'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    usersession : req.session.user
  });
});


//显示搜索房源结果
router.get('/house_list', function(req, res, next){
  var house = [];

  user_path = "./public/images/user/";
  var user_house = fs.readdirSync(user_path);
  user_house.forEach(username => {
    var myReg = /\d+/;
    if (username.match(myReg)) {
      var house_path = user_path + username;
      var house_list = fs.readdirSync(house_path);
      var myReg1 = /^[^.]+/;
      
      house_list.forEach(house_name => {

        
        if (house_name.match(myReg1)) {
          var house_img_path = house_path + "/" + house_name;
          
          var img = fs.readdirSync(house_img_path);
          img.forEach(function (imageFile) {
            var imgpath = "/images/user/" + username + "/" + house_name + "/" +imageFile;

            var house_info = {
              ownername: username,
              housename: house_name,
              imgpath: imgpath
            };

            
            
            house.push(house_info);


          });
          
        }

      });
      
    }
    

  });

  
  console.log(house);
  res.render('house_list', {
    usersession : req.session.user,
    houselist: house
  });
});





router.get('/house_detail/:housename', function (req, res, next) {
  console.log(req.params.housename);
  var house_info = {
    ownerAccount:req.session.phonenum,
    houseName:req.params.housename
  }
  User.findOneHouse(house_info,function (result) {
    console.log(result);
    res.render('house_detail',{
      usersession : req.session.user,
      houseinfo: result
    });
  })
  
});

router.get('/user_info', function (req, res, next) {
  User.findAllHouse(req.session.phonenum,function (result) {
    console.log(result);
    res.render('user_info',{
      usersession : req.session.user,
      houselist : result
    });
  })
  
});


router.get('/publish', function(req, res, next){
  
  res.render('publish', {
    usersession : req.session.user
  });
});


//注册模块
router.post('/register', function (req, res, next) {

  var account = {
  phonenum : req.body.phonenum,
  username : req.body.username,
  password : req.body.password
  };

  User.saveAccount(account, function (err, result) {
    if (err)  throw err;
    if (result == false) {
      console.log("账号已存在");
      res.send('<p>账号已存在</p>');
    }

    else{
      req.session.user = req.body.username;
      req.session.phonenum= req.body.phonenum;
      res.redirect('/');
    }

   });

});


//注销模块
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

//登陆模块
router.post('/login', function (req, res, next) {

  var account = {
    phonenum : req.body.phonenum,
    password : req.body.password
  };

  User.findAccount(account, function (result) {
    console.log(result);
    if (result.length == 0) {
      res.send('<p>您的账号或密码错误</p>');
    }
    else{
      req.session.user = result[0].username;
      req.session.phonenum = req.body.phonenum;
      res.redirect('/');
    }
  });
});



//发布房源模块
router.post('/publish',upload.single('imageFile'), function (req, res, next) {
  
  var user_path = "./public/images/user/" + req.session.phonenum;
  var house_path = "./public/images/user/" + req.session.phonenum + "/" + req.body.houseName + "/";

  if (!fs.existsSync('./public/user')) {   //判断user目录是否存在
    fs.mkdir('./public/user', function (err) {
      if (err) throw err;
    });
  }

  if (!fs.existsSync(user_path)) {    //判断user_path目录是否存在
    fs.mkdir(user_path,function (err) {
      if (err) throw err;
      console.log("success create a user_path");
      
    });
  }

  if (!fs.existsSync(house_path)) {   //判断house_path目录是否存在
    fs.mkdir(house_path, function (err) {
      if (err) throw err;
      console.log("success create a housedir");
      //房源图片保存
    fs.rename(req.file.path, house_path + req.file.originalname, function(err) {
      if (err) {
        throw err;
      }
      console.log('上传成功!');
    });

    });
  }

  

  //提供的设施
  var house_offer = {};

  if (req.body.WIFI) {
    house_offer.WIFI = true;
  }
  if (req.body.park) {
    house_offer.park = true;
  }
  if (req.body.TV) {
    house_offer.TV = true;
  }
  if (req.body.aircon) {
    house_offer.aircon = true;
  }
  if (req.body.washer) {
    house_offer.washer = true;
  }
  if (req.body.blower) {
    house_offer.blower = true;
  }
  if (req.body.toiletries) {
    house_offer.toiletries = true;
  }
  if (req.body.heating) {
    house_offer.heating = true;
  }
  if (req.body.hanger) {
    house_offer.hanger = true;
  }

  var house_info = {
    ownerAccount:req.session.phonenum,
    houseName:req.body.houseName,
    bedroom: req.body.bedroom,
    bed: req.body.bed,
    restroom: req.body.restroom,
    liveIn: req.body.liveIn,
    province: req.body.province,
    city: req.body.city,
    area: req.body.area,
    address: req.body.address,
    house_offer: house_offer,
    price: req.body.price
  };

  console.log(house_info);

  //保存房源信息到数据库中
  User.saveHouse(house_info, function (result) {
    res.redirect('/');
  });
  
  
});


module.exports = router;
