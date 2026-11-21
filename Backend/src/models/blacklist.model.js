const mongoose = require('mongoose'); // Import the mongoose library to interact with MongoDB

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String, // Define the type of the token field as String
        required: true, // Make the token field required
    }
}, {
    timestamps: true
}); //why token then timestamps in different lines? Because the first part is defining the schema fields and their properties, while the second part is providing additional options for the schema. The timestamps option is a schema option that automatically adds createdAt and updatedAt fields to the schema, which will store the timestamps of when a document is created and last updated. It is not a field definition, but rather a configuration for the schema itself.

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistSchema); // Create a Mongoose model named "blacklistTokens" using the defined schema
//blacklistTokens is the name of the collection in the MongoDB database where the blacklisted tokens will be stored. The model provides an interface for interacting with the collection, allowing you to perform CRUD (Create, Read, Update, Delete) operations on the documents in the collection. and the blacklistSchema defines the structure of the documents in the collection, including the fields and their properties. so blacklistSchema is the blueprint for the documents, while tokenBlacklistModel is the interface for interacting with the collection in the database. So both name can be different but it is a good practice to keep them same for better understanding and maintainability of the code.

module.exports = tokenBlacklistModel; // Export the tokenBlacklistModel for use in other files

