const Booking = require("../models/Booking");

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("sessionId studentId")
      .sort({ bookingDate: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("sessionId studentId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch booking", error });
  }
};

// Get bookings by student
exports.getBookingsByStudent = async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.params.studentId }).populate("sessionId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student bookings", error });
  }
};

// Get bookings by session
exports.getBookingsBySession = async (req, res) => {
  try {
    const bookings = await Booking.find({ sessionId: req.params.sessionId }).populate("studentId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch session bookings", error });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create booking", error });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.paymentStatus },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update payment status", error });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete booking", error });
  }
};
