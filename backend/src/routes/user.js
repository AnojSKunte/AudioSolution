/**
 * User Profile & Settings Routes
 */

const express = require('express');
const router = express.Router();

// Mock user data
const userProfiles = {};

/**
 * Get user profile
 * GET /api/user/profile
 */
router.get('/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Mock profile - in real implementation, decode JWT and fetch from DB
    const profile = {
      id: 'user-123',
      email: 'user@example.com',
      name: 'John Doe',
      subscriptionPlan: 'free',
      createdAt: new Date('2024-01-15'),
      preferences: {
        theme: 'dark',
        autoStart: true,
        notifications: true,
        volumeNormalization: true
      },
      stats: {
        totalRoutes: 5,
        totalRoutingTime: 3600,
        averageLatency: 22
      }
    };

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Update user profile
 * PUT /api/user/profile
 */
router.put('/profile', (req, res) => {
  try {
    const { name, preferences } = req.body;

    const profile = {
      id: 'user-123',
      email: 'user@example.com',
      name: name || 'John Doe',
      preferences: preferences || {},
      updatedAt: new Date()
    };

    res.json({
      message: 'Profile updated successfully',
      profile
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get user statistics
 * GET /api/user/stats
 */
router.get('/stats', (req, res) => {
  try {
    const stats = {
      totalRoutes: 12,
      activeRoutes: 3,
      totalRoutingTime: 36000,
      hourlyUsage: [
        { hour: 0, minutes: 0 },
        { hour: 1, minutes: 5 },
        { hour: 2, minutes: 120 },
        { hour: 3, minutes: 240 },
        { hour: 4, minutes: 180 }
      ],
      topApps: [
        { name: 'Spotify', routeCount: 45, timeMinutes: 1200 },
        { name: 'Chrome', routeCount: 38, timeMinutes: 900 },
        { name: 'Discord', routeCount: 25, timeMinutes: 600 }
      ],
      devicePreferences: [
        { name: 'Speakers', usageCount: 50 },
        { name: 'Bluetooth', usageCount: 35 },
        { name: 'Headphones', usageCount: 20 }
      ]
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get subscription info
 * GET /api/user/subscription
 */
router.get('/subscription', (req, res) => {
  try {
    const subscription = {
      plan: 'free',
      status: 'active',
      routesLimit: 5,
      routesUsed: 3,
      devicesLimit: 3,
      devicesUsed: 2,
      features: {
        basicRouting: true,
        volumeControl: true,
        statistics: false,
        advancedMixing: false,
        prioritySupport: false
      },
      trialEndsAt: null,
      renewalDate: null
    };

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
