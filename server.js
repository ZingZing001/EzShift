const express = require('express');
const app = express();



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.use((req, res, next) => {
    res.locals.errors = []
    next()
});


app.get('/', (req, res) => {
  res.render('register');
});

app.get("/login", (req, res) => {
  res.render('login');
});

app.post("/register", (req, res) => {
    const errors = []

    if (typeof req.body.username !== "string") req.body.username = ""
    if (typeof req.body.password !== "string") req.body.password = ""

    req.body.username = req.body.username.trim()
    if (!req.body.username) errors.push("Username is required")
    if (req.body.username && req.body.username.length < 3) errors.push("Username must be at least 3 characters long")
    if (req.body.username && req.body.username.length > 20) errors.push("Username must be at most 20 characters long")
    if (req.body.username && !req.body.username.match(/^[a-zA-Z0-9]+$/)) errors.push("Username can only contain letters and numbers")

    if (typeof req.body.username !== "string") req.body.username = ""
    if (typeof req.body.password !== "string") req.body.password = ""

    req.body.password = req.body.password.trim()
    if (!req.body.password) errors.push("Password is required")
    if (req.body.password && req.body.password.length < 3) errors.push("Password must be at least 3 characters long")
    if (req.body.password && req.body.password.length > 20) errors.push("Password must be at most 20 characters long")
    if (req.body.password && !req.body.password.match(/^[a-zA-Z0-9]+$/)) errors.push("Password can only contain letters and numbers")

    if (errors.length) {
        return res.render("register", { errors })
    }

    
});



app.listen(3000);
