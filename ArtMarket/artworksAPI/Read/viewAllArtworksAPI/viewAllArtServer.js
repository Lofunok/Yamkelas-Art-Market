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

app.get('/artworks', (req, res) => {
  connection.query('SELECT * FROM artworks', (err, results) => {
    if (err) {
      console.error('Error querying artworks table: ', err);
      res.status(500).send('Error querying artworks table');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`View all art app listening at http://localhost:${port}`);
});
