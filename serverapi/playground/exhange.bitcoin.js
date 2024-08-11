const axios = require("axios");
const bitcore = require("bitcore-lib");

module.exports = exchangePrice = async () => {
    try {
        const resp = await axios({
            method: "GET",
            url: `https://mempool.space/api/v1/prices`
        });

        const exchangePrice = resp.data.USD;
        
        return exchangePrice;
    } catch (error) {
        console.log(error)
        return error;
    }
}