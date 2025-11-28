const mongoose = require("mongoose");
const MoodSchema = new mongoose.Schema({
  rating: Number,
  notes: String
});

module.exports = mongoose.model("Mood", MoodSchema);