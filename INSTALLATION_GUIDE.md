# 🛠️ Complete Installation Guide - Audio Solution

**Last Updated:** 2026-02-14
**Platform:** Windows 10/11
**Time Required:** 15-20 minutes

---

## 📋 Prerequisites Checklist

Before you start, verify you have:
- [ ] Windows 10 or Windows 11
- [ ] Administrator access (to install software)
- [ ] Internet connection
- [ ] About 500MB free disk space
- [ ] A modern web browser (Chrome, Firefox, Edge)

---

## 🎯 What We're Installing

1. **Node.js** - JavaScript runtime environment
2. **npm** - Package manager (comes with Node.js)
3. **Project Dependencies** - Via npm
4. **Audio Solution App** - All 3 components

---

## STEP 1: Download Node.js

### Method 1: Direct Download (Recommended)

**1. Go to Node.js Website**
- Open your browser and go to: **https://nodejs.org/**
- You'll see two options on the homepage

**2. Choose the Right Version**

```
⭐ RECOMMENDED: LTS (Long Term Support)
   - Current version: 22.x LTS
   - Stable, battle-tested
   - Best for production apps
   - Click the green button labeled "LTS"

❌ AVOID: Current (latest unstable)
   - Experimental features
   - May have bugs
   - Only for developers testing new features
```

**What the page looks like:**
```
┌─────────────────────────────────────┐
│ Node.js                             │
├─────────────────────────────────────┤
│ [20.x LTS]    [23.x Current]        │
│ Recommended    Latest Features       │
│ (green)        (gray)               │
└─────────────────────────────────────┘
```

**3. Click the LTS Green Button**
- A `.msi` file will download (e.g., `node-v20.10.0-x64.msi`)
- Wait for download to complete

---

## STEP 2: Install Node.js

### Installation Steps

**1. Run the Installer**
- Find the downloaded file (usually in `Downloads` folder)
- Double-click `node-v20.x.x-x64.msi` (or similar name)
- Windows may ask: "Do you want to allow this app to make changes?" → Click **Yes**

**2. Welcome Screen**
- You'll see: "Welcome to Node.js Setup Wizard"
- Click **Next >**

**3. License Agreement**
- Read the license (or skip)
- Check the box: ☑ "I accept the terms in the License Agreement"
- Click **Next >**

**4. Installation Location**
- Default path: `C:\Program Files\nodejs`
- This is fine - Click **Next >**

**5. Custom Setup**
- You'll see options for what to install
- Default selections are perfect:
  - ✅ Node.js runtime
  - ✅ npm package manager
  - ✅ Online documentation shortcuts
- Click **Next >**

**6. Tools for Native Modules**
- Screen says: "Tools for native modules"
- This allows advanced features
- You can skip: uncheck ☐ "Automatically install the necessary tools..."
- Click **Next >** (or check it if you have admin access and want everything)

**7. Ready to Install**
- Review the settings
- Click **Install**
- Installation progress will show...
- Takes 1-3 minutes

**8. Installation Complete**
- Click **Finish**
- Node.js is now installed!

---

## STEP 3: Verify Installation

### Open Command Prompt or PowerShell

**Option A: Command Prompt (cmd)**
1. Press `Windows Key` + `R`
2. Type: `cmd`
3. Press `Enter`

**Option B: PowerShell**
1. Press `Windows Key` + `X`
2. Select **Windows PowerShell** (or Terminal)

**Option C: Windows Terminal** (Recommended)
1. Press `Windows Key`
2. Type: `terminal`
3. Press `Enter`

### Verify Node.js Installation

**In the terminal, type these commands one by one:**

```bash
node --version
```
**Expected output:** `v20.10.0` (or similar version number)

```bash
npm --version
```
**Expected output:** `10.2.3` (or similar version number)

**✅ If you see version numbers, Node.js is installed correctly!**

---

## STEP 4: Navigate to Your Project

### Open Terminal at Project Location

**Option 1: Using Command Line**

**Windows Command Prompt:**
```bash
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution"
```

**PowerShell/Windows Terminal:**
```powershell
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution"
```

**Option 2: File Explorer Method**
1. Open File Explorer
2. Navigate to: `C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution`
3. Right-click in empty space
4. Select **Open in Terminal** (or **Open PowerShell here**)
5. Terminal opens at this location automatically

### Verify You're in the Right Folder

```bash
dir
```

