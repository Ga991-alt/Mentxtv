const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController.js");

// GET all payments
router.get("/", paymentController.getAllPayments);

// GET payments by studentId
router.get("/student/:studentId", paymentController.getPaymentsByStudent);

// GET payments by sessionId
router.get("/session/:sessionId", paymentController.getPaymentsBySession);

// POST create a new payment
router.post("/", paymentController.createPayment);

// PUT update payment status
router.put("/:id/status", paymentController.updatePaymentStatus);

// DELETE a payment
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
