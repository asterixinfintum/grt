require('dotenv').config();

import axios from 'axios';

import UserAddress from '../models/useraddress';

import getLatestPrice from './ethPrice';

const { ethers } = require('ethers');

const FAKEETH_ADDRESS = process.env.FAKEETH_ADDRESS;

const FAKEETH_ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    }
];

async function getEthRealBalance(walletAddress) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);

        const balanceWei = await provider.getBalance(walletAddress);

        const balanceEth = ethers.utils.formatEther(balanceWei);

        return balanceEth;
    } catch (error) {
        console.error('Error fetching ETH balance:', error);
    }
}

async function getFakeEthBalance(walletAddress) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);

        const ethContract = new ethers.Contract(FAKEETH_ADDRESS, FAKEETH_ABI, provider);

        const balance = await ethContract.balanceOf(walletAddress);

        const balanceETH = ethers.utils.formatUnits(balance, process.env.FAKEETH_ADDRESS_DECIMAL);

        return balanceETH;
    } catch (error) {
        console.error('Error fetching USDT balance:', error);
    }
}


async function getEthBalance(walletid) {
    try {
        const userWallet = await UserAddress.findOne({ uniqueid: walletid });

        const {
            ethmode,
            ethaddress,
            adminEthBalance,
        } = userWallet;

        let ethBalance;
        let ethBalanceUSD;

        let realbalance = await getEthRealBalance(ethaddress);
        let fakebalance = await getFakeEthBalance(ethaddress);

        if (ethmode === "manual") {
            ethBalance = parseFloat(realbalance) + adminEthBalance;
        }

        if (ethmode === "real") {
            ethBalance = parseFloat(realbalance);
        }

        if (ethmode === "fake") {
            ethBalance = parseFloat(fakebalance) + parseFloat(realbalance);
        }

        const ethPrice = await getLatestPrice();

        ethBalanceUSD = ethBalance * parseFloat(ethPrice);

        return { ethBalance, ethBalanceUSD, ethPrice }
    } catch (eror) {
        console.log(error);
    }
}

export default getEthBalance;