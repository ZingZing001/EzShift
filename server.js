require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const express = require("express");
const db = require("better-sqlite3")("user.db");
db.pragma("journal_mode = WAL");
const app = express();

// database setup
const createTable = db.transaction(() => {
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username STRING NOT NULL UNIQUE, 
    password STRING NOT NULL
    )
    `
  ).run();
});

createTable();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

app.use((req, res, next) => {
  res.locals.errors = [];

  // try to decode incoming cookie token
  try{
    const decoded = jwt.verify(req.cookies.session, process.env.JWT_SECRET);
    req.user = decoded;

    // Fetch user from database to ensure the username is updated
    const lookupStatement = db.prepare("SELECT * FROM users WHERE id = ?");
    const user = lookupStatement.get(decoded.userid);

    if (user) {
      req.user = user;  // Overwrite req.user with the actual database user
    }

  }catch(err){
    req.user = false;
  }

  res.locals.user = req.user;
  console.log(req.user);

  next();
});



app.get("/", (req, res) => {
  res.render("register");
});

app.get("/", (req, res) => {
  if (req.user) {
    return res.render("home", { user: req.user });
  }
  res.render("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.redirect("/login");
});

app.post("/register", (req, res) => {
  const errors = [];

  if (typeof req.body.username !== "string") req.body.username = "";
  if (typeof req.body.password !== "string") req.body.password = "";

  req.body.username = req.body.username.trim();
  if (!req.body.username) errors.push("Username is required");
  if (req.body.username && req.body.username.length < 3)
    errors.push("Username must be at least 3 characters long");
  if (req.body.username && req.body.username.length > 20)
    errors.push("Username must be at most 20 characters long");
  if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/))
    errors.push("Username can only contain letters and numbers");

  if (typeof req.body.username !== "string") req.body.username = "";
  if (typeof req.body.password !== "string") req.body.password = "";

  req.body.password = req.body.password.trim();
  if (!req.body.password) errors.push("Password is required");
  if (req.body.password && req.body.password.length < 3)
    errors.push("Password must be at least 3 characters long");
  if (req.body.password && req.body.password.length > 20)
    errors.push("Password must be at most 20 characters long");
  if (req.body.password && !req.body.password.match(/^[a-zA-Z0-9]+$/))
    errors.push("Password can only contain letters and numbers");

  if (errors.length) {
    return res.render("register", { errors });
  }

  // save the user to the database
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);

  const ourStatement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
  const result = ourStatement.run(req.body.username, req.body.password);

  const lookupStatement = db.prepare("SELECT * FROM users WHERE ROWID = ?");
  const user = lookupStatement.get(result.lastInsertRowid);

  // log the user in and assign them with a cookie
  const token = jwt.sign({ 
    exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 ,
    userid: user.id, 
    username: user.username 
  }, 
  process.env.JWT_SECRET);

  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.render("home", { user });
});

app.listen(3000);
