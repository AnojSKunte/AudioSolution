import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlay, FaPause } from 'react-icons/fa';

function RoutesList({ routes, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (routeId) => {
    try {
      const response = await fetch(`/api/routes/${routeId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const handleToggle = async (routeId, currentActive) => {
    try {
      const response = await fetch(`/api/routes/${routeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive })
      });

      if (response.ok) {
        onRefresh();
      }
    } catch (error) {
      console.error('Error toggling route:', error);
    }
  };

  return (
    <div className="routes-list">
      {routes.length === 0 ? (
        <div className="empty-state">
          <p>No routes created yet</p>
          <small>Create one by selecting input and output above</small>
        </div>
      ) : (
        <AnimatePresence>
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              className={`route-item ${route.active ? 'active' : 'inactive'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="route-content">
                <div className="route-header">
                  <h4>{route.name}</h4>
                  <span className={`status-badge ${route.active ? 'active' : 'paused'}`}>
                    {route.active ? '▶ Active' : '⏸ Paused'}
                  </span>
                </div>

                <div className="route-info">
                  <p className="route-time">Created: {new Date(route.createdAt).toLocaleDateString()}</p>
                  {route.statistics && (
                    <div className="route-stats">
                      <span className="stat">
                        Time: {Math.floor(route.statistics.timeActive / 60)}m
                      </span>
                      <span className="stat">
                        Dropouts: {route.statistics.dropouts}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="route-actions">
                <button
                  className="action-btn toggle-btn"
                  onClick={() => handleToggle(route.id, route.active)}
                  title={route.active ? 'Pause route' : 'Resume route'}
                >
                  {route.active ? <FaPause /> : <FaPlay />}
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(route.id)}
                  title="Delete route"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

export default RoutesList;
