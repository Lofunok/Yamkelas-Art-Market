var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var userRouter = require("./routes/User/user");
var transactionsRouter = require("./routes/Transactions/transactions");
var artworkrouter = require("./routers/Artworks/artworks");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);
app.use("/artworks", artworkrouter);

//Passport configuration
require('./auth');
app.post('/login', routes.users.users.login);

//anonymous access
app.get('/hello', function(req, res, next){
  var welcome = {
    'title': 'greeting',
    'message': 'hello node.js'
  }
  res.json(welcome);
});

//jwt access
app.get('/profile/:id', route.users.users.detail);


module.exports = app;
