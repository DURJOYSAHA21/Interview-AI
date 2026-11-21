const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require('dotenv').config(); // Load environment variables from a .env file
const app = require('./src/app'); // Import the Express application from src/app.js
const connectDB = require('./src/config/database'); // Import the database connection function from src/config/database.js

connectDB(); // Call the database connection function

app.listen(3000, () => {
  console.log('Server is running on port 3000'); // Log a message when the server starts
});