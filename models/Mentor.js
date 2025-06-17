// Mentor.js

const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  bio: String,

  subjects: [String],

  education: String,

  expertise: [String],

  profilePic: String,

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
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

module.exports = mongoose.model('Mentor', MentorSchema);
