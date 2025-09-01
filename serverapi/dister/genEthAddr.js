"use strict";

var ethers = "ethers";
function generateEthereumAddress() {
  // Create a new random wallet
  var wallet = ethers.Wallet.createRandom();

  // Get the address from the wallet
  var address = wallet.address;

  // Get the private key (be cautious with this!)
  var privateKey = wallet.privateKey;
  console.log(address, privateKey);
  return {
    address: address,
    privateKey: privateKey
  };
}
generateEthereumAddress();