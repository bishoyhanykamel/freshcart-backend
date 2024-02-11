const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "User must have a name."],
  },
  password: {
    type: String,
    required: [true, "User must have a password."],
  },
  email: {
    type: String,
    trim: true,
    unqiue: [true, 'User already exists.'],
    required: [true, "User must have an email."],
  },
  passwordChangeAt: Date,
  picture: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    required: [true, 'User must a phone number']
  }
});

UserSchema.index({ username: 1, email: 1 }, { unique: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.passwordChangeAt = Date.now();
  this.password = await bcrypt.hash(this.password, 4);
});

UserSchema.methods.comparePasswords = async function (candidatePw) {
  return await bcrypt.compare(candidatePw, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
