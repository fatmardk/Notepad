const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Lütfen kullanıcı adı giriniz"]
  },
  email: {
    type: String,
    required: [true, "Lütfen email giriniz"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Lütfen şifre giriniz"]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
