var setting = require('./setting');
var MongoClient = require('mongodb').MongoClient;

var url = setting.url;
var _db;

module.exports = {

  connectToServer: function (callback) {
    MongoClient.connect(url, function (err, db) {
    _db = db;
    return callback(err);
      
    });
  },

  getDb:function (){
      return _db;
  }
  
};
