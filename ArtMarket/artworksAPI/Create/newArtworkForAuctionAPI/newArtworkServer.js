const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password1',
  database: 'art_market_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }

  console.log('Connected to database!');
});

app.post('/create', (req, res) => {
  const { artworkName, artworkImg, description, catagories, sellerid, dateListed, timeListed, scheduledcloseDate, active, buyNowPrice } = req.body;

  const query = `INSERT INTO artworks (artworkName, artworkImg, description, catagories, sellerid,dateListed,timeListed,scheduledcloseDate,active,buyNowPrice) VALUES ('${artworkName}', '${artworkImg}', '${description}', '${catagories}', '${sellerid}', '${dateListed}', '${timeListed}', '${scheduledcloseDate}', '${active}', '${buyNowPrice}')`;

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error creating artwork: ', err);
      res.status(500).send('Error creating artwork');
      return;
    }

    console.log('Artwork created successfully!');
    res.send('Artwork created successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
