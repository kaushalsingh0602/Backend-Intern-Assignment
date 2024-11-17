// Import the Express framework
const express = require('express');

// Import user controller functions
const { registerUser, loginUser, uploadAssignment } = require('../controllers/userController');

// Import authentication middleware
const { authMiddleware } = require('../middlewares/authMiddleware');

// Create a new router instance for defining user-related routes
const router = express.Router();

/**
 * Route: POST /register
 * - Controller: registerUser
 * - Purpose: Register a new user in the system.
 */
router.post('/register', registerUser);

/**
 * Route: POST /login
 * - Controller: loginUser
 * - Purpose: Authenticate and log in the user to get a JWT token.
 */
router.post('/login', loginUser);

/**
 * Route: POST /upload
 * - Middleware: authMiddleware
 * - Controller: uploadAssignment
 * - Purpose: Allow the logged-in user to upload an assignment.
 * - Authentication is required to ensure the user is logged in.
 */
router.post('/upload', authMiddleware, uploadAssignment);

// Export the router for use in the main application
module.exports = router;
