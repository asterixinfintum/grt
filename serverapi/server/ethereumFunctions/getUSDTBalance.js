require('dotenv').config();

import axios from 'axios';

import UserAddress from '../models/useraddress';

const { ethers } = require('ethers');

const FAKEUSDT_ADDRESS = process.env.FAKEUSDT_ADDRESS
const REALUSDT_ADDRESS = process.env.REALUSDT_ADDRESS

const ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    }
];
async function getAssetBalance(walletAddress, assetAddress, assetABI, decimal) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);
        const assetContract = new ethers.Contract(assetAddress, assetABI, provider);

        const balance = await assetContract.balanceOf(walletAddress);

        const formattedBalance = ethers.utils.formatUnits(balance, decimal);

        return formattedBalance;

    } catch (error) {
        console.error('Error fetching Asset balance:', error);
    }
}

async function getUSDTBalance(walletid) {
    try {
        const userWallet = await UserAddress.findOne({ uniqueid: walletid });

        const {
            usdtmode,
            ethaddress,
            adminUsdtBalance
        } = userWallet;

        let usdtBalance;
        let usdtExchangePrice;
        let usdtBalanceUSD;

        let realbalance = await getAssetBalance(ethaddress, REALUSDT_ADDRESS, ABI, process.env.REALUSDT_ADDRESS_DECIMAL);
        let fakebalance = await getAssetBalance(ethaddress, FAKEUSDT_ADDRESS, ABI, process.env.FAKEUSDT_ADDRESS_DECIMAL);

        if (usdtmode === 'manual') {
            usdtBalance = parseFloat(realbalance) + adminUsdtBalance;
        }

        if (usdtmode === "real") {
            usdtBalance = parseFloat(realbalance);
        }

        if (usdtmode === "fake") {
            usdtBalance = parseFloat(realbalance) + parseFloat(fakebalance);
        }

        usdtExchangePrice = 1;

        usdtBalanceUSD = usdtBalance * usdtExchangePrice

        return { usdtBalance, usdtBalanceUSD, usdtExchangePrice }
    } catch (error) {
        console.log(error);
    }
}

export default getUSDTBalance;
