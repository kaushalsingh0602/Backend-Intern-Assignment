// Load environment variables from the .env file
require('dotenv').config();

// Import necessary modules
const express = require('express'); // Express framework for routing and handling HTTP requests
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const connectDB = require('./config/db'); // Import the database connection function
const userRoutes = require('./routes/userRoutes'); // Import user routes for handling user-related requests
const adminRoutes = require('./routes/adminRoutes'); // Import admin routes for handling admin-related requests

// Create an instance of the Express application
const app = express();

// Connect to MongoDB database using the connectDB function
connectDB();

// Middleware setup
app.use(bodyParser.json()); // Use body-parser to parse incoming JSON requests

// Define routes for handling user and admin related requests
app.use('/api/users', userRoutes); // User routes under /api/users
app.use('/api/admins', adminRoutes); // Admin routes under /api/admins

// Set the port the server will listen on
const PORT = process.env.PORT || 5000;

// Start the Express server and log a message once it’s running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
