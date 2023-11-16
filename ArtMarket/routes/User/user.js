var express = require("express");
var router = express.Router();
require('dotenv').config();


//Creating connection
var mysql = require("mysql2");
var con = mysql.createConnection({
 host: process.env.HOST,
 user: process.env.USER,
 password: process.env.PASSWORD,
 database: process.env.DATABASE,
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
      if (err) {
    console.error("Error querying artworks table: ", err);
    res.status(500).json({error: err});
    return;
      }
      console.log("Result: " + result);
      res.status(200).json({message: "created"});
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
        if (results.length > 0) {
            res.status(200).json(result);
          } else {
            res.status(404).json({message: "Incorrect username or password"});
          }
    });
  } catch (e) {
    res.status(404);
    throw Error("Invalid JSON");
  }
});

//update a user
router.put("/Updateuser", function (req, res, next) {
  try {
    var sql =
      "update users set name=?, surname=?, username=?, password=?, age=?, email=?, bio=?, phonenumber=? where userid=?";

    var values = [
      req.body.hasOwnProperty("name") ? req.body.name : "",
      req.body.hasOwnProperty("surname") ? req.body.surname : "",
      req.body.hasOwnProperty("username") ? req.body.username : "",
      req.body.hasOwnProperty("password") ? req.body.password : "",
      req.body.hasOwnProperty("age") ? req.body.age : 0,
      req.body.hasOwnProperty("email") ? req.body.email : "",
      req.body.hasOwnProperty("bio") ? req.body.bio : "",
      req.body.hasOwnProperty("phonenumber") ? req.body.phonenumber : "",
      req.body.hasOwnProperty("userid") ? req.body.userid : "",
    ];

    con.query(sql, values, function (err, result) {
      if (err) {
        console.error("Error updating artwork: ", err);
  res.status(500).json({error: "Error updating artwork"});
      }
      console.log("Result: " + result);
      res.status(200).json({
        message: "updated",
      });
    });
  } catch (e) {
    res.status(404);
    throw Error("Invalid JSON");
  }
});

//delete a user
router.delete("/Deleteuser/:userid", function (req, res, next) {
  try {
    var sql = "delete from users where userid=?";
    var values = [req.params.userid];

    con.query(sql, values, function (err, result) {
      if (err) 
      {
        console.error("Error deleting user: ", err);
        res.status(500).json({error: err});
      }

      console.log("Result: " + result);

      res.status(200).json({
        message: "deleted",
      });
    });
  } catch (e) {
    res.status(500);
    throw Error("invalid JSON");
  }
});

//get all users
router.get("/users", function (req, res, next) {
  try {
    var sql = "select * from users";

    con.query(sql, function (err, result) {
      if (results.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({message: "Incorrect username or password"});
      }
    });
  } catch (e) {
    res.status(500);
    throw Error("invalid JSON");
  }
});
module.exports = router;
