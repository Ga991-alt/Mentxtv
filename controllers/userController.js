const User = require("../models/User");

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user by email", error });
  }
};


// CREATE new user
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
