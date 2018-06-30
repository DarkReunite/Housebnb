var mongo = require('./db');
var mongodb = require('./setting');


module.exports = {


  //保存账号进数据库 注册功能
  saveAccount: function (account,callback) {
    var mydb = mongo.getDb().db(mongodb.accountDB);

    mydb.collection(mongodb.accountDB).find({'phonenum':account.phonenum}).toArray(function (err, docs) {
      console.log(docs);
      
      if (docs.length == 0) {
        mydb.collection(mongodb.accountDB).insertOne(account,function (err, result) {
          console.log("插入成功");
          
          callback(err,result);
        });
      }
      else{
        console.log("插入失败");
        
        callback(err,false);
      }
    });
    
  },

  //登陆功能
  findAccount: function (account, callback) {
    var mydb = mongo.getDb().db(mongodb.accountDB);
    mydb.collection(mongodb.accountDB).find({'phonenum':account.phonenum,'password':account.password}).toArray(function (err, docs) {
      if (err) throw err;
 
      
      callback(docs);
        
      
    });
  },

  //将房源信息保存到数据库中
  saveHouse: function (house_info, callback) {
    var mydb = mongo.getDb().db(mongodb.houseDB);
    mydb.collection(mongodb.houseDB).insertOne(house_info, function (err, result) {
      if (err) throw err;
      console.log("success to save the house_info");
      callback(result);
      
    });
  },

  findAllHouse: function (phonenum,callback) {
    var mydb = mongo.getDb().db(mongodb.houseDB);
    console.log(phonenum);
    
    mydb.collection(mongodb.houseDB).find({'ownerAccount':phonenum}).toArray(function (err, data) {
      if (err) throw err;

      callback(data);
    });
  },

  findOneHouse: function (house_info,callback) {
    var mydb = mongo.getDb().db(mongodb.houseDB);
    mydb.collection(mongodb.houseDB).find({'ownerAccount':house_info.ownerAccount,'houseName':house_info.houseName}).toArray(function (err, data) {
      if (err) throw err;

      callback(data);
    });
  }

};