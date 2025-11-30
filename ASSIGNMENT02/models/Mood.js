const mongoose = require("mongoose");
const MoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'anxious', 'calm', 'energetic', 'tired', 'angry', 'stressed', 'relaxed']
  },
  intensity: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  notes: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Mood", MoodSchema);