const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },

  walletName: {
    type: String,
    required: true
  },
  walletId: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  invested: {
    type: String,

  },
  reffered: {
    type: String,
  },
  withdraw: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now
  },

});

const User = mongoose.model('User', UserSchema);

module.exports = User;
