"use strict";

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  seedphrase: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var User = mongoose.model('User', userSchema);
module.exports = User;