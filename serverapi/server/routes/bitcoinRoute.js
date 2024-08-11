require('dotenv').config();

import axios from 'axios';
import express from 'express';
import crypto from 'crypto';

import UserAddress from '../models/useraddress';

import createWallet from '../bitcoinFunctions/createWallet';
import bitcore from 'bitcore-lib';

const bitcoinRoute = express.Router();

/*import { AnkrProvider } from '@ankr.com/ankr.js';

const rpcUrl = process.env.BTC_RPC_URL;

const provider = new AnkrProvider('https://rpc.ankr.com/eth/cdc07186149cd0f917d7b36d85cb25e68af3d9ff800abb411c575250e9eb0d7c');*/

function generateUniqueId(seedphrase) {
    const hash = crypto.createHash('sha256');
    hash.update(seedphrase);
    return hash.digest('hex');
}

function stringToArray(inputString) {
    return inputString.split(' ');
}

bitcoinRoute.get('/createwallet', async (req, res) => {
    try {
        const walletDetails = await createWallet();

        const uniqueId = generateUniqueId(walletDetails.mnemonic);

        const userAddress = new UserAddress({
            uniqueid: uniqueId,
            address: walletDetails.address,
            seedPhrase: walletDetails.mnemonic,
            privateKey: walletDetails.privateKey
        });

        await userAddress.save();

        res.status(200).json({
            message: 'Wallet created successfully',
            walletDetails: {
                uniqueid: uniqueId,
                address: walletDetails.address,
                seedPhrase: stringToArray(walletDetails.mnemonic)
            }
        });
    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({ message: 'Failed to create wallet', error: error.message });
    }
});

//custom, aunt, identify, coin, enjoy, rifle, near, wheel, goat, hundred, hub, gesture

bitcoinRoute.get('/dashboard', async (req, res) => {
    try {
        const walletid = req.query.walletid;
        console.log(walletid);

        const userWallet = await UserAddress.findOne({ uniqueid: walletid });

        //console.log(userWallet);
        const { address, transactions, ethereumaddress, usdtBalance } = userWallet;

        const addressresp = await axios({
            method: "GET",
            url: `${process.env.BTC_RPC}/address/${address}/utxo`
        });

        const utxos = addressresp.data;
        let totalAmountAvailable = 0;

        for (const utxo of utxos) {
            totalAmountAvailable += utxo.value;
        }

        const exchangeresp = await axios({
            method: "GET",
            url: `${process.env.BTC_RPC}/v1/prices`
        });

        const btc_price = exchangeresp.data.USD;
        const balance = (totalAmountAvailable / 100000000);


        console.log('dashboard:', balance, btc_price);

        const usdtExchangePrice = `${1.0}`;

        res.status(200).json({
            message: "Dashboard retrived successfully",
            dashboard: {
                ethereumaddress: `${ethereumaddress}`,
                usdtExchangePrice: `${usdtExchangePrice}`,
                usdtBalance: `${usdtBalance}`,
                usdtBalanceUSD: `${usdtBalance * usdtExchangePrice}`,
                btcaddress: `${address}`,
                btcExchangePrice: `${btc_price}`,
                btcBalance: `${balance}`,
                btcBalanceUSD: `${balance * btc_price}`,
                transactions
            }
        });
    } catch (error) {
        console.error(error);
    }
});

bitcoinRoute.post('/webhook', async (req, res) => {
    console.log('Received webhook:', req.body);

    res.status(200).send('Webhook received');
});

export default bitcoinRoute;

//parade, feed, limb, size, crane, tourist, lift, can, injury, inherit, village, struggle

//curl --location https://services.tokenview.io/vipapi/monitor/address/remove/btc/1FexBhebF9soRwoGj4AQ1nBMvsvS1ykeAo?apikey=M2UG2sj63xOfIfueiWzG
//curl --location https://services.tokenview.io/vipapi/monitor/address/add/btc/1FexBhebF9soRwoGj4AQ1nBMvsvS1ykeAo?apikey=M2UG2sj63xOfIfueiWzG

//https://services.tokenview.io/vipapi/monitor/setwebhookurl?apikey={apikey}

/*

curl -X POST "https://services.tokenview.io/vipapi/monitor/setwebhookurl?apikey=M2UG2sj63xOfIfueiWzG" \
-H "Content-Type: application/json" \
-d '{
  "url": "https://example.com/webhook"
}'

curl --location 'https://services.tokenview.io/vipapi/monitor/setwebhookurl?apikey=M2UG2sj63xOfIfueiWzG' \
--header 'Content-Type: text/plain' \
--data 'https://53ae-102-88-70-71.ngrok-free.app/webhook'

*/

//curl --location https://services.tokenview.io/vipapi/monitor/getwebhookurl?apikey=M2UG2sj63xOfIfueiWzG



//correct, border, juice, drive, bring, useful, warfare, predict, hybrid, state, eternal, fever

