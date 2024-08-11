const mongoose = require('mongoose');
const { Schema } = mongoose;

const pendingTxnDtSchema = new Schema({
    to: String,
    value: String,
    gasLimit: String,
    gasPrice: String,
    from: String,
    asset: String,
    timestamp: { type: Date, default: Date.now },
    chain: {
        type: String
    },
    status: {
        type: String,
        default: 'pending'
    }
});

pendingTxnDtSchema.statics.convertTxDataForMongoDB = function (txData) {
    return {
        to: txData.to,
        value: txData.value.toString(),
        gasLimit: txData.gasLimit.toString(),
        gasPrice: txData.gasPrice.toString()
        // You can add other fields here if needed
    };
};

pendingTxnDtSchema.statics.createAndSaveTransaction = async function (txData, walletid, chain) {
    //const convertedData = this.convertTxDataForMongoDB(txData);
    const saveData = { ...txData, from: walletid };
    const transaction = new this(saveData);

    transaction.chain = chain;

    await transaction.save();

    console.log(transaction)

    return transaction;
};

const PendingTxnDt = mongoose.model('PendingTxnDt', pendingTxnDtSchema);

module.exports = PendingTxnDt;