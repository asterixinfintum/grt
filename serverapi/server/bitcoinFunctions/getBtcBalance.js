require('dotenv').config();

import axios from 'axios';

import UserAddress from '../models/useraddress';

const { ethers } = require('ethers');

const FAKEBTC_ADDRESS = process.env.FAKEBTC_ADDRESS;

const FAKEBTC_ABI = [
    {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    }
];

async function getFakeBtcBalance(walletAddress) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);

        const usdtContract = new ethers.Contract(FAKEBTC_ADDRESS, FAKEBTC_ABI, provider);

        const balance = await usdtContract.balanceOf(walletAddress);

        const balanceUSDT = ethers.utils.formatUnits(balance, process.env.FAKEBTC_ADDRESS_DECIMAL);

        console.log(`Wallet USDT balance: ${balanceUSDT} USDT`);
        return balanceUSDT;
    } catch (error) {
        console.error('Error fetching USDT balance:', error);
    }
}

async function getBtcBalance(walletid) {
    try {
        const userWallet = await UserAddress.findOne({ uniqueid: walletid });

        const {
            btcmode,
            btcaddress,
            ethaddress,
            adminBtcBalance,
        } = userWallet;

        let btcBalance;
        let btcBalanceUSD;

        const btcexchangeresp = await axios({
            method: "GET",
            url: `${process.env.BTC_RPC}/v1/prices`
        });

        const btcaddressresp = await axios({
            method: "GET",
            url: `${process.env.BTC_RPC}/address/${btcaddress}/utxo`
        });

        const utxos = btcaddressresp.data;
        let totalAmountAvailable = 0;

        for (const utxo of utxos) {
            totalAmountAvailable += utxo.value;
        }

        const btc_price = btcexchangeresp.data.USD;

        if (btcmode === 'manual') {
            btcBalance = adminBtcBalance + (totalAmountAvailable / 100000000);
        }

        if (btcmode === 'real') {
            
            btcBalance = (totalAmountAvailable / 100000000);
        }

        if (btcmode == 'fake') {
            const fakeBalance = await getFakeBtcBalance(ethaddress)
            btcBalance = parseFloat(fakeBalance) + totalAmountAvailable;
        }

        btcBalanceUSD = btcBalance * btc_price;

        return { btcBalance, btcBalanceUSD, btc_price };
    } catch (error) {
        console.log(error);
    }
}

export default getBtcBalance;