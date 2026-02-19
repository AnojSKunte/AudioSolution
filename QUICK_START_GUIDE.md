# ⚡ Quick Start - Audio Solution (5 Minutes)

**Time Required:** 5 minutes
**Requirement:** Node.js must be installed first

---

## 📋 Pre-Startup Checklist

Before starting, verify:

- [ ] Node.js installed (`node --version` shows v16+)
- [ ] npm installed (`npm --version` shows v8+)
- [ ] You have 3 terminal windows ready (or can open them)
- [ ] You're in: `C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution`

---

## 🎯 The Plan

We're starting **3 independent servers**:

```
Terminal 1  → Backend API (Port 5000)
Terminal 2  → Frontend Web (Port 3000)
Terminal 3  → Audio Agent (Local Service)
```

All 3 must run simultaneously. They communicate with each other.

---

# ▶️ START HERE

## TERMINAL 1: Backend Server

**Open Command Prompt or PowerShell**

### Step 1: Navigate to Backend
```bash
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution\backend"
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

**You'll see:**
```
up to date, audited 156 packages
...
added 156 packages in 45s
```

**⏳ Takes 30-60 seconds**

### Step 3: Start Backend Server
```bash
npm run dev
```

### ✅ SUCCESS - You should see:

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

[Listening on http://localhost:5000]
```

### 🛑 DO NOT CLOSE THIS TERMINAL!

**Leave it running while you open Terminal 2...**

---

## TERMINAL 2: Frontend Server

