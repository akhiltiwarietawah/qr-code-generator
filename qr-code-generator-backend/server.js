import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import qr from 'qr-image';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

  const qr_svg = qr.image(url, { type: 'png' });
  const filePath = path.join(__dirname, 'qr_img.png');

  qr_svg.pipe(fs.createWriteStream(filePath))
    .on('finish', () => {
      fs.writeFile('URL.txt', url, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to save URL' });
        res.sendFile(filePath);
      });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
