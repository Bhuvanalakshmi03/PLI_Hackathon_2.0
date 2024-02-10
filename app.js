// Import necessary modules
const express = require('express');
const app = express();
const path = require('path');



app.set('view engine', 'ejs')
// Assuming your CSS files are in a 'styles' directory
app.use(express.static(path.join(__dirname, 'assets')));

// Define a route

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/leaderboard', (req, res) => {
  res.render('leaderboard');
});

app.get('/userprofile', (req, res) => {
  res.render('userprofile');
});

app.get('/powerplant', (req, res) => {
  res.render('powerplant');
});

app.get('/trade', (req, res) => {
  res.render('trade');
});

app.get('/learning', (req, res) => {
  res.render('learning');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/request', (req, res) => {
  res.render('request');
});



// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
