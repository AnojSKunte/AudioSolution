@echo off
REM Audio Solution - Electron Audio Agent Startup
REM This runs on your local machine to detect real audio devices

echo.
echo ========================================
echo   Audio Solution - Audio Agent
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Navigate to audio-agent directory
cd audio-agent

REM Check if dependencies are installed
if not exist node_modules (
    echo Installing Electron Audio Agent dependencies...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed
    echo.
)

REM Check if native modules are built
if not exist node_modules\electron\dist\electron.exe (
    echo Installing Electron...
    call npm install --save-dev electron
)

echo.
echo ========================================
echo   STARTING AUDIO AGENT
echo ========================================
echo.
echo API Server: https://sea-turtle-app-f52qx.ondigitalocean.app
echo Status: Connecting to backend...
echo.
echo Detecting real audio devices on your system...
echo This will run in the system tray and detect:
echo  • Audio input sources (Spotify, Chrome, Discord, etc.)
echo  • Audio output devices (Speakers, Headphones, Bluetooth, etc.)
echo.
echo IMPORTANT:
echo  1. Keep this window open (minimized is OK)
echo  2. The agent will show in the system tray (bottom right)
echo  3. Your friends can access the dashboard at:
echo     https://sea-turtle-app-f52qx.ondigitalocean.app
echo.
echo ========================================
echo.

REM Start the Electron app
call npm start

pause
