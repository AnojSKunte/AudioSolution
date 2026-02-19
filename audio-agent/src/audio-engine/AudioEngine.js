/**
 * Audio Engine - Handles WASAPI audio routing on Windows
 */

const axios = require('axios');

class AudioEngine {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'http://localhost:5000';
    this.onStatusChange = options.onStatusChange || (() => {});
    this.onError = options.onError || (() => {});
    this.isRunning = false;
    this.routes = [];
    this.inputs = [];
    this.outputs = [];
    this.startTime = null;
  }

  async start() {
    try {
      this.isRunning = true;
      this.startTime = Date.now();

      // Initialize WASAPI (Windows Audio Session API)
      this.initWASAPI();

      // Start monitoring
      this.startMonitoring();

      this.onStatusChange({
        status: 'running',
        message: 'Audio Engine started successfully'
      });

      console.log('✓ Audio Engine started');
    } catch (error) {
      console.error('Error starting Audio Engine:', error);
      this.onError(error.message);
    }
  }

  stop() {
    this.isRunning = false;
    // Clean up routes
    this.routes.forEach(route => this.deleteRoute(route.id));
    console.log('✓ Audio Engine stopped');
  }

  initWASAPI() {
    try {
      // In a real implementation, this would use native bindings
      // For now, we'll use mock implementation that's production-ready structure
      this.wasapi = {
        initialized: true,
        sessionManager: {},
        deviceEnumerator: {}
      };

      this.loadAudioDevices();
    } catch (error) {
      console.error('WASAPI initialization error:', error);
      throw error;
    }
  }

  loadAudioDevices() {
    // Load audio inputs and outputs
    // This would normally enumerate via WASAPI
    this.inputs = [
      {
        id: 'input-1',
        name: 'Spotify',
        app: 'Spotify',
        processId: 1234,
        isActive: true
      },
      {
        id: 'input-2',
        name: 'Chrome',
        app: 'Chrome',
        processId: 5678,
        isActive: true
      }
    ];

    this.outputs = [
      {
        id: 'output-1',
        name: 'Speakers (JBL Flip 4)',
        type: 'Speaker',
        isDefault: true,
        isConnected: true
      },
      {
        id: 'output-2',
        name: 'Bluetooth: JBL Flip 4',
        type: 'Bluetooth',
        isConnected: true
      }
    ];
  }

  startMonitoring() {
    // Monitor for changes every 2 seconds
    this.monitoringInterval = setInterval(async () => {
      if (!this.isRunning) return;

      try {
        // Check device status
        this.checkDeviceStatus();

        // Sync with backend
        await this.syncWithBackend();
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, 2000);
  }

  checkDeviceStatus() {
    // Check if devices are still connected
    // This would normally use WASAPI device enumeration
  }

  async syncWithBackend() {
    try {
      // Send heartbeat to backend
      await axios.post(`${this.apiUrl}/api/audio/agent-heartbeat`, {
        agentVersion: '1.0.0',
        status: 'running',
        routeCount: this.routes.length,
        timestamp: new Date()
      }).catch(() => {
        // Gracefully handle backend unavailable
      });
    } catch (error) {
      // Silently handle sync errors
    }
  }

  async createRoute(inputId, outputId, volume = 100) {
    try {
      const route = {
        id: `route-${Date.now()}`,
        inputId,
        outputId,
        volume,
        status: 'active',
        createdAt: new Date()
      };

      this.routes.push(route);

      this.onStatusChange({
        status: 'route-created',
        route
      });

      return route;
    } catch (error) {
      this.onError(`Failed to create route: ${error.message}`);
      throw error;
    }
  }

  async deleteRoute(routeId) {
    try {
      this.routes = this.routes.filter(r => r.id !== routeId);

      this.onStatusChange({
        status: 'route-deleted',
        routeId
      });

      return true;
    } catch (error) {
      this.onError(`Failed to delete route: ${error.message}`);
      throw error;
    }
  }

  getInputs() {
    return this.inputs;
  }

  getOutputs() {
    return this.outputs;
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      uptime: this.startTime ? Date.now() - this.startTime : 0,
      routes: this.routes.length,
      devices: {
        inputs: this.inputs.length,
        outputs: this.outputs.length
      }
    };
  }
}

module.exports = AudioEngine;
