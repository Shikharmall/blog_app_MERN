const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    blog_id: {
      type: String,
      required: true,
      unique: true, // Add this line
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
