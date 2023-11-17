var express = require("express");
var router = express.Router();
require('dotenv').config();
const pool = require("../../db/db");

//Creating a new user
router.post("/Createuser", async (req, res) => {
  try {
      const {name, surname, username, password, age, email, usertype, bio, phonenumber} = req.body;
      
    const newUser = await pool.query("insert into users (name, surname, username, password, age, email, usertype, bio, phonenumber) values ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *", [name, surname, username, password, age, email, usertype, bio, phonenumber]);
      console.log("Result: " + newUser.rows[0]);
      res.status(200).json(newUser.rows[0]);
  } catch (err) {
    console.error("Error creating user: ", err);
    res.status(500).json({error: err});
  }
});

// Find specific user
router.get("/Finduser", async (req, res) => {
  try {
    const {username, password} = req.body;

    const findUser = await pool.query("select * from users where username=($1) and password=($2)", [username, password]);
        if (findUser.rowCount > 0) {
            res.status(200).json(findUser.rows);
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
      const {name, surname, username, password, age, email, bio, phonenumber, userid} = req.body;

    const updateUser = await pool.query("update users set name=($1), surname=($2), username=($3), password=($4), age=($5), email=($6), bio=($7), phonenumber=($8) where userid=($9)", [name, surname, username, password, age, email, bio, phonenumber, userid]);
      console.log("Updated successfully");
      res.status(200).json({message: "Updated successfully"});
  
  } catch (err) {
    console.error("Error updating user: ", err);
    res.status(500).json({error: "Error updating user"});
  }
});

//delete a user
router.delete("/Deleteuser/:userid", async (req, res) => {
  try {
    const values = [req.params.userid];

    const deleteUser = await pool.query("delete from users where userid=($1)", values);
      console.log("User deleted successfully");
      res.status(200).json({message: "User deleted successfully"});
    
  } catch (err) {
    console.error("Error deleting user: ", err);
        res.status(500).json({error: err});
  }
});

//get all users
router.get("/users", async (req, res) => {
  try {
    const getUsers = await pool.query("select * from users");
      if (getUsers.rowCount > 0) {
        res.status(200).json(getUsers.rows);
      } else {
        res.status(404).json({message: "No users found"});
      }
    }catch(err) {
    res.status(500).json(err);
  }
});
module.exports = router;
