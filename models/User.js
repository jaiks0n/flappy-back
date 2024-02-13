const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  score: { type: Number, required: false, default: 0 },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
