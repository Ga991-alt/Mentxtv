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

  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Category'
  // },
  domin: String,
  ratings:{
    type: Number,
    default: 0
  },
  sessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session'  // Make sure you have a Session model
    }
  ],
  reviews: Number,
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
