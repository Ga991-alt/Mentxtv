const Payment = require("../models/Payment");


// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("sessionId").populate({
        path: 'studentId',
        populate: {
          path: 'userId',
          select: 'name email'}})
      .sort({ timestamp: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments", error });
  }
};

// Get payments by student
exports.getPaymentsByStudent = async (req, res) => {
  try {
    const payments = await Payment.find({ studentId: req.params.studentId }).populate("sessionId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student payments", error });
  }
};

// Get payments by session
exports.getPaymentsBySession = async (req, res) => {
  try {
    const payments = await Payment.find({ sessionId: req.params.sessionId }).populate("studentId");
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch session payments", error });
  }
};

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: "Failed to create payment", error });
  }
};

// Update payment status (e.g., after payment gateway confirms)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update payment", error });
  }
};

// Delete a payment (rarely used)
exports.deletePayment = async (req, res) => {
  try {
    const deleted = await Payment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error });
  }
};
