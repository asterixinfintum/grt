require('dotenv').config();

const ethers = require('ethers');

const RPC_URL = process.env.ETH_RPC_MAINNET;
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const ETH_USD_PRICE_FEED = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419';

const aggregatorV3InterfaceABI = [
    {
        inputs: [],
        name: "latestRoundData",
        outputs: [
            { internalType: "uint80", name: "roundId", type: "uint80" },
            { internalType: "int256", name: "answer", type: "int256" },
            { internalType: "uint256", name: "startedAt", type: "uint256" },
            { internalType: "uint256", name: "updatedAt", type: "uint256" },
            { internalType: "uint80", name: "answeredInRound", type: "uint80" }
        ],
        stateMutability: "view",
        type: "function"
    }
];

async function getLatestPrice() {
    console.log(`Attempting to fetch price from feed at address: ${ETH_USD_PRICE_FEED}`);

    const priceFeed = new ethers.Contract(ETH_USD_PRICE_FEED, aggregatorV3InterfaceABI, provider);

    try {
        console.log('Calling latestRoundData...');
        const roundData = await priceFeed.latestRoundData();
        console.log('latestRoundData response:', roundData);

        const price = roundData.answer;
        console.log('Raw price:', price.toString());

        // Default to 8 decimals, which is common for Chainlink price feeds
        let decimals = 8;
        try {
            console.log('Attempting to fetch decimals...');
            decimals = await priceFeed.decimals();
            console.log('Decimals:', decimals);
        } catch (error) {
            console.log('Failed to fetch decimals, using default of 8');
        }

        const formattedPrice = ethers.utils.formatUnits(price, decimals);

        console.log(`Formatted price: ${formattedPrice}`);
        return formattedPrice;
    } catch (error) {
        console.error("Error fetching latest price:", error);
        if (error.reason) {
            console.error("Error reason:", error.reason);
        }
        throw error;
    }
}

// Check provider connection
/*provider.getNetwork().then(network => {
  console.log('Connected to network:', network.name);
}).catch(error => {
  console.error('Failed to connect to network:', error);
});*/

/*getLatestPrice(ETH_USD_PRICE_FEED, provider)
  .then(price => console.log(`ETH/USD price: $${price}`))
  .catch(error => console.error("Failed to fetch price:", error));

getLatestPrice(ETH_USD_PRICE_FEED, provider)*/

export default getLatestPrice;