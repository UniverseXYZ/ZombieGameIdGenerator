const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  id: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substring(2, 12).toUpperCase(),
    index: { unique: true },
  },
  idIsUsed: { type: Boolean, default: false }
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;