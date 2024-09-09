// Import dependencies
const express = require('express');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the Express app
const webApp = express();

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware for parsing request bodies and logging requests
webApp.use(express.urlencoded({ extended: true }));
webApp.use(express.json());
webApp.use((req, res, next) => {
  console.log(`Path: ${req.path} | Method: ${req.method}`);
  next();
});

// Import routes from external files
const homeRoute = require('./routes/homeRoute');
const fbWebhookRoute = require('./routes/fbWebhookRoute');

// Use the routes in the Express app
webApp.use('/', homeRoute.router); // Home route
webApp.use('/facebook', fbWebhookRoute.router); // Facebook webhook route

// Start the server
webApp.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}`);
});
