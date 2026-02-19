import React from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaChrome, FaDiscord, FaMusic } from 'react-icons/fa';

const iconMap = {
  spotify: <FaSpotify className="source-icon spotify" />,
  chrome: <FaChrome className="source-icon chrome" />,
  discord: <FaDiscord className="source-icon discord" />,
  vlc: <FaMusic className="source-icon vlc" />
};

function AudioSourcesList({ sources, selected, onSelect }) {
  return (
    <div className="sources-list">
      {sources.length === 0 ? (
        <div className="empty-state">
          <p>No audio sources detected</p>
          <small>Open Spotify, Chrome, Discord, or other audio apps</small>
        </div>
      ) : (
        sources.map((source, index) => (
          <motion.div
            key={source.id}
            className={`source-item ${selected?.id === source.id ? 'selected' : ''}`}
            onClick={() => onSelect(source)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="source-icon-container">
              {iconMap[source.icon] || <FaMusic className="source-icon" />}
            </div>

            <div className="source-info">
              <h4>{source.name}</h4>
              <p className="app-name">{source.app}</p>
              <div className="source-status">
                <span className={`status-badge ${source.isActive ? 'active' : 'idle'}`}>
                  {source.isActive ? '▶ Active' : '⏸ Idle'}
                </span>
                <span className="volume-badge">🔊 {source.volume}%</span>
              </div>
            </div>

            <div className="source-selector">
              <div className={`radio ${selected?.id === source.id ? 'checked' : ''}`}></div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default AudioSourcesList;
