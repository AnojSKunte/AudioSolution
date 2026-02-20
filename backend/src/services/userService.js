/**
 * User Service - Manages users and API keys
 */

const crypto = require('crypto');

class UserService {
  constructor() {
    this.users = {}; // In-memory storage (replace with DB in production)
    this.apiKeys = {}; // Map of API keys to user IDs
  }

  /**
   * Create a new user
   */
  createUser(email, hashedPassword, name) {
    const userId = crypto.randomUUID();

    this.users[email] = {
      id: userId,
      email,
      password: hashedPassword,
      name: name || email.split('@')[0],
      createdAt: new Date(),
      audioDevices: [],
      audioApps: [],
      routes: [],
      apiKeys: []
    };

    return this.users[email];
  }

  /**
   * Get user by email
   */
  getUserByEmail(email) {
    return this.users[email] || null;
  }

  /**
   * Get user by ID
   */
  getUserById(userId) {
    return Object.values(this.users).find(u => u.id === userId) || null;
  }

  /**
   * Generate API key for Electron agent
   */
  generateApiKey(userId) {
    const user = this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const apiKey = `sk_${crypto.randomBytes(32).toString('hex')}`;

    user.apiKeys.push({
      key: apiKey,
      createdAt: new Date(),
      lastUsed: null,
      name: `Agent Key ${new Date().toLocaleDateString()}`
    });

    this.apiKeys[apiKey] = userId;

    return apiKey;
  }

  /**
   * Verify API key and return user ID
   */
  verifyApiKey(apiKey) {
    return this.apiKeys[apiKey] || null;
  }

  /**
   * Get user's API keys
   */
  getUserApiKeys(userId) {
    const user = this.getUserById(userId);
    if (!user) {
      return [];
    }

    return user.apiKeys.map(k => ({
      key: k.key.substring(0, 10) + '***' + k.key.substring(k.key.length - 4),
      fullKey: k.key,
      createdAt: k.createdAt,
      lastUsed: k.lastUsed,
      name: k.name
    }));
  }

  /**
   * Revoke API key
   */
  revokeApiKey(userId, apiKey) {
    const user = this.getUserById(userId);
    if (!user) {
      return false;
    }

    const keyIndex = user.apiKeys.findIndex(k => k.key === apiKey);
    if (keyIndex === -1) {
      return false;
    }

    user.apiKeys.splice(keyIndex, 1);
    delete this.apiKeys[apiKey];
    return true;
  }

  /**
   * Update user's audio devices
   */
  updateUserAudioDevices(userId, devices) {
    const user = this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.audioDevices = devices;
    return user.audioDevices;
  }

  /**
   * Update user's audio apps
   */
  updateUserAudioApps(userId, apps) {
    const user = this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.audioApps = apps;
    return user.audioApps;
  }

  /**
   * Get user's audio devices
   */
  getUserAudioDevices(userId) {
    const user = this.getUserById(userId);
    return user ? user.audioDevices : [];
  }

  /**
   * Get user's audio apps
   */
  getUserAudioApps(userId) {
    const user = this.getUserById(userId);
    return user ? user.audioApps : [];
  }

  /**
   * Add audio route for user
   */
  addRoute(userId, route) {
    const user = this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const routeWithMeta = {
      id: crypto.randomUUID(),
      ...route,
      userId,
      createdAt: new Date(),
      active: true
    };

    user.routes.push(routeWithMeta);
    return routeWithMeta;
  }

  /**
   * Get user's routes
   */
  getUserRoutes(userId) {
    const user = this.getUserById(userId);
    return user ? user.routes : [];
  }

  /**
   * Delete route
   */
  deleteRoute(userId, routeId) {
    const user = this.getUserById(userId);
    if (!user) {
      return false;
    }

    const index = user.routes.findIndex(r => r.id === routeId);
    if (index === -1) {
      return false;
    }

    user.routes.splice(index, 1);
    return true;
  }

  /**
   * Update route
   */
  updateRoute(userId, routeId, updates) {
    const user = this.getUserById(userId);
    if (!user) {
      return null;
    }

    const route = user.routes.find(r => r.id === routeId);
    if (!route) {
      return null;
    }

    Object.assign(route, updates, { userId }); // Prevent changing userId
    return route;
  }
}

// Singleton instance
const userService = new UserService();

module.exports = userService;
