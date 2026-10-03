#!/usr/bin/env bash
# ========================================================
# PETZEUSTECH Simple & Continuous Frontend Deployment
# Host: 162.35.183.158 | Domain: petzeustech.com
# ========================================================

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo "========================================================"
echo " Starting PETZEUSTECH Frontend Deployment"
echo " Host: 162.35.183.158 | Domain: petzeustech.com"
echo " Time: $(date)"
echo "========================================================"

# 1. Stop conflicting host nginx if running directly on host OS
if systemctl is-active --quiet nginx 2>/dev/null; then
    echo "--> Stopping host nginx so Docker can use port 80..."
    systemctl stop nginx || true
    systemctl disable nginx || true
fi

# 2. Pull latest code if in a git repository
if [ -d ".git" ]; then
    echo "--> Pulling latest changes from GitHub (main)..."
    git fetch origin main || true
    git pull origin main || echo "Proceeding with current checkout."
fi

# 3. Build & Launch Docker Container
echo "--> Building production frontend Docker image..."
docker compose build web

echo "--> Launching petzeustech-web container..."
docker compose up -d --remove-orphans web

# 4. Verification Check
echo "--> Verifying local HTTP response..."
sleep 2

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    echo "========================================================"
    echo " SUCCESS! PETZEUSTECH Frontend is LIVE!"
    echo " Visit via VPS IP: http://162.35.183.158"
    echo " Visit via Domain: http://petzeustech.com"
    echo "========================================================"
else
    echo "--> Container status:"
    docker compose ps
    echo "--> Container logs:"
    docker compose logs --tail=20 web
fi
