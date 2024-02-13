// Import necessary modules
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3')
const path = require('path');



app.set('view engine', 'ejs')
// Assuming your CSS files are in a 'styles' directory
app.use(express.static(path.join(__dirname, 'assets')));


//db config
const db = new sqlite3.Database('./DB/REC-reg.db')

// Define a route

const AuthRoute = require('./router/auth')
app.use('/',AuthRoute)

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/leaderboard', (req, res) => {
  res.render('leaderboard');
});

app.get('/userprofile', (req, res) => {
  res.render('userprofile');
});


app.get('/buyrec', (req, res) => {
  res.render('buyrec');
});

app.get('/salerec', (req, res) => {
  res.render('salerec');
});

app.get('/learning', (req, res) => {
  res.render('learning');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/request', (req, res) => {
  res.render('request');
});

app.get('/register', (req, res) => {
  res.render('register');
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
