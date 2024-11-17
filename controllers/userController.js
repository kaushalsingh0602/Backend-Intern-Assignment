// Import necessary modules and models
const User = require('../models/User'); // User model for interacting with the users collection
const Assignment = require('../models/Assignment'); // Assignment model for interacting with assignments collection
const jwt = require('jsonwebtoken'); // JSON Web Token for authentication and session management

/**
 * Controller to register a new user.
 * - Validates input fields (username, password, role).
 * - Creates and saves a new user in the database.
 */
const registerUser = async (req, res) => {
    try {
        const { username, password, role } = req.body; // Extract user details from the request body
        if (!username || !password || !role) {
            return res.status(400).json({ error: 'All fields are required' }); // Validate required fields
        }

        const user = new User({ username, password, role }); // Create a new User instance
        await user.save(); // Save the user in the database
        res.status(201).json({ message: 'User registered successfully' }); // Respond with success message
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' }); // Handle server errors
    }
};

/**
 * Controller to log in a user.
 * - Verifies username and password.
 * - Generates a JWT for authenticated sessions.
 */
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body; // Extract login details from the request body
        const user = await User.findOne({ username }); // Find user by username
        if (!user) return res.status(404).json({ error: 'User not found' }); // Validate user existence

        const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' }); // Validate password match

        // Generate JWT with user ID and role, valid for 1 day
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ token }); // Respond with the generated token
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' }); // Handle server errors
    }
};

/**
 * Controller to upload an assignment.
 * - Associates the assignment with the logged-in user and the specified admin.
 */
const uploadAssignment = async (req, res) => {
    try {
        const { task, admin } = req.body; // Extract assignment details from the request body
        const { id } = req.user; // Get the user ID from the authenticated user

        // Find the specified admin in the database
        const adminUser = await User.findOne({ username: admin, role: 'admin' });
        if (!adminUser) return res.status(404).json({ error: 'Admin not found' }); // Validate admin existence

        // Create a new assignment instance
        const assignment = new Assignment({ userId: id, task, adminId: adminUser._id });
        await assignment.save(); // Save the assignment in the database
        res.status(201).json({ message: 'Assignment uploaded successfully' }); // Respond with success message
    } catch (error) {
        res.status(500).json({ error: 'Error uploading assignment' }); // Handle server errors
    }
};

/**
 * Controller to fetch all admins.
 * - Returns a list of admins with their usernames.
 */
const getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: 'admin' }, 'username'); // Query all users with the 'admin' role
        res.status(200).json({ success: true, admins }); // Respond with the list of admins
    } catch (error) {
        res.status(500).json({ error: 'Error fetching admins' }); // Handle server errors
    }
};

// Export the controllers for use in routing
module.exports = { registerUser, loginUser, uploadAssignment, getAllAdmins };
