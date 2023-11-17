var express = require("express");
var router = express.Router();
require('dotenv').config();
const pool = require("../../db/db");

//create new artwork for bidding
router.post("/createartwork", async (req, res) => {
  try{
    const {
    artworkName,
    artworkImg,
    description,
    catagories,
    sellerid,
    dateListed,
    timeListed,
    scheduledcloseDate,
    active,
    buyNowPrice,
  } = req.body;

  const query = `INSERT INTO artworks (artworkName, artworkImg, description, catagories, sellerid,dateListed,timeListed,scheduledcloseDate,active,buyNowPrice) VALUES ('${artworkName}', '${artworkImg}', '${description}', '${catagories}', '${sellerid}', '${dateListed}', '${timeListed}', '${scheduledcloseDate}', '${active}', '${buyNowPrice}')`;

  const createArtwork = await pool.query(query);
    console.log("Artwork created successfully!" + createArtwork[0]);
    res.status(200).json({message: "Artwork created successfully!"});
  } catch (err) {
    console.error("Error creating artwork: ", err);
    res.status(500).send("Error creating artwork");
}
});


//edit details of existing artwork
router.put("/updateartwork", async(req, res) => {
  try{const {
    artworkName,
    artworkImg,
    description,
    catagories,
    sellerid,
    dateListed,
    timeListed,
    scheduledcloseDate,
    active,
    buyNowPrice,
    artworkid
  } = req.body;

  const query = `UPDATE artworks SET artworkName = '${artworkName}', artworkImg = '${artworkImg}', description = '${description}', catagories = '${catagories}', sellerid = '${sellerid}', dateListed = '${dateListed}', timeListed = '${timeListed}', scheduledcloseDate = '${scheduledcloseDate}', active = '${active}', buyNowPrice = '${buyNowPrice}' WHERE artworkid = '${artworkid}'`;

  const updateArtwork = await pool.query(query);
    console.log("Artwork updated successfully!" + updateArtwork[0]);
    res.status(200).json({message:"Artwork updated successfully!"});
}catch (err){
  console.error("Error updating artwork: ", err);
      res.status(500).send("Error updating artwork");
}
  
});

//view all artworks in artworks table
router.get("/artworks", async (req, res) => {
  try{
    const getAllArtworks= await pool.query("SELECT * FROM artworks");
    res.status(200).json(getAllArtworks);
} catch (err){
  console.error("Error querying artworks table: ", err);
  res.status(500).send("Error querying artworks table");
}
});
  
  

//view all of own artwork
router.get("/viewartwork/:sellerid", async (req, res) => {
  try{
    var sellerid = req.params.sellerid;
  var sql = "SELECT * FROM artworks WHERE sellerid = ?"; // use a placeholder for the seller ID

  const findArtwork = await pool.query(sql, [sellerid]);
    // pass the seller ID as a parameter
    if (findArtwork.length > 0) {
      // check if the results array is not empty
      res.status(200).json(findArtwork);
    } else {
      res.status(404).json({message:"No artworks found for this seller"}); // send a 404 status and message if no artworks are found
    }
  
  } catch (err){
    console.error("Error querying artworks table: ", err);
      res.status(500).send("Error querying artworks table");
  }
  
});

//delete artwork
// Define the delete route
router.delete("/deleteartwork/:artworkid", async (req, res) => {
  try {// Get the address parameter from the URL
  var artworkid = req.params.artworkid;

  // Create the SQL query string
  var sql = "DELETE FROM artworks WHERE artworkid = ?";
  // Execute the query
  const deleteUser = await pool.query(sql, artworkid, function (err, result) {
    // Log the number of records deleted
    console.log("Number of records deleted: " + deleteUser.affectedRows);
    // Send a response to the client
    res.status(200).json({message:"Record deleted successfully"});
  });
}catch (err){
  console.error("Error deleting artwork: ", err);
  res.status(500).send("Error deleting artwork");
}
  
});

module.exports = router;
