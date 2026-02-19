# 🚀 Deployment Guide - Audio Solution

Complete guide to deploy Audio Solution to production in **3 days**.

## Phase 1: Local Setup (Day 1)

### Prerequisites
- Windows Server 2016+ OR Cloud VM
- Node.js 16+ installed
- npm 8+

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/audio-solution.git
cd audio-solution
```

### Step 2: Environment Setup

Create `.env` files:

**backend/.env**
```
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-key-here-change-this
DATABASE_URL=postgresql://user:pass@localhost/audio_db
API_CORS_ORIGIN=https://yourdomain.com
```

**frontend/.env.production**
```
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

### Step 3: Install Dependencies
```bash
# Backend
cd backend
npm ci
npm run build

# Frontend
cd ../frontend
npm ci
npm run build

# Audio Agent
cd ../audio-agent
npm ci
npm run build
```

## Phase 2: Database Setup (Day 1-2)

### Option A: PostgreSQL (Recommended)

**Install PostgreSQL**
```bash
# Windows
# Download from https://www.postgresql.org/download/windows/

# Linux
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

**Create Database**
```bash
psql -U postgres
CREATE DATABASE audio_solution;
CREATE USER audio_user WITH PASSWORD 'strong-password';
GRANT ALL PRIVILEGES ON DATABASE audio_solution TO audio_user;
```

**Initialize Schema** (create migrations in real app)
```sql
-- Run migration files
```

### Option B: MongoDB (Alternative)

```bash
# Docker: quickest way
docker run -d -p 27017:27017 --name audio-db mongo:latest

# Or cloud: MongoDB Atlas
# https://www.mongodb.com/cloud/atlas
```

## Phase 3: Cloud Deployment (Day 2-3)

### Deploy to Heroku (Simplest)

```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Create app
heroku create audio-solution-app

# 4. Set environment
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret-key

# 5. Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# 6. Deploy
git push heroku main

# 7. View logs
heroku logs --tail
```

**App will run at:** `https://audio-solution-app.herokuapp.com`

### Deploy to AWS (More Control)

**Using Elastic Beanstalk**
```bash
# 1. Install AWS CLI
pip install awsebcli

# 2. Initialize
eb init -p node.js-14 audio-solution

# 3. Create environment
eb create audio-solution-env

# 4. Deploy
eb deploy

# 5. Open
eb open
```

### Deploy to DigitalOcean (Most Affordable)

**Using App Platform**
```
1. Create account at https://www.digitalocean.com/
2. Create App
3. Connect GitHub repo
4. Select branch to deploy
5. Configure environment variables
6. Deploy (auto on each push)
```

**Cost:** ~$12/month starter plan

## Phase 4: Domain & SSL (Day 2)

### Domain Setup

1. Buy domain from Namecheap/GoDaddy (~$10/year)
2. Set nameservers to your hosting provider
3. Create DNS records

### SSL Certificate (FREE via Let's Encrypt)

```bash
# If self-hosted on Linux:
sudo apt-get install certbot
sudo certbot certonly --standalone -d yourdomain.com
```

Most cloud platforms provide free SSL automatically.

## Phase 5: Monitoring & Maintenance (Day 3+)

### Performance Monitoring
```bash
# Install monitoring tools
npm install pm2

# Start with PM2
pm2 start backend/src/server.js --name "audio-api"
pm2 start frontend build --name "audio-web"
pm2 save

# View logs
pm2 logs

# Set to start on reboot
pm2 startup
```

### Uptime Monitoring
- Uptime Robot: https://uptimerobot.com (free)
- Monitors your API every 5 minutes
- Alerts via email/SMS if down

### Error Tracking
```bash
npm install sentry-node

# Add to backend/src/server.js
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: "your-sentry-dsn"
});
```

## Step-by-Step Quick Deploy

### Option 1: Deploy in 10 Minutes (Heroku)

```bash
# 1. Create account at heroku.com
# 2. Install Heroku CLI
npm install -g heroku

# 3. Deploy backend
cd backend
heroku create audio-solution-api
heroku config:set JWT_SECRET=mysecretkey
git push heroku main

# 4. Deploy frontend (separate app)
cd ../frontend
npm run build
heroku create audio-solution-web
git subtree push --prefix build heroku main

# Done! Visit https://audio-solution-web.herokuapp.com
```

### Option 2: Deploy to DigitalOcean ($12/month)

```bash
# 1. Create account
# 2. Create Droplet (Ubuntu 20.04, 2GB RAM)
# 3. SSH into droplet
ssh root@your-droplet-ip

# 4. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 5. Clone repo
git clone https://github.com/yourusername/audio-solution.git
cd audio-solution

# 6. Install & run
npm install
npm run dev

# 7. Use PM2 to keep running
npm install -g pm2
pm2 start npm --name "audio-solution" -- start
pm2 save
```

### Option 3: Docker Deployment

```bash
# Create Dockerfile
# See deployment/docker/Dockerfile

# Build image
docker build -t audio-solution .

# Run container
docker run -d -p 80:5000 \
  -e JWT_SECRET=mysecret \
  -e DATABASE_URL=postgresql://... \
  audio-solution

# Deploy to cloud (AWS, Azure, Google Cloud)
```

## Production Checklist

- [ ] Environment variables set correctly
- [ ] Database backed up daily
- [ ] SSL/HTTPS enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Error logging configured
- [ ] Monitoring/uptime alerts set
- [ ] Backup strategy in place
- [ ] Load balancing if needed
- [ ] CDN for static assets
- [ ] Database connection pooling
- [ ] Password hashing verified
- [ ] API keys rotated
- [ ] Documentation updated

## Scaling Strategy

### Phase 1: MVP (100 concurrent users)
- Single Node.js server
- Heroku hobby dyno OR small DigitalOcean droplet
- Managed database (Heroku Postgres / MongoDB Atlas)

### Phase 2: Growth (1,000 concurrent users)
- 2-3 Node.js instances
- Load balancer
- Redis for caching
- Separate database replica for reads

### Phase 3: Scale (10,000+ users)
- Kubernetes cluster
- Auto-scaling
- CDN for frontend
- Distributed audio agents
- Multiple databases (sharding)

## Cost Estimation

| Phase | Solution | Monthly Cost |
|-------|----------|-------------|
| **MVP** | Heroku Hobby | $7-25 |
| | DigitalOcean App Platform | $12 |
| **Growth** | Heroku Standard | $50-150 |
| | AWS EC2 + RDS | $100-300 |
| **Scale** | AWS Kubernetes | $500-2000+ |
| | Google Cloud | $500-2000+ |

## Maintenance

### Daily
- Monitor error logs
- Check uptime status

### Weekly
- Review performance metrics
- Check security updates
- Backup database

### Monthly
- Update dependencies
- Review usage/costs
- Plan new features

## Emergency Procedures

### If API is down
1. SSH to server
2. Check logs: `pm2 logs`
3. Restart: `pm2 restart audio-api`
4. If database issue: check connection string

### If database corrupted
1. Restore from backup
2. Notify users of downtime
3. Post-mortem analysis

### If compromised
1. Change all secrets immediately
2. Rotate JWT secret
3. Review audit logs
4. Force password reset for users

## Next Steps

1. **Choose hosting** (Heroku / DigitalOcean / AWS)
2. **Set up domain** (Namecheap / GoDaddy)
3. **Deploy backend first**
4. **Deploy frontend**
5. **Configure monitoring**
6. **Test thoroughly**
7. **Launch!**

---

**Questions?** Email support@audiosolution.app

**Ready to go live!** 🚀
