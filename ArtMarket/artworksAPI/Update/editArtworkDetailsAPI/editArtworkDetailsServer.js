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

app.post('/update', (req, res) => {
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
