#!/usr/bin/env bash
# ========================================================
# PETZEUSTECH VPS Automated Bootstrap Script
# Target: Ubuntu 22.04 / 24.04 LTS or Debian 12
# Domain: petzeustech.com & www.petzeustech.com
# ========================================================

set -euo pipefail

DOMAIN="petzeustech.com"
EMAIL="baifempetuel0.2@gmail.com"
PROJECT_DIR="/opt/petzeustech"

echo "========================================================"
echo " Starting PETZEUSTECH VPS Setup for: $DOMAIN"
echo " Time: $(date)"
echo "========================================================"

# 1. Update system packages
echo "--> Updating system packages..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl wget git ufw apt-transport-https ca-certificates gnupg lsb-release

# 2. Configure UFW Firewall
echo "--> Configuring UFW Firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp comment 'SSH'
ufw allow 80/tcp comment 'HTTP (Certbot & Web)'
ufw allow 443/tcp comment 'HTTPS (Secure Web)'
ufw --force enable
ufw status verbose

# 3. Install Docker & Docker Compose Plugin
if ! command -v docker &> /dev/null; then
    echo "--> Installing Docker Engine..."
    install -m 0755 -d /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    chmod a+r /etc/apt/keyrings/docker.asc

    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      tee /etc/apt/sources.list.d/docker.list > /dev/null

    apt-get update -y
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    systemctl enable docker
    systemctl start docker
    echo "--> Docker installed successfully!"
else
    echo "--> Docker is already installed."
fi

# 4. Prepare Application Directory
echo "--> Preparing project directory at $PROJECT_DIR..."
mkdir -p "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/backups"
mkdir -p "$PROJECT_DIR/data"

# 5. Create .env file if it doesn't exist
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo "--> Creating production .env file..."
    cat <<EOF > "$PROJECT_DIR/.env"
NODE_ENV=production
PORT=3000
DOMAIN=petzeustech.com
ADMIN_KEY=petzeustech_admin_2026
GEMINI_API_KEY=
CERTBOT_EMAIL=$EMAIL
EOF
    echo "--> .env created! (Add your GEMINI_API_KEY if desired)"
fi

# 6. Initial Let's Encrypt SSL Certificate Setup (Standalone)
echo "--> Checking SSL Certificates for $DOMAIN..."
if ! docker volume inspect certbot_etc &>/dev/null || ! docker run --rm -v certbot_etc:/etc/letsencrypt alpine ls /etc/letsencrypt/live/$DOMAIN/fullchain.pem &>/dev/null; then
    echo "--> Acquiring initial SSL Certificate via Certbot standalone..."
    docker run --rm \
      -p 80:80 \
      -v certbot_etc:/etc/letsencrypt \
      -v certbot_var:/var/lib/letsencrypt \
      certbot/certbot certonly \
      --standalone \
      --preferred-challenges http \
      --agree-tos \
      --no-eff-email \
      --email "$EMAIL" \
      -d "$DOMAIN" \
      -d "www.$DOMAIN" || {
        echo "WARNING: Could not automatically acquire SSL certificate."
        echo "Make sure your DNS A-records for $DOMAIN and www.$DOMAIN point to this VPS IP before running certbot."
        echo "Creating self-signed temporary certificate so Nginx can start..."
        docker run --rm \
          -v certbot_etc:/etc/letsencrypt \
          alpine sh -c "mkdir -p /etc/letsencrypt/live/$DOMAIN && openssl req -x509 -nodes -newkey rsa:2048 -days 30 -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem -subj '/CN=petzeustech.com'"
    }
fi

# 7. Setup automated daily database backup cron job
echo "--> Setting up automated daily backup cron job..."
CRON_JOB="0 2 * * * cd $PROJECT_DIR && ./backup-db.sh >> /var/log/petzeustech-backup.log 2>&1"
(crontab -l 2>/dev/null | grep -Fv "backup-db.sh" ; echo "$CRON_JOB") | crontab -

echo "========================================================"
echo " PETZEUSTECH VPS Setup Complete!"
echo " Run: cd $PROJECT_DIR && ./deploy.sh"
echo " Website: https://$DOMAIN"
echo "========================================================"
