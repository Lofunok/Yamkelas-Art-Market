const express = require("express");
const router = express.Router();
require('dotenv').config();
const pool = require("../../db/db");

//CREATE
router.post("/createbid", async (req, res) => {
  try{
    const { artworkid, bidderid, bidDate, bidTime, bidAmount, isBuyNow } =
    req.body;

  const insertSql =
    "INSERT INTO transactions (artworkid,bidderid,bidDate,bidTime,bidAmount,isBuyNow) VALUES (?,?,?,?,?,?)";

  const values = [artworkid, bidderid, bidDate, bidTime, bidAmount, isBuyNow];

  const createBid = await pool.query(insertSql, values);
    res.status(200).json({ message: createBid.affectedRows });
  } catch (err)
{
  res.status(500).json({ error: err });
}  
});

//READ
router.get("/transactions", async (req, res) => {
  try{
    const insertSql = "SELECT * FROM transactions";

  const getTransactions = await pool.query(insertSql)
    res.status(200).json({ message: getTransactions });
  } catch (err){
    res.status(404).json({ message: err });
      console.log(err);
  }
  
});

router.get("/showuserbids/:id", async (req, res) => {
  try{
    const { id } = req.params;
  const condition = `bidid = ${id}`;
  const insertSql = `SELECT * FROM transactions WHERE ${condition}`;

  const getTransaction = await pool.query(insertSql);
    res.status(200).json({ message: getTransaction });
  } catch (err)
  {
    res.status(404).json({ message: err });
      console.log(err);
  }
  
});

router.get("/showartworkbids/:artworkid", async (req, res) => {
  try{
    const { artworkid } = req.params;
  const condition = `artworkid = ${artworkid}`;
  const insertSql = `SELECT * FROM transactions WHERE ${condition}`;

  const getArtworkBids = await pool.query(insertSql)
    res.status(200).json({ message: getArtworkBids });
  }catch (err)
  {
    res.status(404).json({ message: err });
      console.log(err);
  }
  
});

module.exports = router;
