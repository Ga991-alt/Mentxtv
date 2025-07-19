const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

// GET all sessions
router.get("/", sessionController.getSessions);
router.get("/:id/students", sessionController.getSessionStudents);

// GET session by ID
router.get("/:id", sessionController.getSessionById);

// POST create new session
router.post("/", sessionController.createSession);

// PUT update session
router.put("/:id", sessionController.updateSession);

// DELETE session
router.delete("/:id", sessionController.deleteSession);
router.post('/feedback/:sessionId', sessionController.submitFeedback);



module.exports = router;
