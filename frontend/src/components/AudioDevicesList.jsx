import React from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaHeadphones, FaBluetooth, FaVolumeDown } from 'react-icons/fa';

const iconMap = {
  speaker: <FaVolumeUp className="device-icon" />,
  headset: <FaHeadphones className="device-icon" />,
  bluetooth: <FaBluetooth className="device-icon" />,
  monitor: <FaVolumeDown className="device-icon" />
};

function AudioDevicesList({ devices, selected, onSelect }) {
  return (
    <div className="devices-list">
      {devices.length === 0 ? (
        <div className="empty-state">
          <p>No output devices found</p>
          <small>Connect an audio device</small>
        </div>
      ) : (
        devices.map((device, index) => (
          <motion.div
            key={device.id}
            className={`device-item ${selected?.id === device.id ? 'selected' : ''} ${!device.isConnected ? 'disabled' : ''}`}
            onClick={() => device.isConnected && onSelect(device)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: device.isConnected ? 1.02 : 1 }}
          >
            <div className="device-icon-container">
              {iconMap[device.icon] || <FaVolumeUp className="device-icon" />}
              {device.isDefault && <span className="default-badge">Default</span>}
            </div>

            <div className="device-info">
              <h4>{device.name}</h4>
              <p className="device-type">{device.type}</p>
              <div className="device-status">
                {device.isConnected ? (
                  <span className="status-badge connected">✓ Connected</span>
                ) : (
                  <span className="status-badge disconnected">✗ Disconnected</span>
                )}
                {device.isConnected && <span className="volume-badge">🔊 {device.volume}%</span>}
              </div>
            </div>

            <div className="device-selector">
              <div className={`radio ${selected?.id === device.id ? 'checked' : ''}`}></div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default AudioDevicesList;
