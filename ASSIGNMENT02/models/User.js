const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//connecting to mongodb using mongoose and encryption
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String
});
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", UserSchema);