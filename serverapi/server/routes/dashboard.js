require('dotenv').config();

import axios from 'axios';
import express from 'express';
import crypto from 'crypto';

import UserAddress from '../models/useraddress';
import Transaction from '../models/transaction';


import getBtcBalance from '../bitcoinFunctions/getBtcBalance';
import getUSDTBalance from '../ethereumFunctions/getUSDTBalance';
import getEthBalance from '../ethereumFunctions/getEthBalance';

const dashBoardRoute = express.Router();

dashBoardRoute.get('/getdashboard', async (req, res) => {
    try {
        const walletid = req.query.walletid;

        const userWallet = await UserAddress.findOne({ uniqueid: walletid });

        const {
            ethaddress,
            btcaddress,
            transactions,
            adminPopupMessage,
            btcmode,
            uniqueid
        } = userWallet;

        //console.log(adminPopupMessage)

        const { btcBalance, btcBalanceUSD, btc_price } = await getBtcBalance(walletid);

        const { usdtBalance, usdtBalanceUSD, usdtExchangePrice } = await getUSDTBalance(walletid);

        const { ethBalance, ethBalanceUSD, ethPrice } = await getEthBalance(walletid);

        const walletTransactions = await Transaction.find({ walletid });

        console.log(walletTransactions, 'test');

        res.status(200).json({
            message: "Dashboard retrived successfully",
            dashboard: {
                uniqueId: `${uniqueid}`,
                btcBalance: `${btcBalance}`,
                btcBalanceUSD: `${btcBalanceUSD}`,
                usdtBalance: `${usdtBalance}`,
                usdtBalanceUSD: `${usdtBalanceUSD}`,
                ethBalance: `${ethBalance}`,
                ethBalanceUSD: `${ethBalanceUSD}`,
                usdtExchangePrice: `${usdtExchangePrice}`,
                btcExchangePrice: `${btc_price}`,
                ethExchangePrice: `${ethPrice}`,
                btcaddress: `${btcaddress}`,
                ethereumaddress: `${ethaddress}`,
                transactions: walletTransactions,
                showFakeBTCAddress: btcmode === 'fake' || btcmode === 'manual' ? false : false,
                adminPopupMessage: `${adminPopupMessage}`
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error getting dashboard', error: error.message });
    }
})

export default dashBoardRoute;

//intact, pelican, acquire, shed, wealth, glass, student, hint, midnight, autumn, shoot, art