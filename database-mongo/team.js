var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/team");

var db = mongoose.connection;

db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});



var teamSchema = mongoose.Schema({
  name:  String,
  age:  Number,
  position:  String,
  contract: Date
});

var Team = mongoose.model("Team", teamSchema);

var selectAll = function(callback) {
  Team.find({}, function(err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
}

  var findOne = function(name,callback) {
    Team.find({name: name}, callback);
  }

  var insertOne = function(team,callback) {
    Team.create(team, callback);
  }


module.exports.selectAll = selectAll;
module.exports.insertOne = insertOne;
module.exports.findOne = findOne;
