const Mentor = require("../models/Mentor");
const User = require("../models/User.js");

exports.getMentorByEmail = async (req, res) => {
  try {
    // 1. Find the user by email
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Find mentor by userId (user._id)
    const mentor = await Mentor.findOne({ userId: user._id }).populate("userId").populate("sessions");;
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });

    // 3. Send mentor data
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentor", error });
  }
};

// Get all mentors
exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentors", error });
  }
};

// Get mentor by ID
exports.getMentorById = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  try {
    const mentor = await Mentor.findById(req.params.id).populate("userId");
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentor", error });
  }
};



// Get mentor by user ID
exports.getMentorByUserId = async (req, res) => {
  try {
    const mentor = await Mentor.findOne({ userId: req.params.userId })
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json(mentor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mentor by userId", error });
  }
};

// Create new mentor profile
exports.createMentor = async (req, res) => {
  try {
    const newMentor = new Mentor(req.body);
    const savedMentor = await newMentor.save();
    res.status(201).json(savedMentor);
  } catch (error) {
    res.status(400).json({ message: "Failed to create mentor", error });
  }
};

// Update mentor profile
exports.updateMentor = async (req, res) => {
  try {
    const updated = await Mentor.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update mentor", error });
  }
};

// Delete mentor
exports.deleteMentor = async (req, res) => {
  try {
    const deleted = await Mentor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Mentor not found" });
    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete mentor", error });
  }
};
