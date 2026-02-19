# 🎵 Audio Solution

**Route your audio sources to different output devices with ease.**

A complete web-based audio routing solution for Windows that lets users connect Spotify, Chrome, Discord, and other audio sources to different speakers, headphones, or Bluetooth devices simultaneously.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (https://nodejs.org/)
- npm 8+ (comes with Node.js)
- Windows 10/11

### Installation

1. **Install Backend**
```bash
cd backend
npm install
npm run dev
```
Backend runs on `http://localhost:5000`

2. **Install Frontend (in another terminal)**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

3. **Install Audio Agent (in another terminal)**
```bash
cd audio-agent
npm install
npm run dev
```
Agent runs as system tray application

4. **Access the app**
Open browser to `http://localhost:3000`

## 📋 Features

### MVP (Current)
✅ Audio source detection (Spotify, Chrome, Discord, VLC)
✅ Audio device detection (Speakers, Bluetooth, USB, Headphones)
✅ Create custom audio routes (App → Device)
✅ Real-time volume control per route
✅ User authentication & profiles
✅ Route management (create, delete, pause, resume)
✅ Live performance metrics (CPU, memory, latency)
✅ Persistent route storage

### Coming Soon
🔜 Multi-device per account
🔜 Audio effects (EQ, compression)
🔜 Recording capabilities
🔜 macOS & Linux support
🔜 Mobile apps
🔜 Subscription plans & payments

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  Web Browser (React)                │
│  http://localhost:3000              │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  Backend API (Node.js/Express)      │
│  http://localhost:5000              │
│  - Auth                             │
│  - Route management                 │
│  - User settings                    │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│  Local Audio Agent (Electron)       │
│  - WASAPI integration               │
│  - Audio routing                    │
│  - System tray app                  │
└─────────────────────────────────────┘
```

## 📁 Project Structure

```
Audio Solution/
├── backend/                 # Node.js/Express API
│   ├── src/
│   │   ├── server.js       # Main server
│   │   ├── routes/         # API endpoints
│   │   ├── models/         # Data models
│   │   └── config/         # Configuration
│   └── package.json
│
├── frontend/                # React web app
│   ├── src/
│   │   ├── App.jsx         # Main component
│   │   ├── pages/          # Page components
│   │   ├── components/     # UI components
│   │   ├── store/          # State management
│   │   └── styles/         # CSS files
│   ├── public/
│   │   └── index.html
│   └── package.json
│
└── audio-agent/             # Electron local agent
    ├── src/
    │   ├── main/           # Electron main
    │   ├── audio-engine/   # WASAPI integration
    │   └── ui/             # Agent UI
    └── package.json
```

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

### Building for Production

**Backend**
```bash
npm run build
npm start
```

**Frontend**
```bash
npm run build
# Generates dist/ folder
```

**Audio Agent**
```bash
npm run build
npm run dist
# Generates .exe installer
```

## 📦 Deployment

### Option 1: Docker (Recommended)
```bash
docker-compose up
```

### Option 2: Cloud Platforms

**Heroku**
```bash
heroku create audio-solution-app
git push heroku main
```

**AWS**
```bash
# See deployment/aws/README.md
```

**DigitalOcean**
```bash
# See deployment/digitalocean/README.md
```

## 🔐 Security

- All passwords hashed with bcryptjs
- JWT-based authentication
- HTTPS in production
- Input validation on all routes
- CORS properly configured
- Environment variables for secrets

## 📝 API Documentation

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify
```

### Audio
```
GET /api/audio/inputs       # List audio sources
GET /api/audio/outputs      # List output devices
GET /api/audio/status       # Agent status
```

### Routes
```
GET    /api/routes          # List user's routes
POST   /api/routes          # Create new route
GET    /api/routes/:id      # Get specific route
PUT    /api/routes/:id      # Update route
DELETE /api/routes/:id      # Delete route
POST   /api/routes/:id/test # Test route connection
```

### User
```
GET /api/user/profile       # User profile
PUT /api/user/profile       # Update profile
GET /api/user/stats         # Usage statistics
GET /api/user/subscription  # Subscription info
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check port 5000 is available
netstat -ano | findstr :5000
# Kill process if needed
taskkill /PID <PID> /F
```

### Frontend can't connect to backend
```bash
# Set API URL
export REACT_APP_API_URL=http://localhost:5000
```

### Audio Agent not detecting devices
```bash
# Restart agent
# Check Windows audio settings
# Verify WASAPI support (Windows 7+)
```

## 📞 Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Email: support@audiosolution.app

## 📄 License

MIT License - See LICENSE.md

## 🙏 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🎯 Roadmap

- [x] Basic audio routing (MVP)
- [x] Web interface
- [ ] Mobile apps (Android/iOS)
- [ ] macOS support
- [ ] Audio effects
- [ ] Recording
- [ ] Subscription plans
- [ ] API for third-party integration

---

**Made with ❤️ by the Audio Solution Team**

**Live Demo:** (Coming soon)
**Website:** (Coming soon)
