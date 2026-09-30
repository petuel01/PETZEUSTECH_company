# PETZEUSTECH Local & Server Setup Guide

This guide explains how to install, configure, and run PETZEUSTECH step-by-step. It is written in simple English for beginners and experienced developers alike.

---

## 1. Prerequisites

Make sure your computer or server has:
- **Node.js**: Version 18.x, 20.x, or 22.x LTS
- **npm**: Version 9.x or 10.x
- **Git**: For version control
- (Optional for VPS deployment) **MySQL 8.0+** or **MariaDB 10.5+** and **Nginx**

---

## 2. Fast Setup (Node.js Full-Stack)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/petzeustech/platform.git
   cd platform
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to configure your keys:
   - `GEMINI_API_KEY`: Required for ZeusAI smart tech advisor (automatically injected in AI Studio).
   - `SESSION_SECRET`: A random 32-character string for securing sessions.
   - `ADMIN_KEY`: Key used to authenticate administrative operations (`petzeustech_admin_2026`).

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

5. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

---

## 3. Seeded Accounts & Credentials

For local testing and administration:

| Role | Email | Password | Admin Key |
| :--- | :--- | :--- | :--- |
| **Founder / Admin** | `baifempetuel0.2@gmail.com` | `Petzeus@2026!` | `petzeustech_admin_2026` |
| **Demo Customer** | `client@example.com` | `Customer@2026` | N/A |

---

## 4. Setting Up Authentication Providers

### A. Google OAuth (Google Identity)
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project named **PETZEUSTECH Web**.
3. Under **APIs & Services > OAuth consent screen**, set user type to **External** and add your app name.
4. Under **Credentials**, create an **OAuth 2.0 Client ID** (Web application).
5. Add Authorized JavaScript Origins:
   - `http://localhost:3000`
   - `https://petzeustech.com`
6. Put the Client ID in `.env` under `GOOGLE_CLIENT_ID`.

### B. GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Click **New OAuth App**.
3. Name: `PETZEUSTECH Platform`
4. Homepage URL: `https://petzeustech.com`
5. Authorization Callback URL: `https://petzeustech.com/api/auth/github/callback`
6. Copy the Client ID and Secret into `.env`.
