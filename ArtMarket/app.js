var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/Users/index");
var usersRouter = require("./routes/Users/users");
var userRouter = require("./routes/User/user");
var transactionsRouter = require("./routes/Transactions/transactions");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);

app.listen(5000, () => {
  console.log("server is listening");
});

module.exports = app;
