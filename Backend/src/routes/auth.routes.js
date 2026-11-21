const {Router} = require('express'); // Import the Router class from the Express library by destructuring means we are importing only the Router class
const authController = require('../controllers/auth.controller'); // Import the authentication controller from src/controllers/auth.controller.js
const authMiddleware = require('../middlewares/auth.middleware'); // Import the authentication middleware from src/middlewares/auth.middleware.js   



const authRouter = Router(); // Create a new instance of the Router class for handling authentication routes

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
authRouter.post('/register', authController.registerUserController); // Define the POST route for user registration

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post('/login', authController.loginUserController); // Define the POST route for user login

/**
 * @route GET /api/auth/logout
 * @desc Logout a user
 * @access Public
 */

authRouter.get('/logout', authController.logoutUserController); // Define the GET route for user logout

/**
 * @route GET/api/auth/verify
 * @desc Get the current logged in user
 * @access Private (only authenticated users can access this route)
 */
authRouter.get('/verify', authMiddleware, authController.verifyUserController); // Define the GET route for verifying the current logged in user

module.exports = authRouter;
