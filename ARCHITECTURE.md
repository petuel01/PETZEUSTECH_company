# PETZEUSTECH System Architecture

This document describes the high-level design, data flow, security model, and component layout of the PETZEUSTECH platform.

## 1. High-Level Architecture Diagram

```
[ Visitor / Client Browser ] (Mobile Android, Tablet, Desktop)
          │
          │ HTTPS (Port 3000 in AI Studio / Port 443 on Linux VPS)
          ▼
   [ Nginx Reverse Proxy / Static Router ]
          │
    ┌─────┴────────────────────────────────┐
    ▼                                      ▼
[ Client Application ]             [ Server & API Engine ]
React 19 + TypeScript + Vite       Express.js (or PHP 8.x on VPS)
- WHITE PETZEUSTECH Design System  - Auth Engine (Google, Email/Pass, GitHub)
- State Management & Router        - Booking Engine & Reference Generator
- Customer Dashboard               - Admin Control APIs (Protected)
- Booking & WhatsApp Generator     - Blog & Portfolio CMS Endpoints
- Admin Control Panel              - Gemini ZeusAI Tech Assistant Proxy
    │                                      │
    └──────────────────┬───────────────────┘
                       ▼
        [ Persistence & Storage ]
        - Development: Node JSON Database (`/data/db.json`)
        - Production: MySQL / MariaDB (`schema.sql`)
```

## 2. Directory Structure

```
├── /data/                  # Persistent data store for Node/Express environment
│   └── db.json             # Seeded JSON database (users, bookings, posts, etc.)
├── /public/                # Static assets, logos, favicon, robots.txt, sitemap.xml
├── /src/
│   ├── components/         # Reusable design system & layout components
│   │   ├── Navbar.tsx      # Responsive header with mobile menu & status
│   │   ├── Footer.tsx      # Comprehensive company footer with contact info
│   │   ├── Modal.tsx       # Reusable accessible dialog
│   │   ├── ZeusAIAssistant.tsx # Interactive AI tech consulting assistant
│   │   └── WhatsAppButton.tsx  # Reusable WhatsApp action trigger
│   ├── pages/              # All 18 company pages
│   │   ├── Home.tsx        # Modern homepage with hero, highlights, stats
│   │   ├── About.tsx       # Company story, mission, founder Petuel Baifem
│   │   ├── Services.tsx    # 6 company departments & real booking scopes
│   │   ├── ServiceDetailModal.tsx # Full breakdown of department capabilities
│   │   ├── Projects.tsx    # Real portfolio with honest status tags
│   │   ├── Blog.tsx        # Knowledge hub with 7 core categories
│   │   ├── Contact.tsx     # Direct channels, Tombel Cameroon, inquiry form
│   │   ├── BookService.tsx # Full booking workflow + WhatsApp integration
│   │   ├── SignIn.tsx      # 3 authentication methods (Google, Email, GitHub)
│   │   ├── SignUp.tsx      # Account creation with validation
│   │   ├── CustomerDashboard.tsx # Profile, bookings, service history
│   │   ├── AdminDashboard.tsx    # Management hub: bookings, CMS, messages, users
│   │   ├── PrivacyPolicy.tsx     # Transparent privacy practices
│   │   ├── TermsOfService.tsx    # Client & service terms
│   │   └── NotFound.tsx          # Clean 404 page
│   ├── types/              # Strict TypeScript models & interfaces
│   │   └── index.ts
│   ├── data/               # Seed data for departments, services, projects
│   │   ├── companyData.ts
│   └── lib/                # Client utilities, API client, WhatsApp helper
│       ├── api.ts
│       └── whatsapp.ts
├── server.ts               # Express 4 server & API routes
├── schema.sql              # Production MySQL/MariaDB database DDL
├── README.md               # Beginner-friendly master guide
├── PROJECT_STATUS.md       # Current state and completion checklist
├── CHANGELOG.md            # Log of changes and updates
├── DECISIONS.md            # Architectural decisions log
├── SETUP.md                # Local and server installation steps
├── SECURITY.md             # Security policies, rules, and best practices
├── DEPLOYMENT.md           # Nginx, VPS, Docker, aaPanel, and cPanel guide
└── ROADMAP.md              # Future phases and subdomain architecture
```

## 3. Subdomain Mapping Plan (Future-Ready)

| Subdomain | Planned Role |
| :--- | :--- |
| `www.petzeustech.com` | Main Corporate & Marketing Website |
| `app.petzeustech.com` | Customer Portal & Client Project Dashboard |
| `blog.petzeustech.com` | Knowledge Base, Tech Tutorials & Company News |
| `academy.petzeustech.com` | Practical IT & Digital Skills Course Platform |
| `cloud.petzeustech.com` | CloudCore Hosting, VPS Provisioning & DNS Management |
| `status.petzeustech.com` | Real-time Uptime Monitor for Hosted Client Systems |
| `api.petzeustech.com` | REST API for Client Integration & WhatsApp Webhooks |
| `lab.petzeustech.com` | Innovation Sandbox for R&D (Flutter, AI/ML, Hardware) |
| `ai.petzeustech.com` | ZeusAI Business Intelligence & Customer Automation |
| `dev.petzeustech.com` | Staging & Developer Preview Environment |
