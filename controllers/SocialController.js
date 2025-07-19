const Social = require("../models/Social.js");

// GET Social Media URLs
const getSocial = async (req, res) => {
  try {
    const data = await Social.findOne();
    res.status(200).json(data || {}); // send empty object if none found
  } catch (error) {
    res.status(500).json({ message: "Failed to get social media URLs", error });
  }
};

// UPDATE or CREATE Social Media URLs
const updateSocial = async (req, res) => {
  try {
    const { instagram, twitter, youtube } = req.body;

    // Basic validation: at least one URL should be provided
    if (!instagram && !twitter && !youtube) {
      return res.status(400).json({ message: "At least one social media URL is required" });
    }

    let social = await Social.findOne();

    if (social) {
      social.instagram = instagram || "";
      social.twitter = twitter || "";
      social.youtube = youtube || "";
      await social.save();
      res.status(200).json({ message: "Social media URLs updated", data: social });
    } else {
      const newSocial = await Social.create({
        instagram: instagram || "",
        twitter: twitter || "",
        youtube: youtube || "",
      });
      res.status(201).json({ message: "Social media URLs created", data: newSocial });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update/create social media URLs", error });
  }
};

module.exports = {
  getSocial,
  updateSocial,
};
