# PETZEUSTECH — Digital Solutions Platform

> **A Technology & Innovation Company — Powering Africa's Digital Future**  
> Main Domain: [petzeustech.com](https://petzeustech.com)  
> WhatsApp: **+237 677 251 088**  
> Email: **baifempetuel0.2@gmail.com**  
> Location: **Tombel, Cameroon**  
> Founder & Lead Engineer: **Petuel Baifem**

---

## 1. Company & Project Purpose

PETZEUSTECH builds practical digital products, technology services, and creative solutions for individuals, businesses, and organizations across Cameroon, Africa, and the global digital economy.

This platform is the official, production-ready corporate website and customer/admin portal. It provides:
- A crystal-clear presentation of what PETZEUSTECH does across its **6 core departments**.
- An honest portfolio showcasing projects that are **Completed**, **In Progress**, **Prototypes**, or **Planned**.
- A real **service booking system** that issues verifiable reference codes and enables frictionless communication via WhatsApp.
- A **customer dashboard** for clients to track the status of their service requests.
- An **admin control dashboard** allowing PETZEUSTECH management to review bookings, update statuses, manage services, publish articles, and view incoming messages.
- An integrated **ZeusAI Technical Assistant** powered by Google Gemini to help visitors diagnose computer, website, or hosting issues in simple English.

---

## 2. Technologies Used

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (smooth animations), Lucide React (vector icons).
- **Backend**: Express.js 4 (Node.js runtime), RESTful JSON APIs, Vite middleware.
- **Database**:
  - **Live AI Studio / Container**: Persistent JSON database engine (`/data/db.json`) ensuring state is saved across sessions.
  - **Production VPS Target**: MySQL 8.0 / MariaDB 10.6+ with full DDL schema in `schema.sql`.
- **Artificial Intelligence**: Server-side Google Gemini 2.5 (`@google/genai`) for the ZeusAI interactive tech consulting assistant.
- **Styling**: WHITE PETZEUSTECH design system (light clean backgrounds, deep navy text `#0A192F`, electric blue buttons `#2563EB`, subtle purple/pink gradients, and cyan badges).

---

## 3. Folder Structure

```
├── /data/                  # Persistent data store (db.json)
├── /public/                # Static public assets (favicons, robots.txt)
├── /src/
│   ├── components/         # Reusable UI components (Navbar, Footer, Modal, AI Assistant)
│   ├── pages/              # 18 Application pages (Home, About, Services, Book, Dashboards)
│   ├── types/              # Strict TypeScript interfaces and schemas
│   ├── data/               # Company departmental catalog and seed content
│   ├── lib/                # API client, WhatsApp helper, date formatters
│   ├── App.tsx             # Root router, authentication context, and toast alerts
│   ├── main.tsx            # React DOM mounting entry point
│   └── index.css           # Tailwind CSS imports and typography
├── server.ts               # Express backend with authentication, bookings, and ZeusAI API
├── schema.sql              # MySQL production database schema
├── ARCHITECTURE.md         # High-level system design
├── DECISIONS.md            # Architecture Decision Records (ADR)
├── PROJECT_STATUS.md       # Health and completion checklist
├── CHANGELOG.md            # Version change history
├── SETUP.md                # Step-by-step installation instructions
├── SECURITY.md             # Security policy and data validation rules
├── DEPLOYMENT.md           # Nginx, VPS, Docker, and cPanel/aaPanel guide
└── ROADMAP.md              # Long-term growth and subdomain plan
```

---

## 4. Local Setup

1. **Install Node.js**: Ensure you have Node.js version 18 or newer installed on your computer.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**: Copy `.env.example` to `.env`.
   ```bash
   cp .env.example .env
   ```
4. **Start Development**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

---

## 5. Environment Variables (`.env`)

| Variable | Description |
| :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API key for the ZeusAI assistant (injected automatically in AI Studio). |
| `APP_URL` | The public URL of the application. |
| `SESSION_SECRET` | Secret key used to sign sessions and tokens. |
| `ADMIN_KEY` | Administrative authorization key (default: `petzeustech_admin_2026`). |
| `GOOGLE_CLIENT_ID` | Optional: Google OAuth 2.0 Web Client ID. |
| `GITHUB_CLIENT_ID` | Optional: GitHub OAuth Application Client ID. |

---

## 6. Database Setup

### Local / Cloud Run Container
The database runs automatically using the built-in database engine in `/server.ts` and persists records to `/data/db.json`. No separate database server installation is required.

### Production MySQL / MariaDB Setup
To run with MySQL on your Linux VPS or aaPanel:
1. Log in to your MySQL command line or phpMyAdmin.
2. Create database: `CREATE DATABASE petzeus_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
3. Run the import:
   ```bash
   mysql -u username -p petzeus_db < schema.sql
   ```

---

## 7. Authentication: 3 Distinct Methods

PETZEUSTECH supports exactly 3 secure sign-in methods:

1. **Continue with Google**:
   - Uses Google Identity OAuth 2.0.
   - Instantly retrieves the user's verified name, email, and Google profile picture with one click.
2. **Sign in with Email & Password**:
   - Standard email and password sign-in.
   - Works with **any email address** (including Gmail, Yahoo, Outlook, or custom business domains).
   - *Note for beginners*: Google OAuth and normal Gmail login are different: Google OAuth uses Google's single sign-on system, whereas email login uses a password stored securely in our system.
3. **Continue with GitHub**:
   - Authenticates developers and IT students using their GitHub account.

---

## 8. Booking & WhatsApp Workflow

1. A customer visits the **Book a Service** page or clicks "Book a Service" on any department.
2. They select their department, service, describe their problem, pick their preferred date and time, and specify their town in Cameroon (or abroad).
3. Upon submitting the form:
   - The system generates an official booking code (e.g., `PTZ-20260913-9481`).
   - The booking is securely saved to the database with status **Pending**.
4. The user is presented with a **"Continue on WhatsApp"** button:
   - Clicking this opens WhatsApp directly addressed to `+237 677 251 088`.
   - The message is safely pre-filled with the customer's name, requested service, preferred date, town, and booking code.
   - **Zero private database keys or tokens are ever placed in the WhatsApp message**.
5. The founder reviews the request on WhatsApp and in the **Admin Dashboard**, transitioning the status from `Pending` to `Confirmed`, `In Progress`, or `Completed`.

---

## 9. Customer Workflow

- **View Live Bookings**: Clients can view their active and past service requests in their **Customer Dashboard**.
- **Status Indicators**: Easy-to-read badges indicate whether work is Pending, Confirmed, In Progress, or Completed.
- **Service History**: Full record of past repairs, web development projects, or graphics delivered.
- **Support**: Quick one-tap channels to message PETZEUSTECH support.

---

## 10. Admin Workflow

- Navigate to the **Admin Dashboard** (available in the account menu or at `/admin`).
- **Manage Bookings**: Filter by status, search by customer name or reference number, and change statuses.
- **Service Catalog**: View and toggle services across all 6 departments.
- **Project CMS**: Manage portfolio items and their honest development statuses.
- **Knowledge / Blog CMS**: Write, publish, or unpublish tutorials and company updates.
- **Contact Messages**: Read messages sent through the website contact form.
- **Audit Logs**: View timestamped logs of all administrative actions.

---

## 11. Security Rules

- **Passwords**: Never stored in plain text. Always encrypted with cryptographic salts.
- **SQL / Query Protection**: All database interactions use prepared statements and parameterized inputs.
- **Least Privilege**: Regular customers have strictly no access to admin management APIs.
- **Zero Exposed Keys**: All API secrets (including Google Gemini keys) reside strictly on the server.

---

## 12. Known Limitations & Future Scope

- **Payment Gateway**: As mandated, online automated credit card / Mobile Money payments are not yet enabled and will be launched in Phase 4 upon explicit approval.
- **Physical Repairs**: PETZEUSTECH Electronics advertises only common repairs, screen replacements, and software setups; specialized motherboard soldering is currently handled on a case-by-case evaluation basis.

---

© 2026 PETZEUSTECH. All rights reserved. Powering Africa's Digital Future.
