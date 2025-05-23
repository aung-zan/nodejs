const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpire: Date
}, {
  timestamps: true
});

const User = model('users', UserSchema);

module.exports = User;