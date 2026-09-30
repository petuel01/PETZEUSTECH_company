# PETZEUSTECH Security Policy & Hardening Guidelines

Security is built directly into every layer of PETZEUSTECH. We do not treat security as an afterthought.

---

## 1. Core Security Principles

1. **Never Trust Client Data**:
   All inputs submitted by users (forms, query strings, headers) are validated, sanitized, and type-checked on the server before processing.

2. **Zero Plaintext Passwords**:
   All passwords are encrypted with strong one-way cryptographic hashing (bcrypt / PBKDF2 with salt) before saving to the database.

3. **Safe WhatsApp Protocol**:
   When visitors click "Continue on WhatsApp", the generated message contains **only** public request information (Name, Department, Service, Date, Town, Description, Reference). Private user IDs, database keys, or auth tokens are strictly excluded.

4. **Secret Isolation**:
   API keys (Gemini API, database passwords, OAuth secrets) are strictly kept on the server environment. The frontend code never bundles or exposes server credentials.

5. **Role-Based Access Control (RBAC)**:
   Normal customers are strictly prevented from viewing or modifying other customers' records or accessing admin endpoints (`/api/admin/*`). Admin routes require cryptographic tokens or admin session verification.

6. **CSRF & Rate Limiting**:
   Sensitive endpoints (booking submissions, login, contact form) implement rate limiting to prevent spam, credential stuffing, and brute force attacks.

7. **Audit Logging**:
   Critical actions (status transitions, administrative logins, department changes) are recorded with timestamps, user IDs, and action details in the `audit_logs` table.

---

## 2. Reporting a Vulnerability

If you discover a security vulnerability in PETZEUSTECH, please report it immediately:
- **Email**: baifempetuel0.2@gmail.com
- **Direct WhatsApp**: +237 677 251 088
- **Location**: Tombel, Cameroon

We will respond within 24 hours to investigate and resolve confirmed issues.
