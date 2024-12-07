// Import the necessary modules
const express = require('express'); // Import the Express framework
const bodyParser = require('body-parser'); // Middleware for parsing JSON request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing

// Initialize the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Use body-parser to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Define a simple route for testing
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

// Start the server
const PORT = process.env.PORT || 5000; // Define the port number, defaulting to 5000
app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});