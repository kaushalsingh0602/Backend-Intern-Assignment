// Import the Assignment model to interact with the database
const Assignment = require('../models/Assignment');

/**
 * Controller to fetch assignments assigned to the logged-in admin.
 * - Fetches assignments from the database where the `adminId` matches the logged-in admin's ID.
 * - Populates the `userId` field to include the username of the user who submitted the assignment.
 * - Sorts assignments by creation date in descending order.
 */
const getAssignments = async (req, res) => {
    try {
        const { id } = req.user; // Extract the admin's ID from the authenticated user
        const assignments = await Assignment.find({ adminId: id })
            .populate('userId', 'username') // Populate the `userId` field with the user's username
            .sort({ createdAt: -1 }); // Sort assignments by creation date (latest first)

        res.status(200).json(assignments); // Respond with the fetched assignments
    } catch (error) {
        res.status(500).json({ error: 'Error fetching assignments' }); // Handle server errors
    }
};

/**
 * Controller to accept an assignment.
 * - Updates the status of the specified assignment to "accepted".
 * @param {string} req.params.id - The ID of the assignment to accept.
 */
const acceptAssignment = async (req, res) => {
    try {
        const { id } = req.params; // Extract the assignment ID from the request parameters
        await Assignment.findByIdAndUpdate(id, { status: 'accepted' }); // Update the status to "accepted"

        res.status(200).json({ message: 'Assignment accepted' }); // Respond with a success message
    } catch (error) {
        res.status(500).json({ error: 'Error accepting assignment' }); // Handle server errors
    }
};

/**
 * Controller to reject an assignment.
 * - Updates the status of the specified assignment to "rejected".
 * @param {string} req.params.id - The ID of the assignment to reject.
 */
const rejectAssignment = async (req, res) => {
    try {
        const { id } = req.params; // Extract the assignment ID from the request parameters
        await Assignment.findByIdAndUpdate(id, { status: 'rejected' }); // Update the status to "rejected"

        res.status(200).json({ message: 'Assignment rejected' }); // Respond with a success message
    } catch (error) {
        res.status(500).json({ error: 'Error rejecting assignment' }); // Handle server errors
    }
};

// Export the controllers for use in routes
module.exports = { getAssignments, acceptAssignment, rejectAssignment };
