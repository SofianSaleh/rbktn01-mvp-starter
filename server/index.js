var express = require("express");
var bodyParser = require("body-parser");
const User = require("../database-mongo/index");
const team = require("../database-mongo/team");
const port = process.env.PORT || 5000;
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require("../database-mongo");

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + "/../react-client/dist"));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());


// app.get('/login', (req, res, done) =>{
//   app.use(express.static('client/build'));
//   res.status(201).json({ message: "Hello World!" }));
// } 

app.use(express.static('client/build'));


app.post("/signup", function(req, res) {
  data = req.body;
  console.log(data)
  User.findOne(data.username, (err, result) => {
    if (err) {
      return console.log("error");
    }
    if (result.length > 0) {
      res.send("user-exist");
    } else {
      User.insertOne(data, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send("user-not-exist");
        }
      });
    }
  });
});


app.post('/signin', function(req, res){   

	User.findOne(req.body.username, function(err, result) {
		if (err) {
			console.log(err);
			return;
		}
		if (result.length > 0) {
			if (result[0].password === req.body.password) {
				res.send("successAuth");
			} else {
				res.send("noAuth");
			}
		} else {
			res.send("noUser");
		}
	})
});

app.post("/team", function(req, res) {
  data = req.body;
  team.findOne(data.name, (err, result) => {
    if (err) {
      return console.log("error");
    }
    if (result.length > 0) {
      res.send('Player Exists')
    }else{
      team.insertOne(data, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.send("Player Added");
        }
      })
    }
    })
});


app.get("/team", function(req, res) {
 team.selectAll((err, result) => {
   if(err) return console.log('error')
   else res.send(result)
 })
});


app.listen(port, function() {
  console.log("listening on port 3000!");
});
