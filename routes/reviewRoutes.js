const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

// GET all reviews
router.get("/", reviewController.getAllReviews);

// GET reviews by mentorId
router.get("/mentor/:mentorId", reviewController.getReviewsByMentor);

// POST create new review
router.post("/", reviewController.createReview);

// PUT update review
router.put("/:id", reviewController.updateReview);

// DELETE review
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
