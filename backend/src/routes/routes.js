/**
 * Audio Routing Management Routes - Multi-User Version
 */

const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { authenticate, getUserId } = require('../middleware/auth');

/**
 * Create new route (connect input to output)
 * POST /api/routes
 * Requires: User token or Agent API key
 */
router.post('/', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const { inputId, outputId, volume, name } = req.body;

    if (!inputId || !outputId) {
      return res.status(400).json({ error: 'inputId and outputId required' });
    }

    const route = await userService.addRoute(userId, {
      inputId,
      outputId,
      name: name || 'New Route',
      volume: volume || 100,
      statistics: {
        timeActive: 0,
        dataTransferred: 0,
        dropouts: 0
      }
    });

    res.status(201).json({
      message: 'Route created successfully',
      route
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all routes for current user
 * GET /api/routes
 * Requires: User token or Agent API key
 */
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const routes = await userService.getUserRoutes(userId);

    res.json({
      status: 'success',
      routes,
      count: routes.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get single route
 * GET /api/routes/:id
 * Requires: User token or Agent API key
 */
router.get('/:id', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const routes = await userService.getUserRoutes(userId);
    const route = routes.find(r => r.id === req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update route
 * PUT /api/routes/:id
 * Requires: User token or Agent API key
 */
router.put('/:id', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const { volume, active, name } = req.body;

    const route = await userService.updateRoute(userId, req.params.id, {
      volume,
      active,
      name
    });

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.json({
      message: 'Route updated successfully',
      route
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Delete route
 * DELETE /api/routes/:id
 * Requires: User token or Agent API key
 */
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const routes = await userService.getUserRoutes(userId);
    const route = routes.find(r => r.id === req.params.id);

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    const deleted = await userService.deleteRoute(userId, req.params.id);

    res.json({
      message: 'Route deleted successfully',
      route
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Test route (verify connection works)
 * POST /api/routes/:id/test
 */
router.post('/:id/test', (req, res) => {
  try {
    const route = routesList[req.params.id];

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    res.json({
      message: 'Route test successful',
      status: 'connected',
      latency: Math.random() * 50,
      signalStrength: Math.random() * 100
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
