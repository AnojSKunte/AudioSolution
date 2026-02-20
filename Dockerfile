# Multi-stage build for Audio Solution

# Stage 1: Build frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./

RUN npm install --production=false

COPY frontend/ ./

RUN npm run build

# Stage 2: Backend and services
FROM node:18-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./backend/

RUN cd backend && npm install

# Install audio-agent dependencies
COPY audio-agent/package*.json ./audio-agent/

RUN cd audio-agent && npm install

# Copy backend code
COPY backend/ ./backend/

# Copy audio-agent code
COPY audio-agent/ ./audio-agent/

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/frontend/build ./frontend/build

# Copy frontend package.json for reference
COPY frontend/package*.json ./frontend/

# Expose ports
EXPOSE 5000 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Create startup script
RUN echo '#!/bin/sh\ncd /app/backend && npm start &\ncd /app/audio-agent && npm start &\nwait' > /app/start.sh && chmod +x /app/start.sh

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start services
CMD ["sh", "-c", "cd /app/backend && npm start"]
