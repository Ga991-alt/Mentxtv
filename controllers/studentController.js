const Student = require('../models/Student');
const User = require('../models/User');

// Get student info by ID

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error });
  }
};


exports.getStudentByEmail = async (req, res) => {
  try {
    // Step 1: Find the User by email
    const user = await User.findOne({email : req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Step 2: Find the Student by userId
    const student = await Student.findOne({ userId: user._id })
      .populate('userId')
      .populate('enrolledSessions')
      .populate('attendedSessions')
      .populate('payments')
      .populate('category');

    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "hello!" + err.message });
  }
};


exports.getStudentById = async (req, res) => {
  try {
    // 1. Find the user by ID
    const user = await Student.findById(req.params.id).populate('userId')               // Get name, email, etc.
      .populate('enrolledSessions')     // Just populate the session document
      .populate('attendedSessions')     // Just populate the session document
      .populate('payments');  ;
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 2. Find student and populate only first-level references
    // const student = await Student.findOne({ userId: user._id })
                // Just populate the payment document

    // if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server Error: " + err.message });
  }
};



// Add a new student
exports.addStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get attended sessions
exports.getAttendedSessions = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('attendedSessions');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student.attendedSessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get enrolled sessions
exports.getEnrolledSessions = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledSessions');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student.enrolledSessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('payments');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student.payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
