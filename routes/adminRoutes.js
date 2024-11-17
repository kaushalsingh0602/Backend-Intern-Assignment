// Import the Express framework
const express = require('express');

// Import admin controller functions
const { getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');

// Import authentication middleware
const { authMiddleware } = require('../middlewares/authMiddleware');

// Create a new router instance for defining admin-related routes
const router = express.Router();

/**
 * Route: GET /assignments
 * - Middleware: authMiddleware
 * - Controller: getAssignments
 * - Purpose: Fetch all assignments assigned to the logged-in admin.
 */
router.get('/assignments', authMiddleware, getAssignments);

/**
 * Route: POST /assignments/:id/accept
 * - Middleware: authMiddleware
 * - Controller: acceptAssignment
 * - Purpose: Accept a specific assignment by its ID.
 */
router.post('/assignments/:id/accept', authMiddleware, acceptAssignment);

/**
 * Route: POST /assignments/:id/reject
 * - Middleware: authMiddleware
 * - Controller: rejectAssignment
 * - Purpose: Reject a specific assignment by its ID.
 */
router.post('/assignments/:id/reject', authMiddleware, rejectAssignment);

// Export the router for use in the main application
module.exports = router;
