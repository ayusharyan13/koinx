const express = require('express');
const Price = require('../models/price'); // Adjust the path based on your directory structure
const router = express.Router();

// Route to get the latest data for a requested cryptocurrency
router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  // Validate the coin parameter
  if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin parameter. Must be bitcoin, matic-network, or ethereum.' });
  }

  try {
    // Find the latest price data for the requested cryptocurrency
    const latestData = await Price.findOne({ coin }).sort({ timestamp: -1 }).exec();

    // If no data is found, return a 404 error
    if (!latestData) {
      return res.status(404).json({ error: 'Data not found for the requested coin.' });
    }

    // Format the response
    const response = {
      price: latestData.usd,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching price data:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Helper function to calculate standard deviation
function calculateStandardDeviation(prices) {
  const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
  const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
  return Math.sqrt(variance);
}

// Route to get the standard deviation of the price for the last 100 records
router.get('/deviation', async (req, res) => {
  const { coin } = req.query;

  // Validate the coin parameter
  if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid coin parameter. Must be bitcoin, matic-network, or ethereum.' });
  }

  try {
    // Fetch the last 100 price records for the requested cryptocurrency
    const priceData = await Price.find({ coin }).sort({ timestamp: -1 }).limit(100).exec();

    // Check if there are enough records to calculate the standard deviation
    if (priceData.length === 0) {
      return res.status(404).json({ error: 'Not enough data to calculate standard deviation.' });
    }

    // Extract the prices from the fetched data
    const prices = priceData.map(record => record.usd);

    // Calculate the standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Send the result in the response
    res.status(200).json({ deviation: deviation.toFixed(2) });
  } catch (error) {
    console.error('Error calculating standard deviation:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


module.exports = router;
