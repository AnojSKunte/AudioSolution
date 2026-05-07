/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { authenticateUser, getUserId } = require('../middleware/auth');

/**
 * Register new user
 * POST /api/auth/register
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    if (await userService.getUserByEmail(email)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(email, hashedPassword, name);

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Login user
 * POST /api/auth/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'dev-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Verify token
 * POST /api/auth/verify
 */
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev-secret-key'
    );

    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

/**
 * Get or create API key for Electron agent
 * GET/POST /api/auth/api-key
 */
router.post('/api-key', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);
    const apiKey = userService.generateApiKey(userId);

    res.json({
      message: 'API key generated',
      apiKey,
      note: 'Keep this key safe! You\'ll use it to start your Electron agent'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user's API keys
 * GET /api/auth/api-keys
 */
router.get('/api-keys', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);
    const apiKeys = userService.getUserApiKeys(userId);

    res.json({
      apiKeys,
      message: 'Use API key to start your Electron agent'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get current user profile
 * GET /api/auth/profile
 */
router.get('/profile', authenticateUser, async (req, res) => {
  try {
    const userId = getUserId(req);
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
