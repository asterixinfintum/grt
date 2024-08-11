const axios = require("axios");
const bitcore = require("bitcore-lib");

module.exports = getBitcoinBalance = async (address) => {
    try {
        const inputs = [];
        const resp = await axios({
            method: "GET",
            url: `https://mempool.space/api/address/${address}/utxo`
        });

        let totalAmountAvailable = 0;
        let inputCount = 0;

        const utxos = resp.data;

        for (const utxo of utxos) {
            const input = {
                satoshis: utxo.value,
                script: bitcore.Script.buildPublicKeyHashOut(address).toHex(),
                address: address,
                txId: utxo.txid,
                outputIndex: utxo.vout
            }

            totalAmountAvailable += utxo.value;
            inputCount += 1;
            inputs.push(input);
        }

        const balance = totalAmountAvailable/100000000;

        return balance;

    } catch (error) {
        return error;
    }
}