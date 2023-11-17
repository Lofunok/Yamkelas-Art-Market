var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var userRouter = require("./routes/User/user");
var transactionsRouter = require("./routes/Transactions/transactions");
var artworkrouter = require("./routes/Artworks/artworks");

//middleware
var app = express();
app.use(cors());

//Routes
app.get ('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'))
})

app.get ('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'))
})

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
