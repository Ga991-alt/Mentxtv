const express = require("express");
const router = express.Router();
const adminLogController = require("../controllers/adminLogController.js");

// GET all logs
router.get("/", adminLogController.getAllLogs);

// GET logs by admin ID
router.get("/admin/:adminId", adminLogController.getLogsByAdmin);

// POST create a new log
router.post("/", adminLogController.createLog);

// DELETE a log entry
router.delete("/:id", adminLogController.deleteLog);

module.exports = router;
