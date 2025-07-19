const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController.js");

// GET all bookings
router.get("/", bookingController.getAllBookings);

// GET booking by ID
router.get("/:id", bookingController.getBookingById);

// GET bookings by studentId
router.get("/student/:studentId", bookingController.getBookingsByStudent);

// GET bookings by sessionId
router.get("/session/:sessionId", bookingController.getBookingsBySession);

// POST create a new booking
router.post("/", bookingController.createBooking);

// PUT update payment status
router.put("/:id/payment", bookingController.updatePaymentStatus);

// DELETE a booking
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
