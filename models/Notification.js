// Notification.js

const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },

  type: {
    type: String,
    enum: ['hook', 'blast', 'ping'],
    required: true
  },

  message: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
