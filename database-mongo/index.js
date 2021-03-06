var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

var userSchema = mongoose.Schema({
  username:  String,
  email:  String,
  password:  String
});

var User = mongoose.model("User", userSchema);

var selectAll = function(callback) {
  User.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
}

  var findOne = function(username,callback) {
    User.find({username: username}, callback);
  }

  var insertOne = function(user,callback) {
    User.create(user, callback);
  }


module.exports.selectAll = selectAll;
module.exports.insertOne = insertOne;
module.exports.findOne = findOne;
