const mongoose = require('mongoose');
const { Schema } = mongoose;

const btcAddressSchema = new Schema({
    address: {
        type: String,
        required: true,
        unique: true
    },
    inUse: {
        type: Boolean,
        default: false
    }
});

const BtcAddress = mongoose.model('BtcAddress', btcAddressSchema);

module.exports = BtcAddress;