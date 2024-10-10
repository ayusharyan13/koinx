const express = require('express');
const cron = require('node-cron');
const fetchCryptoPrices = require('./services/fetchCryptoPrices');
const connectDB = require("./config/db");
const cryptoRoutes = require('./routes/crypto'); // Import the crypto routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Use the crypto routes
app.use('/api', cryptoRoutes); 

// Schedule the task to run every 2 hours
cron.schedule('0 */2 * * *', () => {
  console.log('Running cron job to fetch crypto prices...');
  fetchCryptoPrices();
});

// Route to trigger fetching crypto prices manually
app.get('/api/fetch-prices', async (req, res) => {
  try {
    await fetchCryptoPrices();
    res.status(200).send("Crypto prices fetched and stored successfully.");
  } catch (error) {
    console.error("Error fetching prices manually:", error);
    res.status(500).send("Error fetching crypto prices.");
  }
});
