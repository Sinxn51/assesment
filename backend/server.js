import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = JSON.parse(readFileSync(join(__dirname, 'data/products.json'), 'utf-8'));
const communities = JSON.parse(readFileSync(join(__dirname, 'data/communities.json'), 'utf-8'));

app.get('/api/communities', (req, res) => {
  res.json(communities);
});

app.get('/api/products', (req, res) => {
  const { community } = req.query;
  const filtered = community ? products.filter(p => p.community === community) : products;
  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/categories/:community', (req, res) => {
  const community = communities.find(c => c.id === req.params.community);
  if (!community) return res.status(404).json({ error: 'Community not found' });
  res.json(community.categories);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
