const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating and verifying JWTs
const blacklistModel = require('../models/blacklist.model'); // Import the blacklist model from the models directory 

function authMiddleware(req, res, next) { // Define the authMiddleware function to handle authentication
    const token = req.cookies.token; // Retrieve the token from the request cookies

    if(!token) { // If the token is not present in the cookies
        return res.status(401).json({ message: 'Unauthorized' }); // Return a 401 Unauthorized response if the token is missing
    }

    const isTokenBlacklisted = blacklistModel.findOne({ token: token }); // Check if the token is blacklisted by querying the blacklist model
    if(isTokenBlacklisted) { // If the token is found in the blacklist
        return res.status(401).json({ message: 'Unauthorized' }); // Return a 401 Unauthorized response if the token is blacklisted
    }

    // so basically we are checking if the token is present in the cookies and if it is blacklisted or not. If it is not present or blacklisted then we are returning 401 Unauthorized response. If it is present and not blacklisted then we are verifying the token using jwt.verify() method. If the token is valid then we are attaching the decoded user information to the request object and calling the next middleware function in the chain. If the token is invalid or expired then we are returning 401 Unauthorized response. after in the chain we are calling the next middleware function for the route handler to execute. This way we are ensuring that only authenticated users can access the protected routes.

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the JWT secret from environment variables. If the token is valid, it will return the decoded payload (user information). If the token is invalid or expired, it will throw an error.
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Call the next middleware function in the chain
    }
    catch (error) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return a 401 Unauthorized response if the token is invalid or expired
    }
}

module.exports = authMiddleware; // Export the authMiddleware function for use in other files


  