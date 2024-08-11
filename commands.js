//http://localhost:8080/userwallets?password=JHGFDSFGHGFD876567

/*
curl -X POST \
"http://localhost:8080/wallet?password=JHGFDSFGHGFD876567&btcaddress=1JcUcfUrnT7uZHMiy5Zgg8hzbbTEBELzPi" \
-H "Content-Type: application/json" \
-d '{
  "useAdminVals": true,
  "adminBtcBalance": 1.5,
  "adminUsdtBalance": 5000,
  "adminPopupMessage": "Welcome to our platform!",
  "pauseTrade": false
}'
*/ 

//curl -X GET http://localhost:8080/createwallets

/*
http://localhost:8080/admin/update?address=0x46C346Be936E3485f9B5CC0D89BFCEC21bAC9A17
{
      "ethBalance": 0,
      "adminEthBalance": 0,
      "btcmode": "real",
      "ethmode": "real",
      "usdtmode": "real",
      "_id": "66b4a1b0d50ace5cf772e8c4",
      "uniqueid": "9c931d9b1c1e296e69424540fce67915344b2bdc2c3a429513d4a1ca09362bc1",
      "btcaddress": "1KNqaxV4d6bzQyuyJkcxRXW5Dx8TFzBScz",
      "ethaddress": "0x46C346Be936E3485f9B5CC0D89BFCEC21bAC9A17",
      "seedPhrase": "parade feed limb size crane tourist lift can injury inherit village struggle",
      "ethPrivateKey": "0x1c6678a20948616c22c08e6986a78ed86823b54b86efd924909c47a6774b5246",
      "btcPrivateKey": "fc476a016d9bfb8108e6f60df38a1028c763bc1ec24b600dabc97749bd017597",
      "transactions": [
        
      ],
      "btcBalance": 0,
      "usdtBalance": 0,
      "adminBtcBalance": 0,
      "adminUsdtBalance": 0,
      "adminPopupMessage": "",
      "useAdminVals": false,
      "pauseTrade": false,
      "createdAt": "2024-08-08T10:45:04.891Z",
      "updatedAt": "2024-08-08T10:45:04.891Z",
      "__v": 0
    },

    */

   /* if (usdtmode === 'manual') {
      usdtBalance = adminUsdtBalance;
  }

  if (ethmode === 'manual') {
      ethBalance = adminEthBalance;
  }

    const {
      _id,
      btcmode,
      ethmode,
      usdtmode,
      uniqueid,
      btcaddress,
      ethaddress,
      transactions,
      pauseTrade,
      adminPopupMessage,
      adminBtcBalance,
      adminUsdtBalance,
      adminEthBalance
  } = userWallet;

    const btcaddressresp = await axios({
      method: "GET",
      url: `${process.env.BTC_RPC}/address/${btcaddress}/utxo`
  });

  const utxos = btcaddressresp.data;
  let totalAmountAvailable = 0;

  for (const utxo of utxos) {
      totalAmountAvailable += utxo.value;
  }

  const btcexchangeresp = await axios({
      method: "GET",
      url: `${process.env.BTC_RPC}/v1/prices`
  });

  const btc_price = btcexchangeresp.data.USD;
  const btcbalance = (totalAmountAvailable / 100000000);
  console.log(btcbalance);

  const usdtExchangePrice = `${1.0}`;


  //penalty, deny, eight, replace, scatter, lift, often, muscle, cool, feel, frown, ill*/


  sendRoute.post('/sendtransaction', async (req, res) => {
    try {
        const { walletid, transactionid } = req.query;

        console.log(walletid, transactionid);

        const pndtxn = await PendingTxnDt.findOne({ _id: transactionid });
        const userAddr = await UserAddress.findOne({ uniqueid: pndtxn.from });

        const { useExpensivefee, ethPrivateKey } = userAddr;

        let receipt;

        if (userAddr.useExpensivefee) {

            if (pndtxn.asset === 'BTC') {
                receipt = await sendTokenAsset(process.env.FAKEBTC_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey)
            }

            if (pndtxn.asset === 'ETH') {
                receipt = await sendTokenAsset(process.env.FAKEETH_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey)
            }

            if (pndtxn.asset === 'USDT') {
                receipt = await sendTokenAsset(process.env.FAKEUSDT_ADDRESS, pndtxn.to, pndtxn.value, ethPrivateKey)
            }

            console.log(receipt)

            res.status(200).json({
                message: 'Transaction broadcasted successfully',
                hash: receipt
            })

            return;
        }


        console.log(pndtxn, userAddr);
        if (pndtxn.chain == "Bitcoin") {

        }

        if (pndtxn.chain === "Ethereum") {

            const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_TESTNET);
            const wallet = new ethers.Wallet(userAddr.ethPrivateKey);
            const nonce = await provider.getTransactionCount(wallet.address);

            const network = await provider.getNetwork();

            const chainId = network.chainId;

            const txn = {
                to: pndtxn.to,
                value: ethers.BigNumber.from(pndtxn.value),
                gasLimit: ethers.BigNumber.from(pndtxn.gasLimit),
                gasPrice: ethers.BigNumber.from(pndtxn.gasPrice),
                nonce,
                chainId
            };

            console.log(txn, wallet);
            const signedTx = await wallet.signTransaction(txn);
            console.log('==============================');
            console.log(signedTx);

            const tx = await provider.sendTransaction(signedTx);
            console.log('Transaction sent. Hash:', tx.hash);

            // Wait for the transaction to be mined
            const receipt = await tx.wait();
            console.log('Transaction confirmed in block:', receipt.blockNumber);

            //return receipt;

            res.status(200).json({
                message: 'Transaction broadcasted successfully',
                hash: tx.hash
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});