export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const payload = req.body;  // The JSON payload from TradingView
      console.log('Received Webhook:', payload);
      
      // Example: You can access the TradingView data here
      const { symbol, side, amount, price } = payload;

      // Process the data (e.g., log, send to Binance, etc.)
      console.log(`Symbol: ${symbol}, Side: ${side}, Amount: ${amount}, Price: ${price}`);

      // Respond with success
      res.status(200).send('Webhook received successfully');
    } catch (error) {
      res.status(500).json({ error: 'Error processing webhook' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
