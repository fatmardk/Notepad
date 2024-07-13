const express = require('express');
const dotenv = require('dotenv');
const baglan = require('./config/db');
const colors = require('colors');
const bodyParser = require('body-parser');
const cors = require('cors');

// Environment variables configuration
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/notlar', require('./routes/notRoute'));

// Database connection
baglan();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.magenta.italic);
});
