// Payment.js

const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  amount: Number,

  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    required: true
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },

  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true
  },

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);

