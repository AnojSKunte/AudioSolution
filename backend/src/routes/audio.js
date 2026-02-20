/**
 * Audio Sources & Devices Routes
 */

const express = require('express');
const router = express.Router();
const AudioDetector = require('../services/audioDetector');

/**
 * Get available audio input sources
 * GET /api/audio/inputs
 */
router.get('/inputs', async (req, res) => {
  try {
    // Get real audio applications running on the system
    const inputs = await AudioDetector.getAudioApplications();

    res.json({
      status: 'success',
      inputs,
      count: inputs.length,
      source: 'Real system detection'
    });
  } catch (error) {
    console.error('Error fetching audio inputs:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get available audio output devices
 * GET /api/audio/outputs
 */
router.get('/outputs', async (req, res) => {
  try {
    // Get real audio output devices from the system
    const outputs = await AudioDetector.getOutputDevices();

    res.json({
      status: 'success',
      outputs,
      count: outputs.length,
      source: 'Real system detection'
    });
  } catch (error) {
    console.error('Error fetching audio outputs:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get real-time audio status
 * GET /api/audio/status
 */
router.get('/status', async (req, res) => {
  try {
    const status = await AudioDetector.getAudioStatus();
    res.json(status);
  } catch (error) {
    console.error('Error fetching audio status:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
