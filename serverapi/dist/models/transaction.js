"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var transactionSchema = new Schema({
  walletid: {
    type: String
  },
  date: {
    type: Date,
    "default": Date.now,
    required: true
  },
  label: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    "enum": ['incoming', 'outgoing'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  pending: {
    type: Boolean,
    "default": true
  },
  userBalanceAtOccurence: {
    type: Number,
    required: true
  },
  assetType: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});
var Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;