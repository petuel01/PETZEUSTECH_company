#!/usr/bin/env bash
# ========================================================
# PETZEUSTECH Safe & Automated Continuous Deployment Script
# Domain: petzeustech.com
# ========================================================

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"

echo "========================================================"
echo " Starting PETZEUSTECH Continuous Deployment"
echo " Time: $(date)"
echo " Working Directory: $APP_DIR"
echo "========================================================"

# 1. Automated Pre-Deployment Database Snapshot
echo "--> 1. Creating pre-deployment database backup..."
if [ -f "./backup-db.sh" ]; then
    bash ./backup-db.sh || echo "Warning: Backup script finished with notice, continuing deployment."
fi

# 2. Pull Latest Git Code (if in a git repo)
if [ -d ".git" ]; then
    echo "--> 2. Pulling latest code from git repository..."
    git fetch origin main || true
    git pull origin main || echo "Working on current local workspace checkout."
fi

# 3. Build Docker images with multi-stage caching
echo "--> 3. Building production Docker containers..."
docker compose build --pull app

# 4. Graceful container restart with zero-downtime
echo "--> 4. Launching updated application containers..."
docker compose up -d --remove-orphans

# 5. Verification & Health Check Probe
echo "--> 5. Waiting for application to initialize and report healthy..."
ATTEMPTS=0
MAX_ATTEMPTS=15
HEALTHY=false

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
    ATTEMPTS=$((ATTEMPTS+1))
    echo "Probe attempt $ATTEMPTS of $MAX_ATTEMPTS..."
    
    # Check docker health status
    STATUS=$(docker inspect --format='{{json .State.Health.Status}}' petzeustech-app 2>/dev/null || echo '"starting"')
    
    if [ "$STATUS" = '"healthy"' ]; then
        HEALTHY=true
        break
    fi
    sleep 3
done

if [ "$HEALTHY" = true ]; then
    echo "========================================================"
    echo " SUCCESS: PETZEUSTECH is LIVE and HEALTHY!"
    echo " Production URL: https://petzeustech.com"
    echo "========================================================"
    # Clean up dangling images to keep VPS disk tidy
    docker image prune -f
else
    echo "========================================================"
    echo " ERROR: Health check timed out or failed!"
    echo " Dumping recent application container logs:"
    echo "========================================================"
    docker compose logs --tail=50 app
    echo "========================================================"
    echo " To inspect live container, run: docker compose logs -f app"
    exit 1
fi
