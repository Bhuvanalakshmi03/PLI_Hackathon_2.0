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

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
