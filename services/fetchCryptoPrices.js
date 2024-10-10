const axios = require('axios');
const Price = require('../models/price');
require('dotenv').config();

const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(process.env.COINGECKO_API_URL, {
      params: {
        ids: 'bitcoin,matic-network,ethereum',
        vs_currencies: 'usd',
        include_market_cap: true,
        include_24hr_change: true
      },
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
      }
    });

    const { bitcoin, ethereum, 'matic-network': matic } = response.data;
    
    const cryptos = [
      { coin: 'bitcoin', usd: bitcoin.usd, marketCap: bitcoin.usd_market_cap, change24h: bitcoin.usd_24h_change },
      { coin: 'ethereum', usd: ethereum.usd, marketCap: ethereum.usd_market_cap, change24h: ethereum.usd_24h_change },
      { coin: 'matic-network', usd: matic.usd, marketCap: matic.usd_market_cap, change24h: matic.usd_24h_change }
    ];

    await Price.insertMany(cryptos);
    console.log('Crypto prices saved to database.');

  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

module.exports = fetchCryptoPrices;
