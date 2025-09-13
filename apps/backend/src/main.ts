import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import managerRoutes from './routes/manager';
import staffRoutes from './routes/staff';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/staff', staffRoutes);

// Test endpoint
app.get('/test', (req, res) => {
    res.send('Hello World from Express!');
    console.log('Test endpoint was called');
  });

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
