var express = require("express");
var router = express.Router();

//Creating connection
var mysql = require("mysql2");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "79252626Lmk#",
  database: "art_market_db",
});

//Validating connection
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL");
});

//Creating a new user
router.post("/Createuser", function (req, res, next) {
  try {
    var sql =
      "insert into users (name, surname, username, password, age, email, usertype, bio, phonenumber) values (?,?,?,?,?,?,?,?,?)";
    var values = [
      req.body.hasOwnProperty("name") ? req.body.name : "",
      req.body.hasOwnProperty("surname") ? req.body.surname : "",
      req.body.hasOwnProperty("username") ? req.body.username : "",
      req.body.hasOwnProperty("password") ? req.body.password : "",
      req.body.hasOwnProperty("age") ? req.body.age : 0,
      req.body.hasOwnProperty("email") ? req.body.email : "",
      req.body.hasOwnProperty("usertype") ? req.body.usertype : "",
      req.body.hasOwnProperty("bio") ? req.body.bio : "",
      req.body.hasOwnProperty("phonenumber") ? req.body.phonenumber : "",
    ];

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);

      res.json({
        status: "created",
      });
    });
  } catch (e) {
    res.status(404);
    throw Error("Invalid JSON");
  }
});

// Find specific user
router.get("/Finduser", function (req, res, next) {
  try {
    var sql = "select * from users where username=? and password=?";

    var values = [
      req.body.hasOwnProperty("username") ? req.body.username : "",
      req.body.hasOwnProperty("password") ? req.body.password : "",
    ];

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);

      res.json({
        status: "found",
      });
    });
  } catch (e) {
    res.status(404);
    throw Error("Invalid JSON");
  }
});

//update a user
router.post("/Updateuser", function (req, res, next) {
  try {
    var sql =
      "update product set name=?, surname=?, username=?, password=?, age=?, email=?, bio=?, phonenumber=?";

    var values = [
      req.body.hasOwnProperty("name") ? req.body.name : "",
      req.body.hasOwnProperty("surname") ? req.body.surname : "",
      req.body.hasOwnProperty("username") ? req.body.username : "",
      req.body.hasOwnProperty("password") ? req.body.password : "",
      req.body.hasOwnProperty("age") ? req.body.age : 0,
      req.body.hasOwnProperty("email") ? req.body.email : "",
      req.body.hasOwnProperty("bio") ? req.body.bio : "",
      req.body.hasOwnProperty("phonenumber") ? req.body.phonenumber : "",
    ];

    con.query(sql, values, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);

      res.json({
        status: "created",
      });
    });
  } catch (e) {
    res.status(404);
    throw Error("Invalid JSON");
  }
});
module.exports = router;
