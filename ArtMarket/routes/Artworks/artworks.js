var express = require("express");
var router = express.Router();
require('dotenv').config();
const pool = require("../../db/db");
var multer = require('multer');
const path = require('path');

//create new artwork for bidding
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const destinationPath = path.join(__dirname,'..','..', 'upload_images');
    callback(null, destinationPath);
  },
  filename: function(req, file, callback){
    callback(null, file.originalname);
  }
})

const images = multer({storage: storage});


router.post("/createartwork",images.array("artworkImage") ,async (req, res) => {
  try{
    const {
    artworkName,
    description,
    catagories,
    sellerid,
    dateListed,
    timeListed,
    scheduledcloseDate,
    active,
    buyNowPrice
  } = req.body;

  const artworkImg = req.files[0].filename;

  const createArtwork = await pool.query("INSERT INTO artworks (artworkName, artworkImg, description, catagories, sellerid,dateListed,timeListed,scheduledcloseDate,active,buyNowPrice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", 
  [artworkName,
    artworkImg,
    description,
    catagories,
    sellerid,
    dateListed,
    timeListed,
    scheduledcloseDate,
    active,
    buyNowPrice]);
    console.log("Result" + createArtwork.rows[0]);
    res.status(200).json(createArtwork.rows[0]);
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
    scheduledcloseDate,
    buyNowPrice,
    artworkid
  } = req.body;


  const updateArtwork = await pool.query(`UPDATE artworks SET artworkName = ($1) , artworkImg = ($2), description = ($3), catagories = ($4), scheduledcloseDate = ($5), buyNowPrice = ($6) WHERE artworkid = ($7)`, [
    artworkName,
    artworkImg,
    description,
    catagories,
    scheduledcloseDate,
    buyNowPrice,
    artworkid]);

    console.log("Updated successfully");
    res.status(200).json({message: "Updated successfully"});
}catch (err){
  console.error("Error updating artwork: ", err);
    res.status(500).json({error: "Error updating artwork"});
}
  
});

//view all artworks in artworks table
router.get("/viewartwork/:sellerid", async (req, res) => {
  try {
    const sellerid = req.params.sellerid;

    const findArtwork = await pool.query("SELECT * FROM artworks WHERE sellerid = $1", [sellerid]);

    if (findArtwork.rowCount > 0) {
      const artworksWithImages = findArtwork.rows.map(artwork => {
        const imageURL = `../upload_images/${artwork.artworkimg}`;
        return {
          id: artwork.sellerid,
          name: artwork.artworkname,
          status: artwork.closedate,
          images: [imageURL],
        };
      });
      res.status(200).json(artworksWithImages);
    } else {
      res.status(404).json({ message: "No artwork found for the specified sellerid" });
    }
  } catch (err) {
    console.error("Error querying artworks table: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




//delete artwork
// Define the delete route
router.delete("/deleteartwork/:artworkid", async (req, res) => {
  try {// Get the address parameter from the URL
  var artworkid = [req.params.artworkid];

  const deleteUser = await pool.query("DELETE FROM artworks WHERE artworkid = ($1)", artworkid);
  console.log("Artwork deleted successfully");
  res.status(200).json({message: "Artwork deleted successfully"}); 
}catch (err){
  console.error("Error deleting artwork: ", err);
  res.status(500).send("Error deleting artwork");
}
  
});

router.get("/artworks", async (req, res) => {
  try {
    const getArtworks = await pool.query("select * from artworks");
    if (getArtworks.rowCount > 0) {
      const artworksWithImages = getArtworks.rows.map(artwork => {
        const imageURL = `../upload_images/${artwork.artworkimg}`;
        return {
          id: artwork.sellerid,
          name: artwork.artworkname,
          status: artwork.closedate,
          images: [imageURL],
        };
      });
      res.status(200).json(artworksWithImages);
    } else {
      res.status(404).json({ message: "No artworks found" });
    }
  } catch (err) {
    console.error("Error querying artworks table: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
