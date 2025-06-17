// index.js

// Load environment variables from .env file
require('dotenv').config();

// Import the DB connection function
const connectDB = require('./config/db');

(async () => {
  // Connect to MongoDB and wait for connection
  await connectDB();

  // Import all models after DB connection
  require('./models/User');
  require('./models/Mentor');
  require('./models/Session');
  require('./models/Booking');
  require('./models/Payment');
  require('./models/Category');
  require('./models/Review');
  require('./models/Notification');
  require('./models/AdminLog');

  // Dummy message to confirm script is running
  console.log('📦 Schema files loaded. Connection successful.');

  // Optional: Keep process alive for 2 seconds then exit
  setTimeout(() => {
    console.log('🛑 Exiting test script.');
    process.exit(0);
  }, 2000);
})();
