# PETZEUSTECH: Manual VPS Hosting Guide (100% Foolproof)
**VPS IP:** `162.35.183.158`  
**Root Password:** `Petuel99.5`  
**Domain:** `petzeustech.com`

---

## Method A: The Fastest Docker Method (Recommended)

### Step 1: Connect to Your VPS
Open your computer terminal (PowerShell or Command Prompt on Windows, or Terminal on Mac):
```bash
ssh root@162.35.183.158
```
When prompted for password, paste or type:
```
Petuel99.5
```

---

### Step 2: Install Git & Docker (If Not Already Installed)
Run this command on your VPS:
```bash
apt-get update -y && apt-get install -y git curl ufw
curl -fsSL https://get.docker.com | sh
```

---

### Step 3: Stop Host Nginx to Free Port 80
Because your VPS already had a default Nginx page running, stop it so Docker can take over port 80:
```bash
systemctl stop nginx
systemctl disable nginx
```

---

### Step 4: Clone Your Repository onto the VPS
```bash
rm -rf /opt/petzeustech
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git /opt/petzeustech
cd /opt/petzeustech
```
*(Replace `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME` with your actual GitHub repository URL)*

---

### Step 5: Build and Start Docker Container
```bash
docker compose up -d --build
```

---

### Step 6: Verify
Open your browser and visit:
👉 **`http://162.35.183.158`**

Your PETZEUSTECH website is now live!

---

## Method B: The Direct System Nginx Method (No Docker Needed)

If you don't want to use Docker at all, you can use the Nginx server that is already installed on your VPS:

### 1. Install Node.js on Your VPS:
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs git
```

### 2. Clone and Build the Website:
```bash
rm -rf /var/www/petzeustech
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git /var/www/petzeustech
cd /var/www/petzeustech
npm install
npm run build
```

### 3. Point Nginx to the Built Website:
```bash
cat << 'EOF' > /etc/nginx/sites-available/default
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name petzeustech.com www.petzeustech.com 162.35.183.158;

    root /var/www/petzeustech/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
EOF
```

### 4. Restart Nginx:
```bash
nginx -t && systemctl restart nginx
```

---

## How to Update the Site Manually Anytime (Continuous Development)

Whenever you make changes, commit and push to GitHub, then run this **single command** on your VPS:

**For Docker (Method A):**
```bash
cd /opt/petzeustech && git pull origin main && docker compose up -d --build
```

**For Direct Nginx (Method B):**
```bash
cd /var/www/petzeustech && git pull origin main && npm run build && systemctl reload nginx
```
It takes less than 15 seconds to update!

---

## Connecting Your Domain (petzeustech.com)

In your domain registrar (Namecheap, GoDaddy, Hostinger, etc.):
1. Go to **DNS Management** for `petzeustech.com`.
2. Add an **A Record**:
   - **Host:** `@`
   - **Points to (Value):** `162.35.183.158`
   - **TTL:** Automatic or 3600
3. Add a **CNAME Record**:
   - **Host:** `www`
   - **Value:** `petzeustech.com`

Once saved, visitors to `http://petzeustech.com` will see your website.
