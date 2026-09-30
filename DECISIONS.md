# PETZEUSTECH Architectural Decisions Record (ADR)

This file documents every significant technical, visual, and architectural decision made for PETZEUSTECH.
Rule: Whenever an approved decision changes, record what changed, why, and preserve previous decisions.

---

## [ADR-001] Visual Direction: WHITE PETZEUSTECH Blueprint
- **Date**: 2026-09-13
- **Status**: Approved & Active
- **Decision**: Adopt the WHITE PETZEUSTECH concept as the official brand aesthetic:
  - Base: Crisp light backgrounds (`#FFFFFF`, `#F8FAFC`, `#F1F5F9`)
  - Primary text: Deep Navy (`#0A192F`, `#0F172A`)
  - Primary Action: Electric Blue (`#2563EB`, `#1D4ED8`)
  - Subtle Accents: Controlled Indigo/Purple-Pink gradient touches & Cyan high-tech indicators
  - Typography: Outfit (Display & headings) + Plus Jakarta Sans (Body & functional labels)
- **Rationale**: Clean, high-trust, modern, African, and tech-forward. Ensures maximum contrast, readability, and speed across all devices (including mobile Android on 3G/4G).

---

## [ADR-002] Unified Full-Stack Architecture with Dual-Stack PHP/MySQL Portability
- **Date**: 2026-09-13
- **Status**: Approved & Active
- **Decision**: Build the live interactive application using TypeScript, React 19, Vite, and Express 4, backed by a persistent file/JSON database engine on Node (`/data/db.json`), while simultaneously providing a production-grade SQL schema (`/schema.sql`) and standalone PHP REST API bridge.
- **Rationale**: Enables immediate, zero-friction local and cloud execution on Google AI Studio / Cloud Run, while providing full turnkey deployment files for PETZEUSTECH's primary production target: Linux VPS (cPanel/aaPanel, Nginx, PHP 8.x, and MySQL 8.0).

---

## [ADR-003] Real 3-Method Authentication Engine
- **Date**: 2026-09-13
- **Status**: Approved & Active
- **Decision**: Implement exactly 3 authentication methods:
  1. Google Identity / OAuth 2.0
  2. Email + Password (with registration, validation, and simulated/secure reset tokens)
  3. GitHub OAuth 2.0
- **Crucial UX Clarification**: Prominently distinguish "Google OAuth" (1-click token) from "Email/Password" (which can be any email, including @gmail.com), preventing user confusion.

---

## [ADR-004] Real Booking Workflow & Safe WhatsApp Protocol
- **Date**: 2026-09-13
- **Status**: Approved & Active
- **Decision**: 
  - Every booking generates a unique sequential reference code: `PTZ-YYYYMMDD-XXXX`.
  - Bookings are stored in the server database with audit timestamps, customer details, and initial status `Pending`.
  - A formatted, URL-encoded WhatsApp message is generated with zero confidential database tokens.
  - Users can immediately continue the conversation with the founder at `+237 677 251 088`.
  - Admin has full power to transition status: `Pending`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`, `Needs More Information`.

---

## [ADR-005] Honest Departmental Scoping
- **Date**: 2026-09-13
- **Status**: Approved & Active
- **Decision**: Commercially advertise only what the founder and company actively deliver today across the 6 official departments:
  1. Software Labs (Web apps, PHP/MySQL, WordPress, custom tools)
  2. CloudCore (VPS, Linux, Nginx, Docker, Domains, SSL, cPanel/aaPanel)
  3. Graphics (Flyers, posters, Canva, social media assets, branding)
  4. Electronics (Phone troubleshooting, screen replacements, Windows install, laptop maintenance - strictly non-motherboard)
  5. Ads / Digital Marketing (Facebook Ads, Google Ads, SEO, business visibility)
  6. IT Academy (Practical hands-on tech training, web, graphics, hosting, AI tools)
  - All R&D areas (Laravel, Flutter, AI/ML, advanced electronics) are designated as "Lab / In Progress / Planned" to maintain 100% honesty and trust.
