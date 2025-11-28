const mongoose = require("mongoose");
const MealSchema = new mongoose.Schema({
  name: String,
  calories: Number
});

module.exports = mongoose.model("Meal", MealSchema);