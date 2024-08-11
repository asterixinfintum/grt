const axios = require("axios");
const bitcore = require("bitcore-lib");

module.exports = sendBitcoin = async (receiverAddress, amountToSend) => {
    try {
        const privateKey = "458254442e4c827e0151f8d3ea8eb10ece38ad383d044e460dbfb05ff103313a";
        const sourceAddress = "12a2txnk9ZUsHUAo1vrDvYfoZ9WQAYtYXr";
        const satoshiToSend = Math.floor(amountToSend * 100000000);

        const DUST_THRESHOLD = 546;

        let fee = 0;
        let inputCount = 0;
        let outputCount = 2;

        const recommendedFee = await axios.get("https://mempool.space/api/v1/fees/recommended");

        if (recommendedFee.status === 200) {
            const transaction = new bitcore.Transaction();
            let totalAmountAvailable = 0;

            const inputs = [];

            const resp = await axios({
                method: "GET",
                url: `https://mempool.space/api/address/${sourceAddress}/utxo`
            });

            const utxos = resp.data;

            for (const utxo of utxos) {
                const input = {
                    satoshis: utxo.value,
                    script: bitcore.Script.buildPublicKeyHashOut(sourceAddress).toHex(),
                    address: sourceAddress,
                    txId: utxo.txid,
                    outputIndex: utxo.vout
                }

                totalAmountAvailable += utxo.value;
                inputCount += 1;
                inputs.push(input);
            }

            const transactionSize =
                inputCount * 180 + outputCount * 34 + 10 - inputCount;

            fee = Math.min(Math.floor(transactionSize * recommendedFee.data.hourFee / 3), totalAmountAvailable - satoshiToSend);

            //console.log('log', totalAmountAvailable, satoshiToSend, totalAmountAvailable - satoshiToSend - fee);

            const maxSendAmount = totalAmountAvailable - fee;

            const adjustedSatoshiToSend = (satoshiToSend >= maxSendAmount) ? maxSendAmount : satoshiToSend;

            if (adjustedSatoshiToSend < DUST_THRESHOLD) {
                throw new Error("Send amount is below dust threshold");
            }

            transaction.from(inputs);
            transaction.to(receiverAddress, adjustedSatoshiToSend);

            // Only add change output if it's above dust threshold
            const changeAmount = totalAmountAvailable - adjustedSatoshiToSend - fee;
            if (changeAmount >= DUST_THRESHOLD) {
                transaction.change(sourceAddress);
            } else {
                // If change is below dust, add it to the fee
                fee += changeAmount;
            }

            transaction.fee(fee);
            transaction.sign(privateKey);

            const serializedTransaction = transaction.serialize();

            const result = await axios({
                method: "POST",
                url: `https://mempool.space/api/tx`,
                data: serializedTransaction,
            });
            return result.data;
        }

    } catch (error) {
        return error;
    }
}