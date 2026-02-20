/**
 * User Profile & Settings Routes - Real Data
 */

const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const statsService = require('../services/statsService');
const { authenticateUser, getUserId } = require('../middleware/auth');

/**
 * Get user profile with real data
 * GET /api/user/profile
 * Requires: User token
 */
router.get('/profile', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);
    const user = userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return real user data
    const profile = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      preferences: {
        theme: 'dark',
        autoStart: true,
        notifications: true,
        volumeNormalization: true
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
 * Requires: User token
 */
router.put('/profile', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);
    const { name, preferences } = req.body;
    const user = userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    if (name) user.name = name;
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    res.json({
      message: 'Profile updated successfully',
      profile: {
        id: user.id,
        email: user.email,
        name: user.name,
        preferences: user.preferences
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get real user statistics
 * GET /api/user/stats
 * Requires: User token
 */
router.get('/stats', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);

    // Get REAL statistics calculated from user's actual data
    const stats = statsService.getUserStats(userId);

    res.json({
      totalRoutes: stats.totalRoutes,
      activeRoutes: stats.activeRoutes,
      totalRoutingTime: stats.totalRoutingTime, // in minutes
      averageLatency: stats.averageLatency, // in ms
      topApps: stats.topApps.map(app => ({
        name: app.name,
        routeCount: app.routeCount,
        timeMinutes: app.timeMinutes
      })),
      devicePreferences: stats.devicePreferences.map(device => ({
        name: device.name,
        usageCount: device.usageCount
      })),
      audioAppsDetected: stats.audioAppsCount,
      audioDevicesDetected: stats.audioDevicesCount,
      lastUpdated: stats.lastUpdated
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get real subscription info
 * GET /api/user/subscription
 * Requires: User token
 */
router.get('/subscription', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);

    // Get REAL subscription based on actual usage
    const subscription = statsService.getSubscriptionInfo(userId);

    res.json({
      plan: subscription.plan,
      planType: subscription.planType,
      routesUsed: subscription.routesUsed,
      routesLimit: subscription.routesLimit,
      devicesUsed: subscription.devicesUsed,
      devicesLimit: subscription.devicesLimit,
      features: subscription.features,
      renewalDate: subscription.renewalDate,
      upgradeUrl: subscription.upgradeUrl
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get complete dashboard data
 * GET /api/user/dashboard
 * Requires: User token
 */
router.get('/dashboard', authenticateUser, (req, res) => {
  try {
    const userId = getUserId(req);

    // Get comprehensive dashboard stats with real data
    const dashboardData = statsService.getDashboardStats(userId);

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
