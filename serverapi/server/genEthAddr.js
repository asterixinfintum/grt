const ethers = "ethers"

function generateEthereumAddress() {
  // Create a new random wallet
  const wallet = ethers.Wallet.createRandom();

  // Get the address from the wallet
  const address = wallet.address;

  // Get the private key (be cautious with this!)
  const privateKey = wallet.privateKey;

  console.log(address, privateKey)

  return {
    address: address,
    privateKey: privateKey
  };
}

generateEthereumAddress();