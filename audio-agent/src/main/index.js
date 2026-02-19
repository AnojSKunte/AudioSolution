/**
 * Audio Solution - Local Agent (Electron)
 * Runs on user's machine to handle WASAPI audio routing
 */

const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');
const AudioEngine = require('../audio-engine/AudioEngine');

let tray;
let mainWindow;
let audioEngine;

const API_URL = process.env.API_URL || 'http://localhost:5000';

// Create main window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, '../../assets/icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, '../../ui/index.html'));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Create tray icon
function createTray() {
  const trayIcon = path.join(__dirname, '../../assets/tray-icon.png');

  tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open Dashboard',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        } else {
          createWindow();
        }
      }
    },
    { type: 'separator' },
    {
      label: 'Status: Connected',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Settings',
      click: () => {
        // Open settings
      }
    },
    {
      label: 'Exit',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    if (mainWindow) {
      mainWindow.show();
    } else {
      createWindow();
    }
  });
}

// Initialize Audio Engine
function initAudioEngine() {
  audioEngine = new AudioEngine({
    apiUrl: API_URL,
    onStatusChange: (status) => {
      if (mainWindow) {
        mainWindow.webContents.send('audio-status', status);
      }
    },
    onError: (error) => {
      console.error('Audio Engine Error:', error);
      if (mainWindow) {
        mainWindow.webContents.send('audio-error', error);
      }
    }
  });

  audioEngine.start();
}

// IPC Handlers
ipcMain.handle('get-audio-inputs', async () => {
  return audioEngine.getInputs();
});

ipcMain.handle('get-audio-outputs', async () => {
  return audioEngine.getOutputs();
});

ipcMain.handle('create-route', async (event, { inputId, outputId, volume }) => {
  return audioEngine.createRoute(inputId, outputId, volume);
});

ipcMain.handle('delete-route', async (event, routeId) => {
  return audioEngine.deleteRoute(routeId);
});

ipcMain.handle('get-status', async () => {
  return audioEngine.getStatus();
});

// App lifecycle
app.on('ready', () => {
  createWindow();
  createTray();
  initAudioEngine();

  console.log(`
╔════════════════════════════════════════╗
║  Audio Solution - Local Agent          ║
║  Version: 1.0.0                        ║
║  Status: Running                       ║
╚════════════════════════════════════════╝
  `);
});

app.on('window-all-closed', () => {
  // On macOS, keep app running in tray
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('quit', () => {
  if (audioEngine) {
    audioEngine.stop();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
