require('dotenv').config();

import { ethers } from 'ethers';

async function estimateEthGas({ value, receiver }) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);

        const transaction = {
            to: receiver,
            value: ethers.utils.parseEther(value)
        };

        // Estimate gas limit with a 20% buffer
        const estimatedGasLimit = await provider.estimateGas(transaction);
        const gasLimitWithBuffer = estimatedGasLimit.mul(120).div(100);

        // Get current gas price
        const gasPrice = await provider.getGasPrice();

        // Slightly increase gas price to improve chances of quick inclusion
        const adjustedGasPrice = gasPrice.mul(110).div(100);  // 10% increase

        // Calculate total gas fee
        const gasFee = adjustedGasPrice.mul(gasLimitWithBuffer);

        console.log("Estimated Gas Limit (with buffer):", gasLimitWithBuffer.toString());
        console.log("Adjusted Gas Price:", ethers.utils.formatUnits(adjustedGasPrice, "gwei"), "Gwei");
        console.log("Estimated Max Gas Fee:", ethers.utils.formatEther(gasFee), "ETH");

        // Add gas price and limit to the transaction
        transaction.gasLimit = gasLimitWithBuffer;
        transaction.gasPrice = adjustedGasPrice;

        //console.log(transaction);

        //const formattedData = formatTransactionData(transaction);

        //console.log(JSON.stringify(formattedData, null, 2));

        console.log(transaction);

        return {
            ...transaction,
            gasFee: ethers.utils.formatEther(gasFee)
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    estimateEthGas
}

//receiver: 0x2202F3aC22c2F656D75F0BF984Cca70B7E0fC351

//shiver, tennis, orchard, pact, web, buddy, response, live, bag, love, panic, future

//december, gentle, hole, kind, raccoon, thumb, unlock, foam, choice, system, pledge, bread

//myself, same, neglect, later, rose, glass, february, wheat, one, inspire, upon, regular

//multiply, sadness, stumble, sound, catch, earn, other, laugh, cute, salt, current, wrong

//nose, unfold, machine, knife, apology, muscle, gauge, festival, page, anxiety, inch, gasp