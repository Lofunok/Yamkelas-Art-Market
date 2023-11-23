var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors =  require('cors');

var userRouter = require("./routes/User/user");
var transactionsRouter = require("./routes/Transactions/transactions");
var artworkrouter = require("./routes/Artworks/artworks");

var app = express();
app.use(cors());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("login");
})

app.get('/register', (req, res) => {
  res.render("register");
})

app.get('/home', (req, res) => {
  res.render("MyArtworks");
})

app.get('/men', (req, res) => {
  res.render("men");
})


app.post('/register', (req, res) => {
  res.render("login");
})

app.post('/login', (req, res) => {
  res.render("home");
})

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);
app.use("/artworks", artworkrouter);

app.listen(5000, () => {
  console.log("server is listening");
});

module.exports = app;
