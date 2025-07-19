// Booking.js

const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  bookingDate: {
    type: Date,
    default: Date.now
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Booking', BookingSchema);
