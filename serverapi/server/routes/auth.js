require('dotenv').config();

import express from 'express';
import crypto from 'crypto';

import UserAddress from '../models/useraddress';

import createWallet from '../bitcoinFunctions/createWallet';
import assignUniqueBtcAddress from '../bitcoinFunctions/assignUniqueBtcAddress';
import generateEthereumAddress from '../ethereumFunctions/generateEthereumAddress';


const authRoute = express.Router();

function generateUniqueId(seedphrase) {
    const hash = crypto.createHash('sha256');
    hash.update(seedphrase);
    return hash.digest('hex');
}

function stringToArray(inputString) {
    return inputString.split(' ');
}
//jewel, end, slush, title, six, giggle, absurd, bounce, capable, rice, mix, inherit

authRoute.get('/createwallets', async (req, res) => {
    try {
        const ethWallet = generateEthereumAddress();
        const btcWallet = createWallet();

        const uniqueId = generateUniqueId(btcWallet.mnemonic);

        const userAddress = new UserAddress({
            uniqueid: uniqueId,
            btcaddress: await assignUniqueBtcAddress(),
            btcPrivateKey: btcWallet.privateKey,
            seedPhrase: btcWallet.mnemonic,
            ethaddress: ethWallet.address,
            ethPrivateKey: ethWallet.privateKey,
            privateKey: btcWallet.privateKey
        });

        await userAddress.save();

        res.status(200).json({
            message: 'Wallets created successfully',
            walletDetails: {
                uniqueid: uniqueId,
                address: btcWallet.address,
                btcaddress: btcWallet.address,
                ethaddress: ethWallet.address,
                seedPhrase: stringToArray(btcWallet.mnemonic)
            }
        });
    } catch (error) {
        console.error('Error creating wallet:', error);
        res.status(500).json({ message: 'Failed to create wallet', error: error.message });
    }
});

export default authRoute;