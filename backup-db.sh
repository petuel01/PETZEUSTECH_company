#!/usr/bin/env bash
# ========================================================
# PETZEUSTECH Automated Database Backup Script
# Creates timestamped, gzip-compressed snapshots of data/db.json
# ========================================================

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKUP_DIR="$APP_DIR/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/petzeustech_db_$TIMESTAMP.json.gz"

mkdir -p "$BACKUP_DIR"

# Check if data directory or docker volume exists
if [ -f "$APP_DIR/data/db.json" ]; then
    echo "Backing up local data/db.json to $BACKUP_FILE..."
    gzip -c "$APP_DIR/data/db.json" > "$BACKUP_FILE"
    echo "Backup successful! Size: $(du -h "$BACKUP_FILE" | cut -f1)"
elif docker volume inspect petzeustech_data &>/dev/null; then
    echo "Backing up Docker volume petzeustech_data to $BACKUP_FILE..."
    docker run --rm -v petzeustech_data:/data -v "$BACKUP_DIR":/backup alpine \
      sh -c "if [ -f /data/db.json ]; then gzip -c /data/db.json > /backup/petzeustech_db_$TIMESTAMP.json.gz; fi"
    echo "Docker volume backup completed!"
else
    echo "Notice: No existing database file found yet (will be created on first start)."
fi

# Rotate backups: delete backups older than 30 days to conserve VPS disk space
find "$BACKUP_DIR" -type f -name "petzeustech_db_*.json.gz" -mtime +30 -exec rm -f {} \;
echo "Old backups (>30 days) pruned."
