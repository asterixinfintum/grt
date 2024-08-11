const ethers = require('ethers');

async function sendEthereumAsset(toAddress, amount, privateKey) {
  // Connect to the Ethereum network (replace with your preferred provider)
  const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR-PROJECT-ID');

  // Create a wallet instance from the private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // Convert the amount to wei (1 ether = 1e18 wei)
  const amountWei = ethers.utils.parseEther(amount.toString());

  // Prepare the transaction
  const tx = {
    to: toAddress,
    value: amountWei
  };

  try {
    // Send the transaction
    const transaction = await wallet.sendTransaction(tx);
    console.log('Transaction sent:', transaction.hash);

    // Wait for the transaction to be mined
    const receipt = await transaction.wait();
    console.log('Transaction confirmed in block:', receipt.blockNumber);
    return receipt;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

export default sendEthereumAsset;