const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/mentorController");

// GET all mentors
router.get("/", mentorController.getAllMentors);

// GET mentor by MongoDB _id
// router.get("/:id", mentorController.getMentorById);

// GET mentor by userId
router.get("/user/:userId", mentorController.getMentorByUserId);
router.get("/:email", mentorController.getMentorByEmail);


// POST create a new mentor
router.post("/", mentorController.createMentor);

// PUT update mentor
router.put("/:id", mentorController.updateMentor);

// DELETE mentor
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;
