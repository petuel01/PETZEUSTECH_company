#!/usr/bin/env bash
# ========================================================
# PETZEUSTECH One-Command Push to GitHub Helper
# ========================================================

set -euo pipefail

REPO_URL="${1:-}"

if [ -z "$REPO_URL" ]; then
    echo "========================================================"
    echo " PETZEUSTECH GitHub Publisher"
    echo "========================================================"
    echo "Usage: ./push-to-github.sh <YOUR_GITHUB_REPO_URL>"
    echo ""
    echo "Example:"
    echo "  ./push-to-github.sh https://github.com/YourUsername/petzeustech.git"
    echo "  or"
    echo "  ./push-to-github.sh git@github.com:YourUsername/petzeustech.git"
    echo "========================================================"
    exit 1
fi

echo "--> Setting remote origin to: $REPO_URL"
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"

echo "--> Renaming branch to main..."
git branch -M main

echo "--> Staging all latest changes..."
git add .

echo "--> Creating commit if needed..."
git commit -m "feat: automated continuous deployment update for petzeustech.com" 2>/dev/null || echo "Nothing new to commit."

echo "--> Pushing to GitHub (branch: main)..."
git push -u origin main

echo "========================================================"
echo " SUCCESS! Code pushed to GitHub."
echo " If you set up GitHub Actions secrets, your VPS will"
echo " automatically begin continuous zero-downtime deployment!"
echo "========================================================"
