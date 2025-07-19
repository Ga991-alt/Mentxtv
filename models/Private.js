const mongoose = require("mongoose");

const Private = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Private", Private);
