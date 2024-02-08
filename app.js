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

app.get('/reg', (req, res) => {
  res.render('reg');
});

app.get('/reg1', (req, res) => {
  res.render('reg1');
});

app.get('/reg2', (req, res) => {
  res.render('reg2');
});


app.get('/leaderboard', (req, res) => {
  res.render('leaderboard');
});

app.get('/userprofile', (req, res) => {
  res.render('userprofile');
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


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
