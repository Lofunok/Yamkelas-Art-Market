// Import the modules
var express = require('express');
var mysql = require('mysql');

// Create the app object
var app = express();

// Create the connection object
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password1",
  database: "art_market_db"
});

// Connect to the database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the database");
});

// Define the delete route
app.delete('/artwork/:sellerid', function(req, res) {
  // Get the address parameter from the URL
  var sellerid = req.params.sellerid;

  // Create the SQL query string
  var sql = "DELETE FROM artworks WHERE sellerid = " + sellerid;
  // Execute the query
  con.query(sql, function(err, result) {
    if (err) throw err;
    // Log the number of records deleted
    console.log("Number of records deleted: " + result.affectedRows);
    // Send a response to the client
    res.send("Record deleted successfully");
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("Server running on port 3000");
});