**Expected output:**
```
Directory: C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----          2/14/2026  10:00 AM                backend
d-----          2/14/2026  10:00 AM                frontend
d-----          2/14/2026  10:00 AM                audio-agent
-a----          2/14/2026  10:00 AM           2000 README.md
-a----          2/14/2026  10:00 AM           3000 DEPLOYMENT_GUIDE.md
-a----          2/14/2026  10:00 AM           2000 GETTING_STARTED.md
```

✅ You're in the right place if you see `backend`, `frontend`, and `audio-agent` folders!

---

## STEP 5: Start the Backend Server

### Terminal 1 - Backend

**1. Navigate to backend:**
```bash
cd backend
```

**2. Install dependencies:**
```bash
npm install
```

**What happens:**
- npm downloads all required packages
- Shows progress: `added 150 packages in 35 seconds`
- Takes 30-60 seconds first time
- Creates a `node_modules` folder

**3. Start the server:**
```bash
npm run dev
```

**✅ SUCCESS! You should see:**
```
╔════════════════════════════════════════╗
║  Audio Solution - Backend API          ║
║  Version: 1.0.0                        ║
║  Status: Running                       ║
║  Environment: development              ║
╚════════════════════════════════════════╝
Backend running on port 5000 ✓
Database ready (using mock data)
Press Ctrl+C to stop
```

**✋ DON'T CLOSE THIS TERMINAL - Leave it running!**

---

## STEP 6: Start the Frontend Server

### Terminal 2 - Frontend (NEW TERMINAL!)

**⚠️ Important: Open a NEW terminal window (don't close the first one)**

**1. Navigate to project root:**
```bash
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution"
```

**2. Go to frontend:**
```bash
cd frontend
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the frontend:**
```bash
npm run dev
```

**✅ SUCCESS! You should see:**
```
╔════════════════════════════════════════╗
║  Audio Solution - Web Frontend         ║
║  Version: 1.0.0                        ║
║  Status: Running                       ║
╚════════════════════════════════════════╝
Frontend running on port 3000 ✓
http://localhost:3000

Press Ctrl+C to stop
```

**✋ DON'T CLOSE THIS TERMINAL - Leave it running!**

---

## STEP 7: Start the Audio Agent

### Terminal 3 - Audio Agent (ANOTHER NEW TERMINAL!)

**⚠️ Important: Open a THIRD terminal window**

**1. Navigate to project root:**
```bash
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution"
```

**2. Go to audio-agent:**
```bash
cd audio-agent
```

**3. Install dependencies:**
```bash
npm install
```

**4. Start the agent:**
```bash
npm run dev
```

**✅ SUCCESS! You should see:**
```
╔════════════════════════════════════════╗
║  Audio Solution - Local Agent          ║
║  Version: 1.0.0                        ║
║  Status: Running                       ║
╚════════════════════════════════════════╝
Audio Agent initialized
Connected to backend ✓
Press Ctrl+C to stop
```

**✋ DON'T CLOSE THIS TERMINAL - Leave it running!**

---

## STEP 8: Open the Application

### In Your Web Browser

**1. Open your web browser**
   - Google Chrome (recommended)
   - Microsoft Edge
   - Firefox
   - Any modern browser

**2. Go to this URL:**
```
http://localhost:3000
```

**3. You should see the login page!**

```
┌─────────────────────────────────────┐
│     🎵 Audio Solution               │
│     Route Your Audio with Ease       │
│                                     │
│     Email: [_____________]          │
│     Password: [____________]        │
│                                     │
│     [Login Button]                  │
│     Don't have account? Register →  │
└─────────────────────────────────────┘
```

---

## STEP 9: Create Your Account

### First-Time Registration

**1. Click "Create an account"** (or go to Register page)

**2. Fill in the form:**
```
Name:                 Your Name
Email:                your-email@example.com
Password:             password123
Confirm Password:     password123
```

**3. Click "Register"**

**4. You'll be redirected to login**

**5. Login with your credentials:**
```
Email:    your-email@example.com
Password: password123
```

**6. Click "Login"**

---

## STEP 10: Test the Dashboard

### Verify Everything Works

**When logged in, you should see:**

✅ **Left Panel - Audio Sources**
- Spotify (if running)
- Chrome (if running)
- Discord (if running)
- VLC (if running)

✅ **Left Panel - Output Devices**
- Speakers
- Bluetooth devices
- USB headsets
- HDMI devices

✅ **Middle Panel - Routing Control**
- Select input source
- Select output device
- "Create Route" button

✅ **Right Panel - Active Routes**
- List of created routes
- Play/Pause controls
- Delete buttons

✅ **Top Panel - Metrics**
- CPU usage percentage
- Memory usage (MB)
- Active routes count
- Latency (ms)

**✅ If you see all of this, your installation is SUCCESSFUL!**

---

## ⚠️ Troubleshooting

### Problem 1: "npm: command not found"

**Solution:**
- Node.js wasn't installed correctly
- Restart your computer
- Try Step 1-2 again

**Or:**
- Manually add Node.js to PATH:
  1. Press `Windows Key` + `R`
  2. Type: `sysdm.cpl`
  3. Go to **Advanced** tab
  4. Click **Environment Variables**
  5. Under "System variables", find "Path"
  6. Click **Edit**
  7. Click **New**
  8. Add: `C:\Program Files\nodejs`
  9. Click **OK** three times
  10. Restart terminal

### Problem 2: "Port 5000 already in use"

**Solution:**
```bash
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace XXXX with the PID)
taskkill /PID XXXX /F

