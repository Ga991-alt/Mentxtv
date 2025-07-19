// // index.js

// // Load environment variables from .env file
// require('dotenv').config();

// // Import the DB connection function
// const connectDB = require('./config/db');

// (async () => {
//   // Connect to MongoDB and wait for connection
//   await connectDB();

//   // Import all models after DB connection
//   require('./models/User');
//   require('./models/Mentor');
//   require('./models/Session');
//   require('./models/Booking');
//   require('./models/Payment');
//   require('./models/Category');
//   require('./models/Review');
//   require('./models/Notification');
//   require('./models/AdminLog');

//   // Dummy message to confirm script is running
//   console.log('📦 Schema files loaded. Connection successful.');

//   // Optional: Keep process alive for 2 seconds then exit
//   setTimeout(() => {
//     console.log('🛑 Exiting test script.');
//     process.exit(0);
//   }, 2000);
// })();


require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Import route files
const userRoutes = require('./routes/UserRouter');
const mentorRoutes = require('./routes/mentorRoutes.js');
const sessionRoutes = require('./routes/sessionRoutes');
const bookingRoutes = require('./routes/bookingRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');
const adminLogRoutes = require('./routes/adminLogRoutes');
const aboutUsRoutes = require('./routes/aboutUsRoutes');
const Privacypolicyroutes = require('./routes/PrivacyPolicyRoutes.js');
const Termsrouters = require('./routes/TermsRouters.js');
const Social = require('./routes/SocialRouters.js');
// import  from "";

const app = express();

(async () => {
  // Connect to DB
  await connectDB();

  // Middleware
  app.use(cors());
  app.use(express.json()); // for parsing application/json

  // Routes
  app.use('/api/users', userRoutes);
  app.use('/api/mentors', mentorRoutes);
  app.use('/api/sessions', sessionRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/payments', paymentRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/reviews', reviewRoutes);
  // app.use('/api/notifications', notificationRoutes);
  app.use('/api/adminlogs', adminLogRoutes);
  const studentRoutes = require('./routes/studentRoutes.js');
app.use('/api/students', studentRoutes);
app.use("/api/about-us", aboutUsRoutes);
app.use("/api/privacy-policy", Privacypolicyroutes);
app.use("/api/Terms", Termsrouters);
app.use("/api/social", Social);


  // Basic test endpoint
  app.get('/', (req, res) => {
    res.send('API Server is running...');
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();

