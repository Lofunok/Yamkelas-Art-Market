var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");


const passport = require('passport');
const routes = require('./routes');
var userRouter = require("./routes/User/user");
var transactionsRouter = require("./routes/Transactions/transactions");
var artworkrouter = require("./routes/Artworks/artworks");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);
app.use("/artworks", artworkrouter);

//Passport configuration
require('./auth');
app.post('/login', routes.users.users.login);

//jwt access
app.get('/profile/:id', route.users.users.detail);


module.exports = app;
