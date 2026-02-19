/**
 * Audio Sources & Devices Routes
 */

const express = require('express');
const router = express.Router();

/**
 * Get available audio input sources
 * GET /api/audio/inputs
 */
router.get('/inputs', (req, res) => {
  try {
    // Mock data - will be provided by Electron agent in real implementation
    const inputs = [
      {
        id: 'spotify-pid-1234',
        name: 'Spotify',
        app: 'Spotify',
        processId: 1234,
        isActive: true,
        volume: 80,
        icon: 'spotify'
      },
      {
        id: 'chrome-pid-5678',
        name: 'Google Chrome (YouTube)',
        app: 'Chrome',
        processId: 5678,
        isActive: true,
        volume: 60,
        icon: 'chrome'
      },
      {
        id: 'discord-pid-9012',
        name: 'Discord',
        app: 'Discord',
        processId: 9012,
        isActive: false,
        volume: 0,
        icon: 'discord'
      },
      {
        id: 'vlc-pid-3456',
        name: 'VLC Media Player',
        app: 'VLC',
        processId: 3456,
        isActive: true,
        volume: 100,
        icon: 'vlc'
      }
    ];

    res.json({
      status: 'success',
      inputs,
      count: inputs.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get available audio output devices
 * GET /api/audio/outputs
 */
router.get('/outputs', (req, res) => {
  try {
    // Mock data - will be provided by Electron agent in real implementation
    const outputs = [
      {
        id: 'device-1',
        name: 'Speakers (JBL Flip 4)',
        type: 'Speaker',
        isDefault: true,
        isConnected: true,
        volume: 100,
        icon: 'speaker'
      },
      {
        id: 'device-2',
        name: 'Bluetooth: JBL Flip 4',
        type: 'Bluetooth',
        isDefault: false,
        isConnected: true,
        volume: 85,
        icon: 'bluetooth'
      },
      {
        id: 'device-3',
        name: 'Headphones (USB)',
        type: 'USB',
        isDefault: false,
        isConnected: true,
        volume: 70,
        icon: 'headset'
      },
      {
        id: 'device-4',
        name: 'HDMI: Monitor',
        type: 'HDMI',
        isDefault: false,
        isConnected: false,
        volume: 50,
        icon: 'monitor'
      }
    ];

    res.json({
      status: 'success',
      outputs,
      count: outputs.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get real-time audio status
 * GET /api/audio/status
 */
router.get('/status', (req, res) => {
  try {
    const status = {
      agentConnected: true,
      agentVersion: '1.0.0',
      osVersion: 'Windows 11',
      timestamp: new Date().toISOString(),
      metrics: {
        cpuUsage: 32.5,
        memoryUsage: 156.3,
        activeRoutes: 2,
        latency: 22
      }
    };

    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
