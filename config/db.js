// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    console.log('🔌 Attempting MongoDB connection...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
