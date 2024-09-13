require("dotenv").config();

import UserAddress from '../models/useraddress';

let addresses = process.env.BTC_ADDRESSES;

addresses = convertCommaSeparatedListToArray(addresses);

function convertCommaSeparatedListToArray(list) {
    // Split the list by commas
    const array = list.split(',');

    // Remove leading and trailing whitespace from each element
    return array.map(item => item.trim());
}

// Assuming btcaddressGet is not asynchronous (remove async keyword if not needed)
async function btcaddressGet(addresses) {
    const existingAddresses = await UserAddress.find({ btcaddress: { $in: addresses } }); // Assuming UserAddress.find is synchronous

    const availableAddresses = await addresses.filter(address => !existingAddresses.some(existingAddress => existingAddress.btcaddress === address));

    if (availableAddresses.length === 0) {
        throw new Error('All addresses in the array are already in use.');
    }

    console.log(availableAddresses[0], 'yo')

    return availableAddresses[0];
}

async function assignUniqueBtcAddress() {
    const address = await btcaddressGet(addresses); // Await if btcaddressGet is truly async
    
    return address;
}

export default assignUniqueBtcAddress;