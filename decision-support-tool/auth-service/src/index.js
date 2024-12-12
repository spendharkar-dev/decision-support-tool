// Import the necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});