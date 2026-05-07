/**
 * User Service - Production Version
 * Manages users and API keys using PostgreSQL.
 */

const crypto = require('crypto');
const db = require('../db');

class UserService {
  /**
   * Create a new user
   */
  async createUser(email, hashedPassword, name) {
    const query = `
      INSERT INTO users (email, password, full_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, full_name as name, created_at, subscription_status
    `;
    const values = [email, hashedPassword, name || email.split('@')[0]];
    const res = await db.query(query, values);
    return res.rows[0];
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email) {
    const query = 'SELECT id, email, password, full_name as name, subscription_status FROM users WHERE email = $1';
    const res = await db.query(query, [email]);
    return res.rows[0] || null;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    const query = 'SELECT id, email, full_name as name, created_at, stripe_customer_id, subscription_status FROM users WHERE id = $1';
    const res = await db.query(query, [userId]);
    return res.rows[0] || null;
  }

  async updateUserAudioDevices(userId, devices) {
    for (const device of devices) {
      const query = `
        INSERT INTO audio_devices (user_id, device_id, name, type, is_default, is_connected, last_seen)
        VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (user_id, device_id, type) DO UPDATE SET
          name = EXCLUDED.name,
          is_default = EXCLUDED.is_default,
          is_connected = EXCLUDED.is_connected,
          last_seen = NOW()
      `;
      await db.query(query, [
        userId, 
        device.id, 
        device.name, 
        device.type === 'Speaker' ? 'output' : 'input',
        device.isDefault || false,
        device.isConnected || true
      ]);
    }
    return devices;
  }

  async updateUserAudioApps(userId, apps) {
    for (const app of apps) {
      const query = `
        INSERT INTO audio_devices (user_id, device_id, name, type, is_connected, last_seen)
        VALUES ($1, $2, $3, $4, $5, NOW())
        ON CONFLICT (user_id, device_id, type) DO UPDATE SET
          name = EXCLUDED.name,
          is_connected = EXCLUDED.is_connected,
          last_seen = NOW()
      `;
      await db.query(query, [
        userId, 
        app.id, 
        app.name, 
        'input',
        app.isActive || true
      ]);
    }
    return apps;
  }

  async getUserAudioDevices(userId) {
    const query = "SELECT device_id as id, name, type, is_default as \"isDefault\", is_connected as \"isConnected\" FROM audio_devices WHERE user_id = $1 AND type = 'output'";
    const res = await db.query(query, [userId]);
    return res.rows;
  }

  async getUserAudioApps(userId) {
    const query = "SELECT device_id as id, name, type, is_connected as \"isActive\" FROM audio_devices WHERE user_id = $1 AND type = 'input'";
    const res = await db.query(query, [userId]);
    return res.rows;
  }

  async addRoute(userId, route) {
    const query = `
      INSERT INTO audio_routes (user_id, input_device_id, output_device_id, volume, is_active) 
      VALUES ($1, $2, $3, $4, true) 
      RETURNING id, input_device_id as \"inputId\", output_device_id as \"outputId\", volume, is_active as \"isActive\"
    `;
    const res = await db.query(query, [userId, route.inputId, route.outputId, route.volume]);
    return res.rows[0];
  }

  async getUserRoutes(userId) {
    const query = `
      SELECT id, input_device_id as \"inputId\", output_device_id as \"outputId\", volume, is_active as \"isActive\"
      FROM audio_routes 
      WHERE user_id = $1
    `;
    const res = await db.query(query, [userId]);
    return res.rows;
  }

  async deleteRoute(userId, routeId) {
    const query = 'DELETE FROM audio_routes WHERE user_id = $1 AND id = $2';
    await db.query(query, [userId, routeId]);
    return true;
  }
}

const userService = new UserService();
module.exports = userService;
