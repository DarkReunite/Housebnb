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

  findAccount: function (account, callback) {
    var mydb = mongo.getDb().db(mongodb.accountDB);
    mydb.collection(mongodb.accountDB).find({'phonenum':account.phonenum,'password':account.password}).toArray(function (err, docs) {
      if (err) throw err;
 
      
      callback(docs);
        
      
    });
  }


};