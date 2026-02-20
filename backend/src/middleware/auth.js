/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

/**
 * Authenticate user via JWT token
 */
function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'dev-secret-key'
    );

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Authenticate agent via API key
 */
function authenticateAgent(req, res, next) {
  try {
    const apiKey = req.headers['x-api-key'] || req.query.api_key;

    if (!apiKey) {
      return res.status(401).json({ error: 'API key required' });
    }

    const userId = userService.verifyApiKey(apiKey);
    if (!userId) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    req.agent = { userId, apiKey };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
}

/**
 * Require either user or agent authentication
 */
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (token) {
    return authenticateUser(req, res, next);
  } else if (apiKey) {
    return authenticateAgent(req, res, next);
  }

  res.status(401).json({ error: 'Authentication required' });
}

/**
 * Get user ID from request (works with both user and agent auth)
 */
function getUserId(req) {
  if (req.user) {
    return req.user.id;
  } else if (req.agent) {
    return req.agent.userId;
  }
  return null;
}

module.exports = {
  authenticateUser,
  authenticateAgent,
  authenticate,
  getUserId
};
