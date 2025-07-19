// Session.js

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const SessionSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: false
  },

  title: String,
  subject: String,
  date: Date,
  time: String,
  link: String,
  description: String,
  duration: String,
  type: { type: String, enum: ["group", "onetoone"], default: "group" },
  price: Number,
  mentorName: String,
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled','live'],
    default: 'upcoming'
  },

  seats: {
    type: Number,
    default: 15
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  feedbacks: [feedbackSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  },
  bookedStudents: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
],
  AttendedStudents: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }
],
});

module.exports = mongoose.model('Session', SessionSchema);
