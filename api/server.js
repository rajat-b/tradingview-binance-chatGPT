const Binance = require('node-binance-api');

// Binance API initialization
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,   // Use environment variables for security
  APISECRET: process.env.BINANCE_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { symbol, side, amount, price } = req.body;

    try {
      if (side === 'buy') {
        const order = await binance.marketBuy(symbol, amount);
        res.status(200).json({ message: 'Buy order placed successfully', order });
      } else if (side === 'sell') {
        const order = await binance.marketSell(symbol, amount);
        res.status(200).json({ message: 'Sell order placed successfully', order });
      } else {
        res.status(400).json({ error: 'Invalid side' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error placing order', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
