require('dotenv').config();

import express from 'express';
import { ethers } from 'ethers';
import axios from 'axios';
import bitcore from "bitcore-lib";

import PendingTxnDt from '../models/pendingtxndt';
import UserAddress from '../models/useraddress';
import Transaction from '../models/transaction';

const { estimateEthGas } = require('../ethereumFunctions/gasEstimator');

import getLatestPrice from '../ethereumFunctions/ethPrice';

async function sendTokenAsset(tokenAddress, toAddress, amount, privateKey, gasLimit = 100000, gasPriceGwei = '40') {
    // Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);

    // Create a wallet instance
    const wallet = new ethers.Wallet(privateKey, provider);

    // The ERC-20 Token ABI (Application Binary Interface)
    const abi = [
        "function transfer(address to, uint256 amount) returns (bool)",
        "function decimals() view returns (uint8)",
        "function balanceOf(address account) view returns (uint256)"
    ];

    // Create contract instance
    const contract = new ethers.Contract(tokenAddress, abi, wallet);

    try {
        const decimals = await contract.decimals();
        const amountInTokenUnits = ethers.utils.parseUnits(amount.toString(), decimals);

        // Check balance
        const balance = await contract.balanceOf(wallet.address);
        if (balance.lt(amountInTokenUnits)) {
            throw new Error('Insufficient token balance');
        }

        // Prepare transaction with manual gas settings
        const gasPrice = ethers.utils.parseUnits(gasPriceGwei, 'gwei');

        const tx = await contract.populateTransaction.transfer(toAddress, amountInTokenUnits);
        tx.gasLimit = ethers.BigNumber.from(gasLimit);
        tx.gasPrice = gasPrice;

        // Estimate gas and adjust if necessary
        try {
            const estimatedGas = await wallet.estimateGas(tx);
            tx.gasLimit = estimatedGas.mul(120).div(100); // Add 20% buffer
        } catch (error) {
            console.warn('Gas estimation failed, using manual limit');
        }

        const transaction = await wallet.sendTransaction(tx);
        console.log('Transaction sent:', transaction.hash);

        const receipt = await transaction.wait();
        console.log('Transaction confirmed in block:', receipt.blockNumber);
        return receipt.blockNumber;
    } catch (error) {
        console.error('Error sending token:', error);
        throw error;
    }
}

async function getEthRealBalanceForEstimate(walletAddress) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_MAINNET);

        const balanceWei = await provider.getBalance(walletAddress);

        const balanceEth = ethers.utils.formatEther(balanceWei);

        return balanceEth;
    } catch (error) {
        console.error('Error fetching ETH balance:', error);
    }
}

const sendRoute = express.Router();

sendRoute.post('/sendtransaction', async (req, res) => {
    try {
        const { walletid, transactionid } = req.query;

        const pndtxn = await PendingTxnDt.findOne({ _id: transactionid });
        const userAddr = await UserAddress.findOne({ uniqueid: pndtxn.from });

        const {
            btcmode,
            ethmode,
            usdtmode,
            expensiveFeeBTC,
            expensiveFeeETH,
            ethPrivateKey
        } = userAddr;

        const chain = pndtxn.chain;

        if (chain === "BTC") {
            if (btcmode === "manual") {
                const trnx = new Transaction({
                    walletid,
                    label: 'Bitcoin trnx',
                    type: "outgoing",
                    amount: parseFloat(pndtxn.value),
                    userBalanceAtOccurence: parseFloat(userAddr.adminBtcBalance),
                    assetType: pndtxn.asset
                });

                await trnx.save();

            } else if (btcmode === "fake") {
                receipt = await sendTokenAsset(process.env.FAKEBTC_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey)
            } else {

            }
        } else {
            if (chain === "USDT") {
                if (usdtmode === "manual") {
                    const trnx = new Transaction({
                        walletid,
                        label: 'USDT trnx',
                        type: "outgoing",
                        amount: parseFloat(pndtxn.value),
                        userBalanceAtOccurence: parseFloat(userAddr.adminUsdtBalance),
                        assetType: pndtxn.asset
                    });
                    await trnx.save();
                } else if (usdtmode === "fake") {
                    receipt = await sendTokenAsset(process.env.FAKEUSDT_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey)
                }
            } else {
                if (ethmode === "manual") {
                    const trnx = new Transaction({
                        walletid,
                        label: 'ETH trnx',
                        type: "outgoing",
                        amount: parseFloat(pndtxn.value),
                        userBalanceAtOccurence: parseFloat(userAddr.adminEthBalance),
                        assetType: pndtxn.asset
                    });

                    await trnx.save();
                } else if (ethmode === "fake") {
                    receipt = await sendTokenAsset(process.env.FAKEETH_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey)
                }
            }
        }

        let message;

        const { pauseTrade, pendingMesg } = userAddr;

        if (pauseTrade && pendingMesg.length) {
            message = pendingMesg;
        } else {
            message = 'Transaction broadcasted successfully';
        }

        res.status(200).json({
            message,
            pauseTrade
        })
    } catch (error) {

    }
})

