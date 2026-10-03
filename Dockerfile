# ========================================================
# PETZEUSTECH Production Frontend Dockerfile
# Builds Vite React 19 app and serves with Nginx Alpine
# Fast, lightweight (<25MB), zero node runtime overhead
# ========================================================

# --- Stage 1: Build Frontend Assets ---
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install dependencies cleanly
RUN npm install

# Copy application source code
COPY . .

# Compile Vite production bundle to /app/dist
RUN npm run build

# --- Stage 2: Production Nginx Server ---
FROM nginx:1.27-alpine AS runner

# Remove default nginx welcome html
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy optimized SPA nginx configuration
COPY nginx/frontend.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
