import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function SettingsPage() {
  const [stats, setStats] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      // Get real stats from user's actual data
      const statsRes = await fetch(`/api/user/stats`);
      if (!statsRes.ok) throw new Error('Failed to fetch stats');
      const statsData = await statsRes.json();
      setStats(statsData);

      // Get real subscription info
      const subRes = await fetch(`/api/user/subscription`);
      if (!subRes.ok) throw new Error('Failed to fetch subscription');
      const subData = await subRes.json();
      setSubscription(subData);

      console.log('✅ Loaded real statistics:', statsData);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleUpgrade = async () => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const response = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      const options = {
        key: data.key_id,
        subscription_id: data.subscription_id,
        name: 'Audio Solution Pro',
        description: 'Monthly Subscription',
        handler: async function (response) {
          // Verify payment on backend
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          const verifyData = await verifyRes.json();
          if (verifyData.status === 'success') {
            alert('Welcome to Pro! 🎉');
            fetchSettings(); // Refresh UI
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          email: subscription?.email || '',
        },
        theme: {
          color: '#3b82f6'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Error initiating payment');
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
          <div className="card-header-flex">
            <h2>💳 Subscription Plan</h2>
            {subscription.plan === 'free' && (
              <button className="upgrade-btn" onClick={handleUpgrade}>
                Upgrade to Pro 🚀
              </button>
            )}
          </div>
          <div className="subscription-info">
            <p>
              <strong>Plan:</strong> {subscription.plan.toUpperCase()}
              {subscription.plan === 'pro' && <span className="pro-badge">PRO</span>}
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
                  {Math.floor(stats.totalRoutingTime / 60)}h {stats.totalRoutingTime % 60}m
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
