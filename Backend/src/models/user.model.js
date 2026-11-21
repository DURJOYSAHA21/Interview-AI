const mongoose = require('mongoose'); // Import the Mongoose library for MongoDB interaction


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: [true, 'Username already exists']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists']
    },
    password: {
        type: String,
        required:  true
    }
})

const User = mongoose.model('User', userSchema); // Create a Mongoose model named 'User' using the defined schema

module.exports = User; // Export the User model for use in other files