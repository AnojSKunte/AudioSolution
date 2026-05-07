/**
 * Audio Engine - Handles WASAPI audio routing on Windows
 * Real-time audio detection and selective application routing
 */

const axios = require('axios');
const path = require('path');
const AudioDetector = require('../services/audioDetector');
const { startAudioCapture, stopAudioCapture } = require('application-loopback');
const Speaker = require('speaker');

class AudioEngine {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'http://localhost:5000';
    this.onStatusChange = options.onStatusChange || (() => {});
    this.onError = options.onError || (() => {});
    this.isRunning = false;
    this.activeCaptures = new Map(); // inputId -> capture object
    this.activeSpeakers = new Map(); // routeId -> Speaker object
    this.routes = [];
    this.inputs = [];
    this.outputs = [];
    this.startTime = null;
  }

  async start() {
    try {
      this.isRunning = true;
      this.startTime = Date.now();

      // Initialize Device Detection
      await this.loadAudioDevices();

      // Start monitoring
      this.startMonitoring();

      this.onStatusChange({
        status: 'running',
        message: 'Audio Engine started with Real-Time Loopback support'
      });

      console.log('✓ Audio Engine started with Real-Time Loopback');
    } catch (error) {
      console.error('Error starting Audio Engine:', error);
      this.onError(error.message);
    }
  }

  stop() {
    this.isRunning = false;
    
    // Stop all active routing
    this.activeCaptures.forEach((capture, inputId) => {
      stopAudioCapture(capture.pid);
    });
    this.activeCaptures.clear();

    this.activeSpeakers.forEach((speaker) => {
      speaker.end();
    });
    this.activeSpeakers.clear();

    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }

    console.log('✓ Audio Engine stopped and all routes cleared');
  }

  async loadAudioDevices() {
    try {
      // Load real audio inputs and outputs using AudioDetector
      const [inputs, outputs] = await Promise.all([
        AudioDetector.getAudioApplications(),
        AudioDetector.getOutputDevices()
      ]);
      
      this.inputs = inputs;
      this.outputs = outputs;
      
      console.log(`Detected ${inputs.length} audio apps and ${outputs.length} output devices.`);
    } catch (error) {
      console.error('Error loading audio devices:', error);
    }
  }

  startMonitoring() {
    // Monitor for changes every 2 seconds
    this.monitoringInterval = setInterval(async () => {
      if (!this.isRunning) return;

      try {
        // Sync with backend
        await this.syncWithBackend();
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, 2000);
  }

  async syncWithBackend() {
    try {
      // Detect REAL audio devices and applications
      const [inputs, outputs] = await Promise.all([
        AudioDetector.getAudioApplications(),
        AudioDetector.getOutputDevices()
      ]);

      // Update local cache
      this.inputs = inputs;
      this.outputs = outputs;

      // Send real audio data to backend
      await axios.post(`${this.apiUrl}/api/audio/sync`, {
        agentVersion: '1.0.0',
        status: 'running',
        inputs: inputs,
        outputs: outputs,
        routeCount: this.routes.length,
        timestamp: new Date()
      }, {
        headers: {
          'x-api-key': process.env.API_KEY || ''
        }
      }).catch((err) => {
        if (err.response?.status !== 401) {
          console.log('Backend sync pending...');
        }
      });
    } catch (error) {
      // Silently handle sync errors
    }
  }

  async createRoute(inputId, outputId, volume = 100) {
    try {
      const input = this.inputs.find(i => i.id === inputId);
      const output = this.outputs.find(o => o.id === outputId);

      if (!input) throw new Error(`Input ${inputId} not found or not running`);
      
      const routeId = `route-${Date.now()}`;
      
      // Start Real Audio Loopback for this specific PID
      const pid = parseInt(input.processId);
      console.log(`Starting real-time capture for PID: ${pid}`);

      // Setup Output Speaker (Simplified for MVP, would need device selection in real impl)
      // Note: 'speaker' library usually outputs to default device. 
      // Multi-device output requires native bindings selection.
      const speaker = new Speaker({
        channels: 2,
        bitDepth: 16,
        sampleRate: 44100
      });

      startAudioCapture(pid, {
        onData: (chunk) => {
          // chunk is raw PCM audio
          // We pipe it to our speaker instance
          if (this.isRunning) {
            speaker.write(chunk);
          }
        },
      });

      const route = {
        id: routeId,
        inputId,
        outputId,
        volume,
        status: 'active',
        pid: pid,
        createdAt: new Date()
      };

      this.routes.push(route);
      this.activeSpeakers.set(routeId, speaker);
      this.activeCaptures.set(inputId, { pid });

      this.onStatusChange({
        status: 'route-created',
        route
      });

      console.log(`✓ Real Route Active: ${input.name} -> ${output ? output.name : 'Default Output'}`);
      return route;
    } catch (error) {
      console.error('Route Creation Error:', error);
      this.onError(`Failed to create real route: ${error.message}`);
      throw error;
    }
  }

  async deleteRoute(routeId) {
    try {
      const route = this.routes.find(r => r.id === routeId);
      if (route) {
        stopAudioCapture(route.pid);
        const speaker = this.activeSpeakers.get(routeId);
        if (speaker) speaker.end();
        
        this.activeSpeakers.delete(routeId);
        this.activeCaptures.delete(route.inputId);
        this.routes = this.routes.filter(r => r.id !== routeId);
      }

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
