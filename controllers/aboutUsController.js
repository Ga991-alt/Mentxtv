const AboutUs = require("../models/AboutUs");

// GET About Us content
const getAboutUs = async (req, res) => {
  try {
    const data = await AboutUs.findOne();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to get content", error });
  }
};

// UPDATE or CREATE About Us content
const updateAboutUs = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    let about = await AboutUs.findOne();

    if (about) {
      about.content = content;
      await about.save();
      res.status(200).json({ message: "About Us updated", data: about });
    } else {
      const newAbout = await AboutUs.create({ content });
      res.status(201).json({ message: "About Us created", data: newAbout });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update/create content", error });
  }
};

module.exports = {
  getAboutUs,
  updateAboutUs,
};
