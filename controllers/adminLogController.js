const AdminLog = require("../models/AdminLog");

// Get all logs
exports.getAllLogs = async (req, res) => {
  try {
    const logs = await AdminLog.find().populate("adminId").sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs", error });
  }
};

// Get logs by admin ID
exports.getLogsByAdmin = async (req, res) => {
  try {
    const logs = await AdminLog.find({ adminId: req.params.adminId }).sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch logs by admin", error });
  }
};

// Create a new log
exports.createLog = async (req, res) => {
  try {
    const log = new AdminLog(req.body);
    const saved = await log.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create admin log", error });
  }
};

// Delete a log entry (optional)
exports.deleteLog = async (req, res) => {
  try {
    const deleted = await AdminLog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Log not found" });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete log", error });
  }
};
