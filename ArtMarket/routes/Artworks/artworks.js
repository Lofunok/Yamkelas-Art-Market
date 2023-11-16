var express = require("express");
var multer = require('multer');
var router = express.Router();
const path = require('path');

//Creating connection
var mysql = require("mysql2");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "79252626Lmk#",
  database: "art_market_db",
});

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const destinationPath = path.join(__dirname,'..','..', 'images');
    callback(null, destinationPath);
  },
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
})

const images = multer({storage: storage});

//Validating connection
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL");
});




module.exports = router;