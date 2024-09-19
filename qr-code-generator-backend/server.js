import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import qr from 'qr-image';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to generate QR code
app.post('/generate-qr', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // Generate the QR code image
    const qr_svg = qr.image(url, { type: 'png' });
    res.setHeader('Content-Type', 'image/png');
    qr_svg.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

// Set port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
