const mongoose = require('mongoose'); // Import the Mongoose library for MongoDB interaction


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connect to the MongoDB database using the URI from environment variables

        console.log('Connected to MongoDB'); // Log a message when the connection is successful
    } 
    catch (error) {
        console.error('Error connecting to MongoDB:', error); // Log an error message if the connection fails
    }
}

module.exports = connectDB; // Export the connectDB function for use in other files