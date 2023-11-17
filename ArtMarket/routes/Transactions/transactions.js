const express = require("express");
const router = express.Router();
require('dotenv').config();
const pool = require("../../db/db");

//CREATE
router.post("/createbid", async (req, res) => {
  try{
    const { artworkid, bidderid, bidDate, bidTime, bidAmount, isBuyNow } = req.body;

  const createBid = await pool.query("INSERT INTO transactions (artworkid,bidderid,bidDate,bidTime,bidAmount,isBuyNow) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [artworkid, bidderid, bidDate, bidTime, bidAmount, isBuyNow]);
  console.log("Result: " + createBid.rows[0]);
    res.status(200).json(createBid.rows[0]);
  } catch (err)
{
  console.error("Error submitting bid: ", err);
  res.status(500).json({ error: err });
}  
});

//READ
router.get("/transactions", async (req, res) => {
  try{
  const getTransactions = await pool.query("SELECT * FROM transactions")
  if (getTransactions.rowCount > 0) {
    res.status(200).json(getTransactions.rows);
  } else {
    res.status(404).json({message: "Error getting transactions"});
  }
}catch(err) {
res.status(500).json(err);
}
});

router.get("/showuserbids/:bidderid", async (req, res) => {
  try{
    const bidderid  = [req.params.bidderid];

  const getTransaction = await pool.query(`SELECT * FROM transactions WHERE bidderid = ($1)`, bidderid);
  if (getTransaction.rowCount > 0) {
    res.status(200).json(getTransaction.rows);
  } else {
    res.status(404).json({message: "Error finding transaction"});
  }
}catch(err) {
res.status(500).json(err);
}
});

router.get("/showartworkbids/:artworkid", async (req, res) => {
  try{
    const artworkid = [req.params.artworkid];

  const getArtworkBids = await pool.query(`SELECT * FROM transactions WHERE artworkid = ($1)`, artworkid);
  if (getArtworkBids.rowCount > 0) {
    res.status(200).json(getArtworkBids.rows);
  } else {
    res.status(404).json({message: "Error finding transaction"});
  }
}catch(err) {
res.status(500).json(err);
}
});

module.exports = router;
