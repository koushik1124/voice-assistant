import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan'; // Optional

import actionRouter from './routes/actionRouter.js';

// Initialize
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev')); // Optional

// Routes
app.use('/api', actionRouter);
app.use('/client', express.static(path.join(__dirname, '../client')));
app.get('/health', (req, res) => res.sendStatus(200)); // Optional

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server live at ${PORT}`));
