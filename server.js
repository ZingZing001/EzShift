const express = require('express');
const app = express();



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.render('register');
});

app.get("/login", (req, res) => {
  res.render('login');
});

app.post("/register", (req, res) => {
    console.log(req.body);
    res.send("Account created successfully");
});


app.listen(3000);