# Or change the port in backend/.env:
PORT=5001
```

### Problem 3: "Port 3000 already in use"

**Solution:**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID XXXX /F
```

### Problem 4: "npm ERR! code EACCES"

**Solution:**
- Run terminal as Administrator
- Right-click terminal → **Run as administrator**
- Try `npm install` again

### Problem 5: Blank page at http://localhost:3000

**Solution:**
1. Press `Ctrl+Shift+Delete` to clear browser cache
2. Or open in Incognito/Private window
3. Or try a different browser

### Problem 6: Cannot connect to backend

**Solution:**
1. Verify backend is running (check Terminal 1)
2. Check `.env` files have correct URLs:
   - `backend/.env`: `PORT=5000`
   - `frontend/.env`: `REACT_APP_API_URL=http://localhost:5000`
3. Restart frontend (Ctrl+C, then `npm run dev` again)

### Problem 7: "Command not found: npm run dev"

**Solution:**
1. Make sure you're in the correct folder:
   ```bash
   pwd  # Shows current directory
   ```
2. Verify `package.json` exists:
   ```bash
   dir package.json
   ```
3. If not found, navigate to correct folder:
   ```bash
   cd backend  # For backend
   cd frontend  # For frontend
   cd audio-agent  # For audio agent
   ```

---

## 🎉 You're Done!

### You Now Have:

✅ Node.js v20+ installed
✅ Backend API running on port 5000
✅ Frontend app running on port 3000
✅ Audio Agent running
✅ Working login/register system
✅ Dashboard with audio sources & devices
✅ Routing system ready to use

### Next Steps:

1. **Test the app** (following GETTING_STARTED.md)
2. **Create routes** (connect audio sources to devices)
3. **Check metrics** (CPU, memory, latency)
4. **Deploy to cloud** (follow DEPLOYMENT_GUIDE.md)
5. **Share with users** (once tested)

---

## 📊 Terminal Commands Reference

### Backend
```bash
cd backend
npm install          # First time only
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Run production build
npm test             # Run tests
```

### Frontend
```bash
cd frontend
npm install          # First time only
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests
```

### Audio Agent
```bash
cd audio-agent
npm install          # First time only
npm run dev          # Start in development
npm run build        # Build application
npm run dist         # Create installer (.exe)
```

### Debugging
```bash
# Check what's using a port
netstat -ano | findstr :XXXX

# Kill a process by PID
taskkill /PID XXXX /F

# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# View running processes
tasklist

# See current directory
pwd

# List files
dir
```

---

## 📞 Still Having Issues?

1. **Check GETTING_STARTED.md** - Common problems
2. **Check README.md** - Architecture details
3. **Check DEPLOYMENT_GUIDE.md** - Advanced setup
4. **Check PROJECT_STATUS.md** - Overall project status

---

## ✨ Verification Checklist

- [ ] Node.js v16+ installed (`node --version` shows version)
- [ ] npm installed (`npm --version` shows version)
- [ ] All 3 terminals open with running servers
- [ ] Backend shows "running on port 5000"
- [ ] Frontend shows "running on port 3000"
- [ ] Audio Agent shows "running"
- [ ] Browser shows login page at http://localhost:3000
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard loads with audio sources & devices
- [ ] Metrics panel shows values
- [ ] No red errors in browser console (F12)

**If all checked ✅, you're ready to use Audio Solution!**

---

**Ready? Let's go! 🚀**

Next: Follow GETTING_STARTED.md for first test

