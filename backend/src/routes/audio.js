/**
 * Audio Sources & Devices Routes - Multi-User Version
 */

const express = require('express');
const router = express.Router();
const AudioDetector = require('../services/audioDetector');
const userService = require('../services/userService');
const { authenticate, getUserId } = require('../middleware/auth');

/**
 * Get current user's audio input sources
 * GET /api/audio/inputs
 * Requires: User token or Agent API key
 */
router.get('/inputs', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);

    // If request is from agent (has API key), detect real audio
    if (req.agent) {
      const inputs = await AudioDetector.getAudioApplications();
      userService.updateUserAudioApps(userId, inputs);

      return res.json({
        status: 'success',
        inputs,
        count: inputs.length,
        source: 'Real system detection (Agent)',
        userId
      });
    }

    // If request is from user (has token), return cached audio
    const inputs = userService.getUserAudioApps(userId);
    res.json({
      status: 'success',
      inputs,
      count: inputs.length,
      source: 'Cached from agent',
      userId
    });
  } catch (error) {
    console.error('Error fetching audio inputs:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get current user's audio output devices
 * GET /api/audio/outputs
 * Requires: User token or Agent API key
 */
router.get('/outputs', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);

    // If request is from agent (has API key), detect real audio
    if (req.agent) {
      const outputs = await AudioDetector.getOutputDevices();
      userService.updateUserAudioDevices(userId, outputs);

      return res.json({
        status: 'success',
        outputs,
        count: outputs.length,
        source: 'Real system detection (Agent)',
        userId
      });
    }

    // If request is from user (has token), return cached audio
    const outputs = userService.getUserAudioDevices(userId);
    res.json({
      status: 'success',
      outputs,
      count: outputs.length,
      source: 'Cached from agent',
      userId
    });
  } catch (error) {
    console.error('Error fetching audio outputs:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get real-time audio status
 * GET /api/audio/status
 * Requires: User token or Agent API key
 */
router.get('/status', authenticate, async (req, res) => {
  try {
    const userId = getUserId(req);
    const status = await AudioDetector.getAudioStatus();

    res.json({
      ...status,
      userId,
      agentAuthenticated: !!req.agent
    });
  } catch (error) {
    console.error('Error fetching audio status:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Real-time sync from Electron agent
 * POST /api/audio/sync
 * Requires: Agent API key
 * The agent sends REAL audio data every 2 seconds
 */
router.post('/sync', authenticate, (req, res) => {
  try {
    const userId = getUserId(req);

    // Only agents can sync (not regular web users)
    if (!req.agent) {
      return res.status(401).json({ error: 'Only agents can sync audio data' });
    }

    const { inputs, outputs, timestamp } = req.body;

    // Update user's audio devices with REAL data from agent
    if (inputs && Array.isArray(inputs)) {
      userService.updateUserAudioApps(userId, inputs);
    }

    if (outputs && Array.isArray(outputs)) {
      userService.updateUserAudioDevices(userId, outputs);
    }

    res.json({
      status: 'synced',
      userId,
      inputsReceived: inputs ? inputs.length : 0,
      outputsReceived: outputs ? outputs.length : 0,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error syncing audio:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
