const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  coin: { type: String, required: true },
  usd: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Price', PriceSchema);
