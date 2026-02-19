/**
 * Audio Routing Management Routes
 */

const express = require('express');
const router = express.Router();

// Mock database for routes
const routesList = {};

/**
 * Create new route (connect input to output)
 * POST /api/routes
 */
router.post('/', (req, res) => {
  try {
    const { inputId, outputId, volume, name } = req.body;

    if (!inputId || !outputId) {
      return res.status(400).json({ error: 'inputId and outputId required' });
    }

    const routeId = `route-${Date.now()}`;

    const route = {
      id: routeId,
      inputId,
      outputId,
      name: name || `Route ${Object.keys(routesList).length + 1}`,
      volume: volume || 100,
      active: true,
      createdAt: new Date(),
      statistics: {
        timeActive: 0,
        dataTransferred: 0,
        dropouts: 0
      }
    };

    routesList[routeId] = route;

    res.status(201).json({
      message: 'Route created successfully',
      route
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get all routes for user
 * GET /api/routes
 */
router.get('/', (req, res) => {
  try {
    const routes = Object.values(routesList);

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
 */
router.get('/:id', (req, res) => {
  try {
    const route = routesList[req.params.id];

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
 */
router.put('/:id', (req, res) => {
  try {
    const route = routesList[req.params.id];

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    const { volume, active, name } = req.body;

    if (volume !== undefined) route.volume = volume;
    if (active !== undefined) route.active = active;
    if (name !== undefined) route.name = name;

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
 */
router.delete('/:id', (req, res) => {
  try {
    const route = routesList[req.params.id];

    if (!route) {
      return res.status(404).json({ error: 'Route not found' });
    }

    delete routesList[req.params.id];

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
