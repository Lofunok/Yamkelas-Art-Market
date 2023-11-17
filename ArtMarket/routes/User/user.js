var express = require("express");
var router = express.Router();
require('dotenv').config();
const pool = require("../../db/db");

//Creating a new user
router.post("/Createuser", async (req, res) => {
  try {
    
    
      const {name, surname, username, password, age, email, usertype, bio, phonenumber} = request.body;
      
  

    const newUser = await pool.query("insert into users (name, surname, username, password, age, email, usertype, bio, phonenumber) values ( $1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [name, surname, username, password, age, email, usertype, bio, phonenumber]);
      console.log("Result: " + newUser.rows[0]);
      res.status(200).json({message: "created" + newUser.rows[0]});
  } catch (err) {
    console.error("Error creating user: ", err);
    res.status(500).json({error: err});
  }
});

// Find specific user
router.get("/Finduser", async (req, res) => {
  try {
    var sql = "select * from users where username=? and password=?";

    var values = [
      req.body.hasOwnProperty("username") ? req.body.username : "",
      req.body.hasOwnProperty("password") ? req.body.password : "",
    ];

    const findUser = await pool.query(sql, values);
        if (findUser.length > 0) {
            res.status(200).json(findUser);
          } else {
            res.status(404).json({message: "Incorrect username or password"});
          }
  } catch (err) {
    res.status(404);
    throw Error("Invalid JSON");
  }
});

//update a user
router.put("/Updateuser", async (req, res) => {
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

    const updateUser = await pool.query(sql, values);
      console.log("Result: " + updateUser[0]);
      res.status(200).json({
        message: "updated",
      });
  
  } catch (err) {
    console.error("Error updating artwork: ", err);
    res.status(500).json({error: "Error updating artwork"});
  }
});

//delete a user
router.delete("/Deleteuser/:userid", async (req, res) => {
  try {
    var sql = "delete from users where userid=?";
    var values = [req.params.userid];

    const deleteUser = await pool.query(sql, values);
      console.log("Result: " + deleteUser);

      res.status(200).json({
        message: "deleted",
      });
    
  } catch (err) {
    console.error("Error deleting user: ", err);
        res.status(500).json({error: err});
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    var sql = "select * from users";

    const getUsers = await pool.query(sql);
      if (getUsers.length > 0) {
        res.status(200).json(getUsers.rows);
      } else {
        res.status(404).json({message: "Error getting users"});
      }
    }catch(err) {
    res.status(500).json(err);
  }
});
module.exports = router;
