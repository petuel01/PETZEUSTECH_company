#!/usr/bin/env bash
# ========================================================
# PETZEUSTECH One-Command Setup for VPS (162.35.183.158)
# Domain: petzeustech.com
# ========================================================

set -euo pipefail

PROJECT_DIR="/opt/petzeustech"

echo "========================================================"
echo " Setting up PETZEUSTECH Frontend on VPS"
echo " Host IP: 162.35.183.158 | Target: petzeustech.com"
echo "========================================================"

# 1. Update packages & install essentials
echo "--> 1. Installing required tools (curl, git, ufw)..."
apt-get update -y
apt-get install -y curl git ufw ca-certificates

# 2. Configure Firewall (allow SSH, HTTP, HTTPS)
echo "--> 2. Configuring firewall..."
ufw default deny incoming || true
ufw default allow outgoing || true
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

# 3. Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "--> 3. Installing Docker Engine..."
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
else
    echo "--> 3. Docker is already installed."
fi

# 4. Stop system nginx so Docker can bind port 80
if systemctl is-active --quiet nginx 2>/dev/null; then
    echo "--> 4. Freeing port 80 (stopping host nginx)..."
    systemctl stop nginx || true
    systemctl disable nginx || true
fi

# 5. Build and deploy frontend
echo "--> 5. Launching Docker container..."
cd "$PROJECT_DIR"
docker compose build web
docker compose up -d web

echo "========================================================"
echo " DEPLOYMENT COMPLETE!"
echo " Open in browser: http://162.35.183.158"
echo " And when DNS points: http://petzeustech.com"
echo "========================================================"
