var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const flash = require("connect-flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const app = express();

const session = require("express-session");
const passport = require("passport");
//passport config
require("./config/passport")(passport);

//MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(bodyParser.urlencoded({ extended: true }));
//parsing JSON
app.use(express.json());
app.use(cookieParser());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
//session for login
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());

// Flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.messages = req.flash();
  next();
});
//routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/workouts", require("./routes/workouts"));
app.use("/meals", require("./routes/meals"));
app.use("/mood", require("./routes/mood"));
app.use("/api", require("./routes/api"));
app.use("/notifications", require("./routes/notifications"));





//error handling
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
