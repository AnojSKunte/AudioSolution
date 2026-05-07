@echo off
REM Audio Solution - Local Development Setup
REM This script sets up and runs the app locally with real audio detection

echo.
echo ========================================
echo   Audio Solution - Local Setup
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

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

REM Create .env file if it doesn't exist
cd ..
if not exist backend\.env (
    echo Creating backend/.env file...
    (
        echo NODE_ENV=development
        echo PORT=5000
        echo JWT_SECRET=dev-secret-key-change-in-production
        echo DATABASE_URL=postgresql://user:password@localhost:5432/audio_solution
    ) > backend\.env
    echo ✓ Created backend/.env
)

echo.
echo ========================================
echo   READY TO START!
echo ========================================
echo.
echo To start the application, open TWO terminals:
echo.
echo TERMINAL 1 - Start Backend:
echo   cd backend
echo   npm start
echo.
echo TERMINAL 2 - Start Frontend:
echo   cd frontend
echo   npm start
echo.
echo Then open: http://localhost:3000
echo.
echo The backend will detect your REAL audio devices!
echo.
pause
