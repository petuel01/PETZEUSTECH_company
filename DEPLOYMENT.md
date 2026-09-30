# PETZEUSTECH Production Deployment Guide

This guide details how to deploy the PETZEUSTECH platform on production infrastructure:
1. **Automated Docker Server Deployment (`deploy.sh` + GitHub Actions)**
2. **Standard Docker & Docker Compose Setup**
3. **Linux VPS with Nginx and Node.js (PM2)**
4. **aaPanel or cPanel with PHP 8.x and MySQL 8.0**
5. **Google Cloud Run (AI Studio Container)**

---

## 1. Quick One-Command Server Deployment with Docker

If Docker is already installed on your server and other services/ports are already running:

### Step 1: Clone Repository onto Your Server
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/petzeustech.git /var/www/petzeustech
cd /var/www/petzeustech
```

### Step 2: Run the Automated Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

### What `deploy.sh` Automatically Does for You:
1. **Prerequisite Check**: Validates Docker daemon and Compose availability.
2. **Git Auto-Pull**: Pulls latest commits from your GitHub branch.
3. **Smart Port Collision Detection**:
   - Inspects existing open ports (`ss` / `netstat` / `lsof`).
   - If the default port (`8080`) is already bound by another service on your server, it automatically searches and binds to the next available free port (or uses `APP_PORT` from `.env`).
4. **Environment Setup**:
   - Auto-generates `.env` from `.env.example` if not already created.
   - Generates a secure random 32-character `SESSION_SECRET`.
5. **Data Persistence**: Creates `./data` volume mount so SQLite/JSON database records, customer bookings, and contact messages persist across updates.
6. **Zero-Downtime Container Rebuild**: Rebuilds the lightweight Alpine container and restarts with `--restart unless-stopped`.
7. **Health Verification**: Runs live health checks at `/api/health` and displays your access URLs.

---

## 2. Automated Deployment on Every Push to GitHub

### Option A: GitHub Actions (Push-to-Deploy via SSH)
A ready-to-use workflow is already included in `.github/workflows/deploy.yml`.

1. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
2. Add the following repository secrets:
   - `SERVER_HOST`: Your server public IP or domain name (e.g. `123.45.67.89`).
   - `SERVER_USER`: SSH username (e.g. `root` or `ubuntu`).
   - `SERVER_SSH_KEY`: Your server private SSH key (`~/.ssh/id_rsa`).
   - `SERVER_PROJECT_PATH`: The directory where you cloned the repo (e.g. `/var/www/petzeustech`).
3. Every time you push to `main` or `master`, GitHub Actions connects to your server and triggers `./deploy.sh` automatically!

### Option B: Webhook / Cron Auto-Update
If you prefer not using SSH keys, you can set up a 5-minute cron job on your server:
```bash
crontab -e
# Add line to check for git updates every 10 minutes:
*/10 * * * * cd /var/www/petzeustech && git fetch origin && [ $(git rev-parse HEAD) != $(git rev-parse @{u}) ] && ./deploy.sh >> /var/log/petzeustech-deploy.log 2>&1
```

---

## 3. Docker Compose Manual Usage

If you prefer managing the container directly with Docker Compose:
```bash
# Start in background with automatic rebuild
docker compose up -d --build

# View live logs
docker compose logs -f

# Stop service
docker compose down
```

To change the external port:
Set `APP_PORT=9000` in `.env` or run:
```bash
APP_PORT=9000 docker compose up -d --build
```

---

## 4. Linux VPS (Ubuntu 22.04 / 24.04 LTS) with Nginx + PM2

### Step 1: Install Node.js & Nginx
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
sudo npm install -g pm2
```

### Step 2: Clone & Build PETZEUSTECH
```bash
cd /var/www
git clone https://github.com/petzeustech/platform.git petzeustech
cd petzeustech
npm install
npm run build
```

### Step 3: Run with PM2
```bash
pm2 start dist/server.cjs --name "petzeustech"
pm2 save
pm2 startup
```

### Step 4: Configure Nginx Reverse Proxy
Edit `/etc/nginx/sites-available/petzeustech.com`:
```nginx
server {
    server_name petzeustech.com www.petzeustech.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Enable site and get SSL with Let's Encrypt:
```bash
sudo ln -s /etc/nginx/sites-available/petzeustech.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d petzeustech.com -d www.petzeustech.com
```

---

## 3. aaPanel / cPanel (PHP 8 + MySQL) Deployment

1. Import `schema.sql` into your aaPanel/cPanel MySQL database (e.g. `petzeus_db`).
2. Point your website document root to `/dist` (or `public_html`).
3. For PHP API handling, the endpoints in `/server.ts` mirror standard SQL queries in `schema.sql`.
