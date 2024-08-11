"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ethers = require("ethers");
require('dotenv').config();
function generateEthereumAddress() {
  // Create a new random wallet
  var wallet = _ethers.ethers.Wallet.createRandom();

  // Get the address from the wallet
  var address = wallet.address;

  // Get the private key (be cautious with this!)
  var privateKey = wallet.privateKey;
  return {
    address: address,
    privateKey: privateKey
  };
}
var _default = exports["default"] = generateEthereumAddress;