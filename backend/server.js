import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
// middleware
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
  console.log(`Server listen on http://localhost: ${PORT} `);
  connectDB();
});