**⭐ IMPORTANT: Open a NEW terminal window (don't close Terminal 1)**

### Step 1: Navigate to Frontend
```bash
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution\frontend"
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

**You'll see:**
```
added 87 packages in 52s
...
audited 87 packages
```

**⏳ Takes 45-90 seconds**

### Step 3: Start Frontend Server
```bash
npm run dev
```

### ✅ SUCCESS - You should see:

```
╔════════════════════════════════════════╗
║  Audio Solution - Web Frontend         ║
║  Version: 1.0.0                        ║
║  Status: Running                       ║
╚════════════════════════════════════════╝

Frontend running on port 3000 ✓

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help

[Vite] Server started successfully
```

### 🛑 DO NOT CLOSE THIS TERMINAL!

**Leave it running while you open Terminal 3...**

---

## TERMINAL 3: Audio Agent

**⭐ IMPORTANT: Open a THIRD terminal window (keep Terminals 1 & 2 running)**

### Step 1: Navigate to Audio Agent
```bash
cd "C:\Users\anojs\OneDrive\Desktop\Claude_CLI\Audio Solution\audio-agent"
```

### Step 2: Install Dependencies (First Time Only)
```bash
npm install
```

**You'll see:**
```
added 45 packages in 30s
...
```

**⏳ Takes 20-45 seconds**

### Step 3: Start Audio Agent
```bash
npm run dev
```

### ✅ SUCCESS - You should see:

```
╔════════════════════════════════════════╗
║  Audio Solution - Local Agent          ║
║  Version: 1.0.0                        ║
║  Status: Running                       ║
╚════════════════════════════════════════╝

Audio Agent initialized
Connected to backend ✓
Monitoring system audio...

Press Ctrl+C to stop
```

### 🛑 DO NOT CLOSE THIS TERMINAL!

**All 3 servers must stay running!**

---

# 🌐 OPEN THE APPLICATION

## Open Your Web Browser

**Once all 3 terminals show "Running", go to:**

```
http://localhost:3000
```

**You should see:**

```
┌─────────────────────────────────┐
│      🎵 Audio Solution          │
│  Route Your Audio with Ease     │
│                                 │
│  Welcome Back!                  │
│                                 │
│  Email: [_______________]       │
│  Password: [____________]       │
│                                 │
│  [Login]          [Register]    │
│                                 │
│  Don't have an account?         │
│  Create one now →               │
└─────────────────────────────────┘
```

---

# ✍️ CREATE YOUR ACCOUNT

## Step 1: Click "Create an account" or "Register"

## Step 2: Fill in the Form

```
Full Name:          John Doe
Email:              john@example.com
Password:           password123
Confirm Password:   password123

[Register Button]
```

## Step 3: Click Register

**You'll see:**
```
✓ Account created successfully!
Redirecting to login...
```

## Step 4: Login

```
Email:              john@example.com
Password:           password123

[Login Button]
```

## Step 5: Enter Dashboard

**✅ You're now logged in! You should see:**

```
┌──────────────────────────────────────────┐
│ 🎵 Audio Solution - Dashboard            │
├──────────────────────────────────────────┤
│                                          │
│  LEFT COLUMN          MIDDLE      RIGHT  │
│  ┌──────────────┐     ┌────────┐ ┌────┐ │
│  │ Audio Sources│     │ Select │ │Actv│ │
│  │ ──────────── │     │  i→o  │ │Rout│ │
│  │ • Spotify ◯  │     │        │ │────│ │
│  │ • Chrome  ◯  │     │ Create│ │    │ │
│  │ • Discord ◯  │     │ Route │ │    │ │
│  │ • VLC     ◯  │     └────────┘ └────┘ │
│  │              │                       │
│  │ Output Dev.  │     METRICS:         │
│  │ ──────────── │     CPU: 12%         │
│  │ • Speakers ◉ │     RAM: 145MB       │
│  │ • Bluetooth◯ │     Routes: 0        │
│  │ • USB     ◯  │     Latency: 5ms    │
│  └──────────────┘                      │
└──────────────────────────────────────────┘
```

---

# ✅ VERIFICATION CHECKLIST

**In your browser, verify you can see:**

- [ ] Login/Register page loads
- [ ] Can create new account
- [ ] Can login with credentials
- [ ] Dashboard displays with 3 columns
- [ ] **Left column:** Audio Sources (Spotify, Chrome, Discord, VLC)
- [ ] **Left column:** Output Devices (Speakers, Bluetooth, USB, HDMI)
- [ ] **Middle column:** Routing Control section
- [ ] **Right column:** Active Routes section
- [ ] **Top:** Metrics panel (CPU, Memory, Routes, Latency)
- [ ] **Top:** User profile with logout button
- [ ] Settings page link

**If all of these work, your installation is SUCCESSFUL! 🎉**

---

# 🎮 TEST THE APPLICATION

## Create Your First Route

### Step 1: Select Input Source
- Click on **Spotify** in the "Audio Sources" list
- It should highlight in blue

### Step 2: Select Output Device
- Click on **Speakers** in the "Output Devices" list
- It should highlight in blue

### Step 3: Create Route
- Click the **"Create Route"** button
- You should see a confirmation message

### Step 4: Verify Route Created
- Look at the **"Active Routes"** section on the right
- You should see your new route:
  ```
  Spotify → Speakers
  Status: Active
  Created: Just now
  ```

### Step 5: Test Delete
- Click the **delete/trash icon** on your route
- Route disappears from the list

---

# 📊 CHECK THE METRICS

**Look at the top right of the dashboard:**

```
Performance Metrics
───────────────────
CPU Usage: 12%
Memory: 145 MB
Active Routes: 0
Latency: 5ms
```

These update every 2 seconds automatically.

---

# 🔧 TROUBLESHOOTING

### Problem: Backend won't start

```
Error: listen EADDRINUSE :::5000
```

**Solution:**
- Port 5000 is in use by another app
- Open a new terminal and run:
  ```bash
  netstat -ano | findstr :5000
  taskkill /PID XXXX /F
  ```
- Then try `npm run dev` again

---

### Problem: Frontend blank page

**Solution:**
- Clear browser cache: `Ctrl+Shift+Delete`
- Or open in Incognito window
- Or refresh: `Ctrl+R`
- Check browser console (`F12`) for errors

---

### Problem: Can't login

**Solution:**
- Make sure you registered first
- Check email spelling
- Try test account: `test@example.com` / `password123`
- Check browser console for errors (`F12`)

---

### Problem: No audio sources showing

**Solution (for now):**
- This is mock data (shows Spotify, Chrome, Discord, VLC)
- Real audio capture requires WASAPI integration
- Currently showing demo sources to test the UI

---

### Problem: One terminal closed

**Solution:**
- If you close Terminal 1 (Backend): Frontend and Agent stop working
- If you close Terminal 2 (Frontend): You can't access the web app
- If you close Terminal 3 (Agent): Some features won't work

**Fix: Restart all 3 terminals**

---

# 🎉 SUCCESS!

**You now have:**

✅ Backend API running on http://localhost:5000
✅ Frontend web app running on http://localhost:3000
✅ Local audio agent running and monitoring
✅ User authentication working (register/login)
✅ Dashboard with audio sources and devices
✅ Route management system
✅ Real-time metrics display

---

# 📚 NEXT STEPS

## Option 1: Test More Features
- [ ] Create multiple routes
- [ ] Test settings page
- [ ] Test logout/login
- [ ] Check metrics update in real-time

## Option 2: Deploy to Cloud
- Follow: **DEPLOYMENT_GUIDE.md**
- Deploy to Heroku, DigitalOcean, or AWS
- Get a live URL for testing

## Option 3: Share with Users
- Once tested, share the GitHub link
- Or deploy and share the web URL
- Users can access from anywhere

## Option 4: Continue Development
- Add real WASAPI integration (capture actual audio)
- Add payment system
- Add more features

---

# 💡 TIPS

1. **Keep all 3 terminals open** - The app needs all 3 running
2. **Check the logs** - Look at the terminal output for errors
3. **Use incognito window** - Helps bypass browser cache
4. **Check browser console** - Press `F12` to see errors
5. **Refresh page** - Press `Ctrl+R` if something looks wrong

---

# 🛑 STOPPING THE APPLICATION

When you want to stop:

**In Terminal 1:** Press `Ctrl+C`
**In Terminal 2:** Press `Ctrl+C`
**In Terminal 3:** Press `Ctrl+C`

All servers will shut down cleanly.

---

# 📞 HELP

- **Questions?** Check README.md
- **Deployment?** Check DEPLOYMENT_GUIDE.md
- **Getting started?** Check GETTING_STARTED.md
- **Installation?** Check INSTALLATION_GUIDE.md
- **Project status?** Check PROJECT_STATUS.md

---

**Ready? Let's go! 🚀**

**Open 3 terminals and follow the steps above!**

