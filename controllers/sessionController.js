const Session = require("../models/Session");

// Get all sessions
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("mentorId");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sessions", error });
  }
};


// const Session = require("../models/Session");
const Student = require("../models/Student");

exports.getSessionStudents = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "bookedStudents",
        populate: {
          path: "userId", // to get name/email
          select: "name email"
        }
      })
      .populate({
        path: "AttendedStudents",
        select: "_id" // no need to populate, just check presence
      });

    if (!session) return res.status(404).json({ message: "Session not found" });

    const attendingIds = session.AttendedStudents.map((s) => s._id.toString());

    const students = session.bookedStudents.map((student) => ({
      id: student._id,
      name: student.userId?.name || "N/A",
      email: student.userId?.email || "N/A",
      status: attendingIds.includes(student._id.toString()) ? "present" : "absent"
    }));

    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch session students", error: err.message });
  }
};

// Get a single session by ID
// exports.getSessionById = async (req, res) => {
//   try {
//     const session = await Session.findById(req.params.id).populate("mentorId");
//     if (!session) return res.status(404).json({ message: "Session not found" });
//     res.status(200).json(session);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch session", error });
//   }
// };

exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate("mentorId")
      .populate({
        path: "feedbacks.studentId",
        select: "profilePic userId", // ✅ only select what you need
        populate: {
          path: "userId",
          select: "name email" // ✅ name & email from user
        }
      })
      .populate("bookedStudents AttendedStudents")

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ message: "Failed to fetch session", error });
  }
};
// Create a new session
exports.createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(400).json({ message: "Failed to create session", error });
  }
};

// Update a session
exports.updateSession = async (req, res) => {
  try {
    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update session", error });
  }
};

// Delete a session
exports.deleteSession = async (req, res) => {
  try {
    const deleted = await Session.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Session not found" });
    res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete session", error });
  }
};


exports.submitFeedback = async (req, res) => {
  const { sessionId } = req.params;
  const { rating, feedback, studentId } = req.body;

  if (!rating || !feedback || !studentId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    console.log('Session found:', session);

    // Prevent duplicate feedback from same student (optional)
    const alreadySubmitted = session.feedbacks.some(fb =>
      fb.studentId.toString() === studentId
    );

    if (alreadySubmitted) {
      return res.status(409).json({ message: 'Feedback already submitted by this student' });
    }

    session.feedbacks.push({
      rating,
      feedback,
      studentId
    });

    await session.save();

    res.status(200).json({ message: 'Feedback submitted successfully', session });
  } catch (err) {
    console.error('Error submitting feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
};