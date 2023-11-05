const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password1',
    database: 'art_market_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

app.get('/artworks/:sellerid', (req, res) => {

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

app.listen(port, () => {
    console.log(`View all art app listening at http://localhost:${port}`);
});
