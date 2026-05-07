/**
 * Audio Solution - Backend Server
 * Main Express server for API
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static('/app/frontend/build'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Audio Solution Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes (will be populated)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/audio', require('./routes/audio'));
app.use('/api/routes', require('./routes/routes'));
app.use('/api/user', require('./routes/user'));
app.use('/api/payments', require('./routes/payments'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Fallback to React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile('/app/frontend/build/index.html');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Audio Solution Backend Server         ║
║  Running on port ${PORT}                ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
