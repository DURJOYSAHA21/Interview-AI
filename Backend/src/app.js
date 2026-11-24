const express = require('express'); // Import the Express library
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware for handling cookies
const cors = require('cors'); // Import the CORS middleware for handling cross-origin requests

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors(
    {
        origin: 'http://localhost:5174', // Allow requests from the frontend application running on http://localhost:5174
        credentials: true // Allow cookies to be sent with requests    
    }
)); // Middleware to enable CORS

const authRouter = require('./routes/auth.routes'); // Import the authentication routes from src/routes/auth.routes.js


app.use('/api/auth', authRouter); // Mount the authentication routes at the /api/auth path



module.exports = app; // Export the Express application for use in other files

