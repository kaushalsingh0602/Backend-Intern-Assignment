// Import the JSON Web Token library for token verification
const jwt = require('jsonwebtoken');

/**
 * Authentication Middleware
 * - Verifies the presence and validity of a JWT in the request header.
 * - Adds the decoded user data to the request object for downstream usage.
 */
const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' }); // Respond with 401 if token is absent
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Handle invalid or expired token
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Export the middleware for use in protected routes
module.exports = { authMiddleware };
