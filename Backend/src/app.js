const express = require('express'); // Import the Express library
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware for handling cookies

const app = express(); // Create an instance of the Express application

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

const authRouter = require('./routes/auth.routes'); // Import the authentication routes from src/routes/auth.routes.js


app.use('/api/auth', authRouter); // Mount the authentication routes at the /api/auth path



module.exports = app; // Export the Express application for use in other files

