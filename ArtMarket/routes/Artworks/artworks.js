var express = require("express");
var multer = require('multer');
var router = express.Router();
const path = require('path');

//Creating connection
var mysql = require("mysql2");
var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Khumalo1959",
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
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL");
});

//create new artwork for bidding
router.post('/create', images.array("artworkImage"),(req, res) => {

  const { artworkName, description, catagories, sellerid, dateListed, timeListed, scheduledcloseDate, active, buyNowPrice } = req.body;

  const artworkImg = req.files[0].filename;

  const query = `INSERT INTO artworks (artworkName, artworkImg, description, catagories, sellerid,dateListed,timeListed,scheduledcloseDate,active,buyNowPrice) VALUES ('${artworkName}', '${artworkImg}', '${description}', '${catagories}', '${sellerid}', '${dateListed}', '${timeListed}', '${scheduledcloseDate}', '${active}', '${buyNowPrice}')`;

  con.query(query, (err, result) => {
    if (err) {
      console.error('Error creating artwork: ', err);
      res.status(500).send('Error creating artwork');
      return;
    }

    console.log('Artwork created successfully!');
    res.send('Artwork created successfully!');
  });
});

//edit details of existing artwork
router.post('/update', (req, res) => {
  const { artworkid, artworkName, artworkImg, description, catagories, sellerid, dateListed, timeListed, scheduledcloseDate, active, buyNowPrice } = req.body;

  const query = `UPDATE artworks SET artworkName = '${artworkName}', artworkImg = '${artworkImg}', description = '${description}', catagories = '${catagories}', sellerid = '${sellerid}', dateListed = '${dateListed}', timeListed = '${timeListed}', scheduledcloseDate = '${scheduledcloseDate}', active = '${active}', buyNowPrice = '${buyNowPrice}' WHERE artworkid = '${artworkid}'`;

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error updating artwork: ', err);
      res.status(500).send('Error updating artwork');
      return;
    }

    console.log('Artwork updated successfully!');
    res.send('Artwork updated successfully!');
  });
});

//view all artworks in artworks table
router.get('/artworks', (req, res) => {
  connection.query('SELECT * FROM artworks', (err, results) => {
    if (err) {
      console.error('Error querying artworks table: ', err);
      res.status(500).send('Error querying artworks table');
      return;
    }
    res.json(results);
  });
});

//view all of own artwork
router.get('/artworks/:sellerid', (req, res) => {

  var sellerid = req.params.sellerid;
  var sql = "SELECT * FROM artworks WHERE sellerid = ?"; // use a placeholder for the seller ID

  connection.query(sql, [sellerid], (err, results) => { // pass the seller ID as a parameter
      if (err) {
          console.error('Error querying artworks table: ', err);
          res.status(500).send('Error querying artworks table');
          return;
      }
      if (results.length > 0) { // check if the results array is not empty
          res.json(results);
      } else {
          res.status(404).send('No artworks found for this seller'); // send a 404 status and message if no artworks are found
      }
  });
});

//delete artwork
// Define the delete route
router.delete('/artwork/:sellerid', function(req, res) {
  // Get the address parameter from the URL
  var sellerid = req.params.sellerid;

  // Create the SQL query string
  var sql = "DELETE FROM artworks WHERE sellerid = " + sellerid;
  // Execute the query
  connection.query(sql, function(err, result) {
    if (err) throw err;
    // Log the number of records deleted
    console.log("Number of records deleted: " + result.affectedRows);
    // Send a response to the client
    res.send("Record deleted successfully");
  });
});

module.exports = router;