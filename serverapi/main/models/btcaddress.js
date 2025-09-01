"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var btcAddressSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  inUse: {
    type: Boolean,
    "default": false
  }
});
var BtcAddress = mongoose.model('BtcAddress', btcAddressSchema);
module.exports = BtcAddress;