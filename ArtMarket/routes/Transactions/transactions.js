const express = require("express");
const router = express.Router();
require('dotenv').config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
 user: process.env.USER,
 password: process.env.PASSWORD,
 database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("error: ", err);
    return;
  }
  console.log("Connected to MySQL");
});

//CREATE
router.post("/createbid", (req, res) => {
  const { artworkid, bidderid, bidDate, bidTime, bidAmount, isBuyNow } =
    req.body;

  const insertSql =
    "INSERT INTO transactions (artworkid,bidderid,bidDate,bidTime,bidAmount,isBuyNow) VALUES (?,?,?,?,?,?)";

  const values = [artworkid, bidderid, bidDate, bidTime, bidAmount, isBuyNow];

  connection.query(insertSql, values, (err, result) => {
    if (err) {
      res.status(404).json({ message: err });
      return;
    }
    res.status(200).json({ message: result.affectedRows });
  });
});

//READ
router.get("/transactions", (req, res) => {
  const insertSql = "SELECT * FROM transactions";

  connection.query(insertSql, (err, result) => {
    if (err) {
      res.status(404).json({ message: err });
      console.log(err);
      return;
    }
    res.status(200).json({ message: result });
  });
});

router.get("/showuserbids/:id", (req, res) => {
  const { id } = req.params;
  const condition = `bidid = ${id}`;
  const insertSql = `SELECT * FROM transactions WHERE ${condition}`;

  connection.query(insertSql, (err, result) => {
    if (err) {
      res.status(404).json({ message: err });
      console.log(err);
      return;
    }
    res.status(200).json({ message: result });
  });
});

router.get("/showartworkbids/:artworkid", (req, res) => {
  const { artworkid } = req.params;
  const condition = `artworkid = ${artworkid}`;
  const insertSql = `SELECT * FROM transactions WHERE ${condition}`;

  connection.query(insertSql, (err, result) => {
    if (err) {
      res.status(404).json({ message: err });
      console.log(err);
      return;
    }
    res.status(200).json({ message: result });
  });
});

module.exports = router;
