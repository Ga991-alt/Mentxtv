const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema(
  {
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Social", socialSchema);
