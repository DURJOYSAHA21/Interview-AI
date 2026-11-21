const userModel = require('../models/user.model'); // Import the user model from the models directory
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating and verifying JWTs
const blacklistModel = require('../models/blacklist.model'); // Import the blacklist model

// Define the registerUserController function to handle user registration and use aysnc/await for asynchronous operations

/**
 * 
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
async function registerUserController(req, res) { 
    // Implementation for user registration
    const { username, email, password } = req.body; // Destructure the username, email, and password from the request body. Using destructuring allows us to extract multiple properties from an object in a single statement, making the code cleaner and more readable.

    if(!username || !email || !password) { // Check if any of the required fields are missing
        return res.status(400).json({ message: 'Please provide username, email, and password' }); // Return a 400 Bad Request response if any field is missing
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username: username }, // Check if a user with the same username already exists
            { email: email } // Check if a user with the same email already exists
        ]
    })

    if(isUserAlreadyExists) { // If a user with the same username or email exists
        return res.status(400).json({ message: 'Username or email already exists' }); // Return a 400 Bad Request response indicating that the username or email is already taken
    }

    const hash = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt round of 10 for security

    const user = await userModel.create({
        username: username, // Set the username for the new user
        email: email, // Set the email for the new user
        password: hash // Store the hashed password instead of the plain text password for security
    })

    // Create a JWT token for the newly registered user. JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. In this case, we are creating a token that includes the user's ID and username, which can be used for authentication in subsequent requests. The token is signed using a secret key (JWT_SECRET) and has an expiration time of 1 day for security purposes.
    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET, // Use the JWT secret from environment variables to sign the token
        {expiresIn: '1d'} // Set the token to expire in 1 day for security
    )

    res.cookie("token", token) // Set the token as a cookie in the response, which will be sent back to the client in subsequent requests

    
    res.status(201).json({ // Return a 201 Created response with the user details and token
        message: 'User registered successfully', // Message indicating successful registration
        user: {
            id: user._id, // Return the user's ID
            username: user.username, // Return the user's username
            email: user.email // Return the user's email
        } // Return the user's details in the response but not the password for security reasons
    })





    
}

async function loginUserController(req, res) {
    const { email, password } = req.body; // Destructure the email and password from the request body

    const user = await userModel.findOne({ email: email }); // Find a user in the database with the provided email'

    if(!user) { // If no user is found with the provided email
        return res.status(400).json({ message: 'Invalid email or password' }); // Return a 400 Bad Request response indicating invalid credentials
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password stored in the database

    if(!isPasswordValid) { // If the password is not valid
        return res.status(400).json({ message: 'Invalid email or password' }); // Return a 400 Bad Request response indicating invalid credentials
    }

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET, // Use the JWT secret from environment variables to sign the token
        {expiresIn: '1d'} // Set the token to expire in 1 day for security
    )

    res.cookie("token", token) // Set the token as a cookie in the response, which will be sent back to the client in subsequent requests
    res.status(200).json({ // Return a 200 OK response with the user details and token
        message: 'User logged in successfully', // Message indicating successful login
        user: {
            id: user._id, // Return the user's ID
            username: user.username, // Return the user's username
            email: user.email // Return the user's email
        } // Return the user's details in the response but not the password for security reasons

    })





}

async function logoutUserController(req, res) {
    const token = req.cookies.token; // Get the token from the request cookies

    if(!token) { // If no token is found in the cookies
        await blacklistModel.create({ token: token }); // Add the token to the blacklist

    }
        res.clearCookie("token"); // Clear the token cookie from the response
        return res.status(200).json({ message: 'User logged out successfully' }); // Return a 200 OK response indicating successful logout
}

async function verifyUserController(req, res) {
    const user = await userModel.findById(req.user.id); // Find the user in the database using the ID from the decoded token attached to the request object by the authMiddleware

    if(!user) { // If no user is found with the provided ID
        return res.status(404).json({ message: 'User not found' }); // Return a 404 Not Found response indicating that the user does not exist
    }

    res.status(200).json({ // Return a 200 OK response with the user details
        message: 'User verified successfully', // Message indicating successful verification
        user: {
            id: user._id, // Return the user's ID
            username: user.username, // Return the user's username
            email: user.email // Return the user's email
        } // Return the user's details in the response but not the password for security reasons
    })
}



module.exports = { 
    registerUserController, loginUserController, logoutUserController, verifyUserController
 }; // Export the registerUserController, loginUserController, and logoutUserController functions for use in other files


//Destructuring is a convenient way to extract multiple properties from an object or array and assign them to variables in a single statement. In this case, we are extracting the username, email, and password properties from the req.body object, which contains the data sent in the request body. This allows us to easily access these values without having to reference req.body.username, req.body.email, and req.body.password separately.
//JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. In this case, we are creating a token that includes the user's ID and username, which can be used for authentication in subsequent requests. The token is signed using a secret key (JWT_SECRET) and has an expiration time of 1 day for security purposes.