import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import qr from 'qr-image';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-qr', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  // Generate the QR code image and send it as a response
  const qr_svg = qr.image(url, { type: 'png' });
  res.setHeader('Content-Type', 'image/png');
  qr_svg.pipe(res);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
