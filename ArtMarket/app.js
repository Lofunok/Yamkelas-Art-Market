var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require('body-parser');

// Additional middleware for CORS
var cors = require('cors');


const passport = require('passport');
const routes = require('./routes');
var userRouter = require("./routes/User/user");
var transactionsRouter = require("./routes/Transactions/transactions");
var artworkrouter = require("./routes/Artworks/artworks");

var app = express();

// Enable CORS for all routes
app.use(cors());




// Other middleware
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);
app.use("/artworks", artworkrouter);

app.listen(5000, () => {
  console.log("server is listening");
});

module.exports = app;
