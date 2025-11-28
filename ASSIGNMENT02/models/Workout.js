const mongoose = require("mongoose");
const WorkoutSchema = new mongoose.Schema({
  type: String,
  duration: Number
});

module.exports = mongoose.model("Workout", WorkoutSchema);