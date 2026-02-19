import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function SettingsPage() {
  const [stats, setStats] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const statsRes = await fetch(`${API_URL}/api/user/stats`);
      const statsData = await statsRes.json();
      setStats(statsData);

      const subRes = await fetch(`${API_URL}/api/user/subscription`);
      const subData = await subRes.json();
      setSubscription(subData);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  return (
    <motion.div
      className="settings-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Settings & Statistics</h1>

      {/* Subscription */}
      {subscription && (
        <motion.div
          className="settings-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h2>💳 Subscription Plan</h2>
          <div className="subscription-info">
            <p>
              <strong>Plan:</strong> {subscription.plan.toUpperCase()}
            </p>
            <p>
              <strong>Routes:</strong> {subscription.routesUsed} /{' '}
              {subscription.routesLimit}
            </p>
            <p>
              <strong>Devices:</strong> {subscription.devicesUsed} /{' '}
              {subscription.devicesLimit}
            </p>
          </div>
        </motion.div>
      )}

      {/* Statistics */}
      {stats && (
        <>
          <motion.div
            className="settings-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2>📊 Usage Statistics</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <p className="stat-value">{stats.totalRoutes}</p>
                <p className="stat-label">Total Routes Created</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{stats.activeRoutes}</p>
                <p className="stat-label">Active Routes</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">
                  {(stats.totalRoutingTime / 60).toFixed(0)}h
                </p>
                <p className="stat-label">Total Routing Time</p>
              </div>
              <div className="stat-item">
                <p className="stat-value">{stats.averageLatency}ms</p>
                <p className="stat-label">Average Latency</p>
              </div>
            </div>
          </motion.div>

          {/* Top Apps */}
          <motion.div
            className="settings-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>🎵 Most Used Apps</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>App</th>
                  <th>Routes</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {stats.topApps.map((app, index) => (
                  <tr key={index}>
                    <td>{app.name}</td>
                    <td>{app.routeCount}</td>
                    <td>{app.timeMinutes}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Device Preferences */}
          <motion.div
            className="settings-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2>🔊 Device Preferences</h2>
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Usage Count</th>
                </tr>
              </thead>
              <tbody>
                {stats.devicePreferences.map((device, index) => (
                  <tr key={index}>
                    <td>{device.name}</td>
                    <td>{device.usageCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default SettingsPage;
