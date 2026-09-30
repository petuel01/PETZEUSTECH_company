# PETZEUSTECH: Complete Module-by-Module Guide & Docker VPS Deployment

Welcome to the definitive architectural and deployment documentation for **PETZEUSTECH** (`petzeustech.com`). This guide is written in clear, plain language so you can easily understand every module of the project, how they interact, and how to host the platform securely and reliably on your VPS using Docker.

---

## 1. Project Overview & System Philosophy

**PETZEUSTECH** is a technology and innovation company founded by **Petuel Baifem** in **Cameroon**, positioned as *"Powering Africa's Digital Future"*.

The application is architected as a **full-stack modern web platform** designed specifically for high speed, low bandwidth consumption, complete mobile responsiveness, and zero unnecessary bloat.

### Technology Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS (v4), Motion (Framer Motion), Lucide Icons, Vite 6.
- **Backend**: Node.js 22, Express REST API, Gemini AI SDK (`@google/genai`).
- **Database**: Local JSON document store (`data/db.json`) persisted via Docker volumes.
- **Deployment & Hosting**: Multi-stage Docker, Docker Compose, Nginx (HTTP/2, TLS 1.2/1.3, Gzip, HSTS), Certbot (Let's Encrypt SSL).
- **Target Domain**: `petzeustech.com` and `www.petzeustech.com`.

---

## 2. Module-by-Module Breakdown

```
petzeustech/
├── src/                      # Frontend Application (React 19)
│   ├── assets/images/        # High-definition visual assets & PT branding
│   ├── components/           # Reusable UI components & layouts
│   ├── context/              # Global state (ThemeContext: Dark/Light Mode)
│   ├── data/                 # Canonical company data, 6 departments, projects
│   ├── lib/                  # Client API callers & WhatsApp deep link builder
│   ├── pages/                # Top-level application views
│   ├── App.tsx               # Root component & page router
│   └── main.tsx              # React DOM mounting
├── server.ts                 # Full-Stack Node.js / Express Server & REST API
├── server/seedData.ts        # Database seed datasets (Services, Courses, Blogs)
├── data/db.json              # Local persistent JSON database (Users, Bookings, Logs)
├── nginx/                    # Reverse proxy & SSL configuration for petzeustech.com
├── Dockerfile                # Multi-stage production container build
├── docker-compose.yml        # Docker orchestration (App + Nginx + Certbot)
├── setup-vps.sh              # One-command initial VPS server bootstrap
├── deploy.sh                 # Safe continuous deployment script
└── backup-db.sh              # Automated database snapshot script
```

---

### Module 1: The Six Core Technology Departments
PETZEUSTECH is organized into 6 specialized commercial departments defined in `src/data/companyData.ts`:

1. **PETZEUSTECH Software Labs**: Custom websites, business portals, PHP/MySQL databases, and WordPress development.
2. **PETZEUSTECH CloudCore**: Linux VPS setup, Nginx reverse proxy, Docker containers, SSL configuration, and domain management.
3. **PETZEUSTECH Graphics & Creative**: Brand identity, logo design, business cards, flyers, and social media media.
4. **PETZEUSTECH Electronics Diagnostics**: Smartphone repairs, laptop hardware fixes, screen replacements, and OS installations.
5. **PETZEUSTECH Ads & Marketing**: Facebook/Meta ads, Google ads, WhatsApp marketing funnels, and SEO optimization.
6. **PETZEUSTECH IT Academy**: Practical, hands-on technology training classes and mentorship in Cameroon.

---

### Module 2: Frontend Pages & User Flows (`src/pages/`)
Each page is modular, keyboard accessible, and fully responsive across smartphones, tablets, and desktops:

- **Home (`Home.tsx`)**:
  - Hero Section: Features authentic African technology innovation in **Cameroon & Global**, highlighting local commercial impact.
  - Snapshot Grid: Direct links to each of the 6 departments.
  - Direct Transition: Flows smoothly into all 6 department capability breakdowns.
  - Recent Projects: Showcase of completed web and electronics projects.
  - Founder Story: Background on founder Petuel Baifem and the company's roots in Cameroon.
  - Interactive FAQ: Answers common client questions (pricing, location, timelines).
- **Services (`Services.tsx`)**: Comprehensive catalog of 40+ commercial services with clear pricing hints (in XAF) and direct "Book Now" actions.
- **Projects (`Projects.tsx`)**: Filterable portfolio of case studies and technical deliverables.
- **Academy (`Academy.tsx`)**: Course catalog with curriculum modules, pricing, and student registration.
- **Blog / Knowledge Hub (`Blog.tsx`)**: Practical tech guides, VPS tutorials, and computer maintenance advice.
- **Contact (`Contact.tsx`)**: Inquiries form and direct WhatsApp / email links.
- **Book Service (`BookService.tsx`)**: Step-by-step booking form that generates an official booking reference (e.g. `PTZ-20260930-1042`) and opens a pre-filled WhatsApp confirmation.
- **Customer Portal (`CustomerDashboard.tsx`)**: Allows clients to track the status of their repair or project in real-time using their reference code.
- **Admin Console (`AdminDashboard.tsx`)**: Password-protected management dashboard for viewing leads, updating booking statuses, and managing course enrollments.
- **Auth (`SignIn.tsx`, `SignUp.tsx`)**: Secure customer account sign-in and registration with Google, GitHub, and email options.

---

### Module 3: Background Engine & Design System
- **ThemeContext (`src/context/ThemeContext.tsx`)**: Seamless switching between Dark Mode (deep space navy `#070817` with purple accents) and Light Mode (crisp white background with high-contrast text `#0f172a`).
- **TechSnowBackground (`src/components/TechSnowBackground.tsx`)**: Lightweight ambient tech particle canvas that renders subtle falling digital dust particles with zero performance lag.
- **ZeusAIAssistant (`src/components/ZeusAIAssistant.tsx`)**: An intelligent AI technology consultant that advises clients on the best department for their needs, with fallback offline rules if the Gemini API key is absent.

---

### Module 4: Backend REST API (`server.ts`)
The Express server runs on port 3000 and exposes clean JSON endpoints:
- `GET /api/health`: Health probe endpoint returning uptime, status, and environment.
- `POST /api/auth/login`: Email/password authentication.
- `POST /api/auth/register`: Account creation.
- `GET /api/bookings`: Fetch all bookings (Admin only).
- `POST /api/bookings`: Create new booking with reference code generation.
- `GET /api/bookings/ref/:reference`: Public status lookup by booking reference code.
- `PATCH /api/bookings/:id/status`: Update booking progress status (Admin only).
- `POST /api/contact`: Receive inquiries and contact messages.
- `POST /api/zeus-ai`: AI consultation prompt handler powered by Gemini 2.5 Flash.

---

### Module 5: WhatsApp Direct Connection Engine (`src/lib/whatsapp.ts`)
In Cameroon and Central Africa, WhatsApp is the primary communication channel for business transactions:
- `buildBookingWhatsAppUrl(...)`: Encodes booking details (Reference code, Customer Name, Service, Date, Town) into an official WhatsApp click-to-chat URL directed to **+237 677 251 088**.
- Security guarantee: Sensitive data (passwords, tokens, database IDs) are strictly excluded from WhatsApp URLs.

---

## 3. VPS Hosting Guide: Deploying on `petzeustech.com`

Hosting with Docker on your VPS ensures your app runs in an isolated, secure environment, starts automatically upon server reboot, and updates in seconds with zero downtime.

### Step 1: Point Your Domain DNS to Your VPS
Log into your domain registrar (where you purchased `petzeustech.com`):
1. Create an **A Record**:
   - **Host / Name**: `@` (or leave blank depending on registrar)
   - **Type**: `A`
   - **Value / Destination**: `YOUR_VPS_PUBLIC_IP` (e.g. `123.45.67.89`)
   - **TTL**: `3600` (1 hour) or Auto
2. Create a **CNAME or A Record for WWW**:
   - **Host / Name**: `www`
   - **Type**: `CNAME`
   - **Value**: `petzeustech.com` (or `A` record pointing to `YOUR_VPS_PUBLIC_IP`)
3. *Wait 5–15 minutes for DNS propagation.* You can check propagation with:
   ```bash
   ping petzeustech.com
   ```

---

### Step 2: Connect to Your VPS
Open your terminal (macOS/Linux) or PowerShell/Command Prompt (Windows):
```bash
ssh root@YOUR_VPS_IP
```

---

### Step 3: Clone the Repository to Your VPS
```bash
# Create directory and clone your repository
mkdir -p /opt/petzeustech
cd /opt/petzeustech
git clone https://github.com/YOUR_USERNAME/petzeustech.git .
```
*(Or upload the project files using SCP / SFTP / rsync to `/opt/petzeustech`)*

---

### Step 4: Run the One-Command VPS Bootstrap Script
We have prepared a self-executing script `setup-vps.sh` that automates all server setup tasks:
```bash
# Make scripts executable
chmod +x setup-vps.sh deploy.sh backup-db.sh

# Run the initial setup
./setup-vps.sh
```

#### What `setup-vps.sh` does automatically:
1. Updates Ubuntu/Debian system packages (`apt update && apt upgrade`).
2. Configures the **UFW Firewall**:
   - Opens port `22` (SSH)
   - Opens port `80` (HTTP for Web & Let's Encrypt validation)
   - Opens port `443` (HTTPS for Secure SSL Web)
   - Denies all other unauthorized incoming ports
3. Installs the official **Docker Engine** and **Docker Compose plugin**.
4. Acquires your free, verified **Let's Encrypt SSL Certificates** for `petzeustech.com` and `www.petzeustech.com`.
5. Schedules an automated daily backup cron job at 2:00 AM for `data/db.json`.

---

### Step 5: Configure Your Environment Variables
Edit your production `.env` file:
```bash
nano /opt/petzeustech/.env
```
Ensure it contains:
```env
NODE_ENV=production
PORT=3000
DOMAIN=petzeustech.com
ADMIN_KEY=petzeustech_admin_2026
GEMINI_API_KEY=your_gemini_api_key_here
CERTBOT_EMAIL=baifempetuel0.2@gmail.com
```
Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X`).

---

### Step 6: Deploy with Docker Compose
Run the continuous deployment script:
```bash
./deploy.sh
```

`deploy.sh` will:
1. Create a pre-deployment database backup in `backups/`.
2. Build the optimized production Docker image (`node:22-alpine`).
3. Start the three Docker containers:
   - `petzeustech-app`: Full-stack Node/Express engine.
   - `petzeustech-nginx`: SSL terminator and reverse proxy.
   - `petzeustech-certbot`: Auto-renewal daemon for SSL certificates.
4. Verify the container health check via `/api/health`.

Once complete, open **`https://petzeustech.com`** in your browser!

---

## 4. How Continuous Automated Development Works

Whenever you make improvements, push code, or add new features, you can deploy them instantly without downtime.

### Option A: One-Command Manual Deployment
On your VPS, simply run:
```bash
cd /opt/petzeustech
./deploy.sh
```
This script automatically pulls your latest git commits, rebuilds the Docker container, and swaps it in with zero interruption to your visitors.

### Option B: Automatic GitHub Actions CI/CD (Push to Deploy)
Every time you run `git push origin main`, GitHub Actions will:
1. Check out your code on an Ubuntu runner.
2. Install dependencies and run `npm run lint`.
3. Verify `npm run build` succeeds.
4. Securely connect to your VPS via SSH and execute `./deploy.sh`.

#### To enable GitHub Actions:
In your GitHub repository, go to **Settings > Secrets and variables > Actions** and add:
- `VPS_HOST`: Your VPS IP address (e.g. `123.45.67.89`)
- `VPS_USER`: `root` (or your deploy user)
- `VPS_SSH_KEY`: Your private SSH key (`id_rsa` or `id_ed25519`)
- `VPS_PORT`: `22` (default)

---

## 5. Operations, Backups & Maintenance

### Checking Container Status
```bash
docker compose ps
```

### Viewing Live Logs
```bash
# View backend application logs
docker compose logs -f app

# View web server access & error logs
docker compose logs -f nginx

# View SSL renewal logs
docker compose logs -f certbot
```

### Performing an Immediate Database Backup
```bash
./backup-db.sh
```
Backups are saved as compressed `.json.gz` files in `/opt/petzeustech/backups/`.

### Restoring a Database Backup
If you ever need to restore your database from a previous snapshot:
```bash
# 1. Stop the application container
docker compose stop app

# 2. Extract your chosen backup file
gunzip -c backups/petzeustech_db_YYYYMMDD_HHMMSS.json.gz > data/db.json

# 3. Restart the application container
docker compose start app
```

### Testing SSL Certificate Auto-Renewal
Certbot automatically checks certificate expiration every 12 hours. You can test a dry run anytime:
```bash
docker compose run --rm certbot renew --dry-run
```

---

## 6. Summary of Key Achievements
- Cleaned the homepage by removing intrusive floating banners and top pop-ups.
- Replaced the digital art monolith with the authentic **Cameroon & Global** engineering showcase.
- Removed the lab simulator / "in action" section, allowing the homepage to flow directly into the **Six Specialized Technology Departments**.
- Redid the hero image with authentic African engineering photography (`heroTech`) and crisp `ptLogo` branding.
- Created all production Docker, Nginx, Let's Encrypt SSL, and automated continuous deployment scripts for `petzeustech.com`.
