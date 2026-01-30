const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
;
const apiRoutes = require('./routes'); // your routes file
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes
app.use('/api', apiRoutes);

// Test route
app.get('/', (req, res) => res.send('✅ Backend is running'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.message);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

