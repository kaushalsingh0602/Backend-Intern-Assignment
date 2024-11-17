// Import the Mongoose library for MongoDB interaction
const mongoose = require('mongoose');

/**
 * Function to establish a connection to the MongoDB database.
 * Utilizes the Mongoose library for managing database operations.
 */
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB server
        const dbURI = process.env.MONGO_URI;
        await mongoose.connect(dbURI)
            .then(() => console.log('MongoDB connected successfully')) // Log success message if connected
            .catch(err => console.error('MongoDB connection error:', err)); // Log error if initial connection fails
    } catch (error) {
        // Handle unexpected errors during connection attempts
        console.error('Error connecting to MongoDB', error);

        // Exit the process if the database connection is critical to application functionality
        process.exit(1);
    }
};

// Export the connectDB function to allow reuse across the application
module.exports = connectDB;
