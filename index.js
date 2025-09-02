const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
 
})



.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Route imports
const adminAuthRoutes = require('./routes/adminauth');
const adminEntryRoutes = require('./routes/adminentries');
const userEntryRoutes = require('./routes/userentries');

// Route usage
app.use('/api/admin/auth', adminAuthRoutes);       // e.g. POST /api/admin/auth/login
app.use('/api/admin/entries', adminEntryRoutes);   // e.g. GET /api/admin/entries
app.use('/api/user/submit', userEntryRoutes);      // e.g. POST /api/user/submit

// Default route
app.get('/', (req, res) => {
  res.send('🚀 ReConnect backend is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🟢 Server running on port ${PORT}`);
});
