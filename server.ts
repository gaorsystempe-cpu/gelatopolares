import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory backend database for instant sync
  let storeConfig = {
    name: "Polares Auténtico Gelato Italiano",
    tagline: "Gelato Artesanal Italiano | 100% Artesanal y de calidad superior",
    phone: "51944774086",
    whatsappFormatted: "+51 944 774 086",
    address: "Calle Real 640, Centro de Huancayo - Junín, Perú",
    openHoursWeekday: "10:00 a. m. - 10:00 p. m.",
    openHoursSunday: "11:00 a. m. - 6:30 p. m.",
    isOpenNow: true,
    yapeNumber: "944 774 086",
    yapeHolder: "Polares Gelato Italiano S.A.C.",
    bcpAccount: "193-9823415-0-82",
    bcpCci: "002-193-009823415082-14",
    bcpHolder: "Polares Gelato Italiano S.A.C.",
    plinNumber: "944 774 086",
    plinHolder: "Polares Gelato Italiano S.A.C.",
  };

  let orders: any[] = [];

  // API Endpoints
  app.get('/api/store-config', (_req, res) => {
    res.json(storeConfig);
  });

  app.put('/api/store-config', (req, res) => {
    storeConfig = { ...storeConfig, ...req.body };
    res.json(storeConfig);
  });

  app.get('/api/orders', (_req, res) => {
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    orders.unshift(newOrder);
    res.status(201).json(newOrder);
  });

  app.patch('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const order = orders.find((o) => o.id === id);
    if (order) {
      order.status = status;
      res.json(order);
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
