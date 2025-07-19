const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  interests: [String],

  enrolledSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'
    }
  ],

  attendedSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'
    }
  ],

  profilePic: String,

  educationLevel: String,

  goal: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  // 💳 Payment details
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment'
    }
  ],

  totalSpent: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema);
