const Private = require("../models/Private.js");

// GET About Us content
const getPrivate = async (req, res) => {
  try {
    const data = await Private.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to get content", error });
  }
};

// UPDATE or CREATE About Us content
const updatePrivate = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    let about = await Private.findOne();

    if (about) {
      about.content = content;
      await about.save();
      res.status(200).json({ message: " Private updated", data: about });
    } else {
      const newAbout = await Private.create({ content });
      res.status(201).json({ message: " Private created", data: newAbout });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update/create content", error });
  }
};

module.exports = {
  getPrivate,
  updatePrivate,
};