sendRoute.get('/estimatefee', async (req, res) => {
    try {
        const { chain, value, walletid } = req.query;

        const userAddress = await UserAddress.findOne({ uniqueid: walletid });

        const {
            btcmode,
            ethmode,
            usdtmode,
            expensiveFeeBTC,
            expensiveFeeETH,
            useExpensivefee
        } = userAddress;

        let gasFee;
        let ethPrice;
        let btcPrice;

        let gasFeeInUsdt;

        if (useExpensivefee) {
            if (chain == 'Bitcoin') {
                const expensiveFee = expensiveFeeBTC;

                gasFee = expensiveFee;

                const btcexchangeresp = await axios({
                    method: "GET",
                    url: `${process.env.BTC_RPC}/v1/prices`
                });

                btcPrice = btcexchangeresp.data.USD;
                gasFeeInUsdt = gasFee * btcPrice;
            } else {
                const expensiveFee = expensiveFeeETH;

                gasFee = expensiveFee;

                await getLatestPrice().then(async price => {
                    ethPrice = parseFloat(price);

                    gasFeeInUsdt = gasFee * ethPrice;
                })
            }
        } else {
            if (chain == 'Bitcoin') {
                const fee = 0.0002;

                gasFee = fee;

                const btcexchangeresp = await axios({
                    method: "GET",
                    url: `${process.env.BTC_RPC}/v1/prices`
                });

                btcPrice = btcexchangeresp.data.USD;
                gasFeeInUsdt = gasFee * btcPrice;

            } else {
                await getLatestPrice().then(async price => {
                    ethPrice = parseFloat(price);

                    const transaction = await estimateEthGas({
                        value: value ? `${value}` : '0.0001',
                        receiver: '0x2202F3aC22c2F656D75F0BF984Cca70B7E0fC351'
                    });

                    gasFee = parseFloat(transaction.gasFee);

                    gasFeeInUsdt = gasFee * ethPrice;
                })
                    .catch(error => console.error("Failed to fetch price:", error));
            }
        }


        res.status(200).json({
            btcPrice,
            feeEstimate: {
                gasFee,
                gasFeeInUsdt,
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
});

sendRoute.get('/getfee', async (req, res) => {
    try {
        const { walletid, chain, amount, sender, receiver, asset } = req.query;

        const userAddress = await UserAddress.findOne({ uniqueid: walletid });

        console.log(walletid, chain, amount, sender, receiver, asset)
        let gasPrice;
        let savedTx;

        const {
            btcmode,
            ethmode,
            usdtmode,
            expensiveFeeBTC,
            expensiveFeeETH
        } = userAddress;

        if (chain === "Bitcoin") {

            if (btcmode === "fake" || btcmode === "manual") {

                gasPrice = expensiveFeeBTC;

                const pendingTxn = {
                    to: receiver,
                    value: amount,
                    gasLimit: `${expensiveFeeBTC}`,
                    gasPrice: `${gasPrice}`,
                    from: sender,
                    asset,
                }

                savedTx = await PendingTxnDt.createAndSaveTransaction(pendingTxn, walletid, asset);
            } else {

            }
        } else {
            if (ethmode === "fake" || ethmode === "manual") {
                gasPrice = expensiveFeeETH;

                const pendingTxn = {
                    to: receiver,
                    value: amount,
                    gasLimit: `${expensiveFeeETH}`,
                    gasPrice: `${gasPrice}`,
                    from: sender,
                    asset,
                }

                savedTx = await PendingTxnDt.createAndSaveTransaction(pendingTxn, walletid, asset);
            } else {

            }
        }

        res.status(200).json({
            message: "Pending transaction",
            pendingTransaction: {
                to: receiver,
                value: `${amount}`,
                gasLimit: `${gasPrice}`,
                gasPrice: `${gasPrice}`,
                gasFee: `${gasPrice}`,
                estimatedTotalCost: `${parseFloat(gasPrice) + parseFloat(amount)}`,
                transactionid: savedTx._id,
                transactionTotal: parseFloat(gasPrice) + parseFloat(amount)
            }
        });



        /*const {
            btcmode,
            ethmode,
            usdtmode,
            expensiveFeeBTC,
            expensiveFeeETH,
            useExpensivefee
        } = userAddress;

        let transaction;
        let gasFee;

        if (useExpensivefee) {

            console.log(amount, walletid, sender, receiver)

            let transaction = {
                to: receiver,
                value: amount,
                gasLimit: expensiveFeeETH,
                gasPrice: expensiveFeeETH,
                asset
            }

            const savedTx = await PendingTxnDt.createAndSaveTransaction(transaction, walletid, 'Ethereum');

            res.status(200).json({
                message: "Pending transaction",
                pendingTransaction: {
                    to: receiver,
                    value: `${amount}`,
                    gasLimit: `${expensiveFeeETH}`,
                    gasPrice: `${expensiveFeeETH}`,
                    gasFee: `${expensiveFeeETH}`,
                    estimatedTotalCost: `${parseFloat(expensiveFeeETH) + parseFloat(amount)}`,
                    transactionid: savedTx._id,
                    transactionTotal: parseFloat(expensiveFeeETH) + parseFloat(amount)
                }
            });

            return;
        }




        if (chain == "Bitcoin") {

        }

        if (chain == "Ethereum") {
            transaction = await estimateEthGas({
                value: amount,
                receiver
            });

            const savedTx = await PendingTxnDt.createAndSaveTransaction(transaction, walletid, chain);
            const formattedData = formatEthTransactionData(transaction);

            console.log(savedTx);
            console.log("==========================");
            console.log(JSON.stringify({ ...formattedData, transactionid: savedTx._id }, null, 2));

            res.status(200).json({
                message: "Pending transaction",
                pendingTransaction: {
                    ...formattedData,
                    transactionid: savedTx._id,
                    total: parseFloat(formattedData.gasFee) + parseFloat(formattedData.value)
                }
            });
        }*/

        //
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error', error: error.message });
    }
});

function formatEthTransactionData(txData) {
    const gasFee = txData.gasLimit.mul(txData.gasPrice);

    // Convert to ETH and format
    const gasFeeEth = ethers.utils.formatEther(gasFee);

    return {
        to: txData.to,
        value: ethers.utils.formatEther(txData.value),
        gasLimit: txData.gasLimit.toString() + ' gas units',
        gasPrice: ethers.utils.formatUnits(txData.gasPrice, 'gwei') + ' Gwei',
        gasFee: gasFeeEth,
        estimatedTotalCost: (
            parseFloat(ethers.utils.formatEther(txData.value)) +
            parseFloat(txData.gasPrice)
        ).toFixed(18)
    };
}

function removeNonNumbers(string) {
    return string.replace(/[^0-9]/g, '');
}

export default sendRoute;