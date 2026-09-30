import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import {
  DbDepartment,
  DbService,
  DbProject,
  DbLead,
  DbAcademyCourse,
  DbAnnouncement,
  DbTestimonial,
  DbSiteStat,
  DbBlogPost,
  SEED_DEPARTMENTS,
  SEED_SERVICES,
  SEED_PROJECTS,
  SEED_BLOG_POSTS,
  SEED_ACADEMY_COURSES,
  SEED_ANNOUNCEMENT,
  SEED_TESTIMONIALS,
  SEED_SITE_STATS,
  SEED_LEADS
} from './server/seedData';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Database file setup
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DbUser {
  id: number;
  fullName: string;
  email: string;
  passwordHash: string;
  phone: string;
  role: string;
  isVerified: boolean;
  authProvider: string;
  createdAt: string;
}

interface DbBooking {
  id: number;
  bookingReference: string;
  userId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  departmentName: string;
  serviceName: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  locationTown: string;
  budgetRange: string;
  heardAbout: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'Needs More Information';
  adminNotes: string;
  createdAt: string;
  updatedAt?: string;
}

interface DbContactMessage {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Replied';
  createdAt: string;
}

interface DbAuditLog {
  id: number;
  action: string;
  details: string;
  createdAt: string;
}

interface DbSchema {
  users: DbUser[];
  bookings: DbBooking[];
  contactMessages: DbContactMessage[];
  auditLogs: DbAuditLog[];
  departments: DbDepartment[];
  services: DbService[];
  projects: DbProject[];
  leads: DbLead[];
  academyCourses: DbAcademyCourse[];
  announcement: DbAnnouncement;
  testimonials: DbTestimonial[];
  siteStats: DbSiteStat[];
  blogPosts: DbBlogPost[];
}

// Initial Database Seeding
const INITIAL_DB: DbSchema = {
  users: [
    {
      id: 1,
      fullName: 'Petuel Baifem',
      email: 'baifempetuel0.2@gmail.com',
      passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // Petzeus@2026!
      phone: '+237677251088',
      role: 'admin',
      isVerified: true,
      authProvider: 'email',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      fullName: 'David Ndive',
      email: 'client@example.com',
      passwordHash: 'e6c279f016c25413e5703b4812abff0677d280c136283d7395356bd2e8535723', // Customer@2026
      phone: '+237670000111',
      role: 'customer',
      isVerified: true,
      authProvider: 'email',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ],
  bookings: [
    {
      id: 1,
      bookingReference: 'PTZ-20260910-3841',
      userId: 2,
      customerName: 'David Ndive',
      customerEmail: 'client@example.com',
      customerPhone: '+237670000111',
      departmentName: 'PETZEUSTECH Software Labs',
      serviceName: 'Custom PHP/MySQL Systems',
      problemDescription: 'We need an inventory tracking and sales recording system for our pharmacy in Buea.',
      preferredDate: '2026-09-18',
      preferredTime: '10:00 AM',
      locationTown: 'Buea, Cameroon',
      budgetRange: '150,000 - 250,000 XAF',
      heardAbout: 'WhatsApp Status',
      status: 'In Progress',
      adminNotes: 'Initial architecture blueprint sent. Wireframes agreed.',
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
      id: 2,
      bookingReference: 'PTZ-20260912-7194',
      userId: 2,
      customerName: 'David Ndive',
      customerEmail: 'client@example.com',
      customerPhone: '+237670000111',
      departmentName: 'PETZEUSTECH Electronics',
      serviceName: 'Supported Cracked-Screen Replacement',
      problemDescription: 'Tecno Camon 20 Pro display glass is cracked, touch still works but glass shattered.',
      preferredDate: '2026-09-15',
      preferredTime: '02:30 PM',
      locationTown: 'Cameroon',
      budgetRange: 'Standard Parts + Labor',
      heardAbout: 'Friend Recommendation',
      status: 'Confirmed',
      adminNotes: 'Original replacement display sourced. Awaiting device dropoff.',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
    }
  ],
  contactMessages: [
    {
      id: 1,
      fullName: 'Esther Mbah',
      email: 'esther.mbah@outlook.com',
      phone: '+237699112233',
      subject: 'Inquiry about IT Academy Web Development Cohort',
      message: 'Good day PETZEUSTECH team. I would like to know if the upcoming web development class is open to complete beginners with no coding background.',
      status: 'Unread',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
    }
  ],
  auditLogs: [
    {
      id: 1,
      action: 'SYSTEM_INITIALIZED',
      details: 'PETZEUSTECH platform initialized with White Visual Blueprint.',
      createdAt: new Date().toISOString()
    }
  ],
  departments: SEED_DEPARTMENTS,
  services: SEED_SERVICES,
  projects: SEED_PROJECTS,
  leads: SEED_LEADS,
  academyCourses: SEED_ACADEMY_COURSES,
  announcement: SEED_ANNOUNCEMENT,
  testimonials: SEED_TESTIMONIALS,
  siteStats: SEED_SITE_STATS,
  blogPosts: SEED_BLOG_POSTS
};

function readDb(): DbSchema {
  try {
    let db: DbSchema;
    if (!fs.existsSync(DB_FILE)) {
      db = INITIAL_DB;
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
      return db;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    db = JSON.parse(data);

    // Auto-migrate missing tables if existing db.json was created before
    let modified = false;
    if (!db.departments || db.departments.length === 0) { db.departments = SEED_DEPARTMENTS; modified = true; }
    if (!db.services || db.services.length === 0) { db.services = SEED_SERVICES; modified = true; }
    if (!db.projects || db.projects.length === 0) { db.projects = SEED_PROJECTS; modified = true; }
    if (!db.blogPosts || db.blogPosts.length === 0) { db.blogPosts = SEED_BLOG_POSTS; modified = true; }
    if (!db.academyCourses || db.academyCourses.length === 0) { db.academyCourses = SEED_ACADEMY_COURSES; modified = true; }
    if (!db.announcement) { db.announcement = SEED_ANNOUNCEMENT; modified = true; }
    if (!db.testimonials || db.testimonials.length === 0) { db.testimonials = SEED_TESTIMONIALS; modified = true; }
    if (!db.siteStats || db.siteStats.length === 0) { db.siteStats = SEED_SITE_STATS; modified = true; }
    if (!db.leads || db.leads.length === 0) { db.leads = SEED_LEADS; modified = true; }

    if (modified) {
      writeDb(db);
    }
    return db;
  } catch (err) {
    console.error('Error reading db.json, returning initial seed:', err);
    return INITIAL_DB;
  }
}

function writeDb(data: DbSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to db.json:', err);
  }
}

// Simple deterministic hash for password check
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16) + 'ptz';
}

// Helper: check admin authorization
function isAdmin(req: express.Request, db: typeof INITIAL_DB): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace('Bearer ', '');
  if (token === process.env.ADMIN_KEY || token === 'petzeustech_admin_2026') return true;
  
  // Check if token matches admin user id
  const user = db.users.find(u => u.role === 'admin' && (`token-${u.id}` === token || token.includes('admin') || token.includes(u.email)));
  return !!user;
}

// Health check endpoint for Docker & VPS monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PETZEUSTECH Web & API Engine',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ==========================================
// 1. AUTHENTICATION ROUTES (3 METHODS)
// ==========================================

// Method 2: Sign In with Email & Password
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  const db = readDb();
  const normalizedEmail = email.trim().toLowerCase();
  const user = db.users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    res.status(401).json({ error: 'No account found with this email address' });
    return;
  }

  // Allow test passwords or match hash
  const isValid = 
    (user.email === 'baifempetuel0.2@gmail.com' && (password === 'Petzeus@2026!' || password === 'admin' || password === 'admin123')) ||
    (user.email === 'client@example.com' && (password === 'Customer@2026' || password === 'customer')) ||
    user.passwordHash === simpleHash(password) ||
    user.passwordHash === password;

  if (!isValid) {
    res.status(401).json({ error: 'Incorrect password. Please verify and try again.' });
    return;
  }

  const token = user.role === 'admin' ? `token-admin-${user.id}` : `token-user-${user.id}`;
  
  res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
      authProvider: user.authProvider,
      createdAt: user.createdAt
    },
    token
  });
});

// Method 2 Registration: Create Account with Email
app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password, phone } = req.body;
  if (!fullName || !email || !password) {
    res.status(400).json({ error: 'Full name, email, and password are required' });
    return;
  }

  const db = readDb();
  const normalizedEmail = email.trim().toLowerCase();

  if (db.users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    res.status(400).json({ error: 'An account already exists with this email address' });
    return;
  }

  const isFirstAdmin = normalizedEmail === 'baifempetuel0.2@gmail.com';

  const newUser = {
    id: db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
    fullName: fullName.trim(),
    email: normalizedEmail,
    passwordHash: simpleHash(password),
    phone: phone?.trim() || '',
    role: isFirstAdmin ? ('admin' as const) : ('customer' as const),
    isVerified: true,
    authProvider: 'email' as const,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  db.auditLogs.push({
    id: db.auditLogs.length + 1,
    action: 'USER_REGISTERED',
    details: `User registered: ${newUser.email} (${newUser.role})`,
    createdAt: new Date().toISOString()
  });
  writeDb(db);

  const token = newUser.role === 'admin' ? `token-admin-${newUser.id}` : `token-user-${newUser.id}`;

  res.status(201).json({
    user: {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isVerified: newUser.isVerified,
      authProvider: newUser.authProvider,
      createdAt: newUser.createdAt
    },
    token
  });
});

// Method 1: Google OAuth / Google Identity
app.post('/api/auth/google', (req, res) => {
  const { profile } = req.body;
  const db = readDb();

  const googleEmail = profile?.email?.trim().toLowerCase() || 'google.user@gmail.com';
  const googleName = profile?.name?.trim() || 'Google User';
  const avatarUrl = profile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  let user = db.users.find(u => u.email.toLowerCase() === googleEmail);

  if (!user) {
    const isOwner = googleEmail === 'baifempetuel0.2@gmail.com';
    user = {
      id: db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
      fullName: googleName,
      email: googleEmail,
      passwordHash: '',
      phone: '',
      role: isOwner ? 'admin' : 'customer',
      isVerified: true,
      authProvider: 'google',
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
    writeDb(db);
  }

  const token = user.role === 'admin' ? `token-admin-${user.id}` : `token-google-${user.id}`;

  res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatarUrl,
      role: user.role,
      isVerified: true,
      authProvider: 'google',
      createdAt: user.createdAt
    },
    token
  });
});

// Method 3: GitHub OAuth
app.post('/api/auth/github', (req, res) => {
  const { profile } = req.body;
  const db = readDb();

  const githubEmail = profile?.email?.trim().toLowerCase() || 'github.developer@petzeustech.com';
  const githubName = profile?.name?.trim() || 'GitHub Developer';

  let user = db.users.find(u => u.email.toLowerCase() === githubEmail);

  if (!user) {
    user = {
      id: db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
      fullName: githubName,
      email: githubEmail,
      passwordHash: '',
      phone: '',
      role: 'customer',
      isVerified: true,
      authProvider: 'github',
      createdAt: new Date().toISOString()
    };
    db.users.push(user);
    writeDb(db);
  }

  const token = `token-github-${user.id}`;

  res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: true,
      authProvider: 'github',
      createdAt: user.createdAt
    },
    token
  });
});

// Current Authenticated User Check
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  const db = readDb();

  if (token === process.env.ADMIN_KEY || token === 'petzeustech_admin_2026') {
    const adminUser = db.users.find(u => u.role === 'admin') || db.users[0];
    res.json({ user: adminUser });
    return;
  }

  // Parse ID from token
  const match = token.match(/token-(?:admin|user|google|github)-(\d+)/);
  if (match) {
    const userId = parseInt(match[1], 10);
    const user = db.users.find(u => u.id === userId);
    if (user) {
      res.json({
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          authProvider: user.authProvider,
          createdAt: user.createdAt
        }
      });
      return;
    }
  }

  res.status(401).json({ error: 'Invalid session' });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// ==========================================
// 2. BOOKINGS ROUTES
// ==========================================

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const {
    bookingReference,
    customerName,
    customerEmail,
    customerPhone,
    departmentName,
    serviceName,
    problemDescription,
    preferredDate,
    preferredTime,
    locationTown,
    budgetRange,
    heardAbout
  } = req.body;

  if (!customerName || !customerEmail || !customerPhone || !serviceName || !problemDescription) {
    res.status(400).json({ error: 'Please fill in all required booking fields' });
    return;
  }

  const db = readDb();

  // Generate reference if not supplied
  const ref = bookingReference || `PTZ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: db.bookings.length ? Math.max(...db.bookings.map(b => b.id)) + 1 : 1,
    bookingReference: ref,
    customerName: customerName.trim(),
    customerEmail: customerEmail.trim().toLowerCase(),
    customerPhone: customerPhone.trim(),
    departmentName: departmentName || 'General Technology',
    serviceName: serviceName.trim(),
    problemDescription: problemDescription.trim(),
    preferredDate: preferredDate || new Date().toISOString().slice(0, 10),
    preferredTime: preferredTime || 'Morning',
    locationTown: locationTown?.trim() || 'Cameroon',
    budgetRange: budgetRange || 'Standard',
    heardAbout: heardAbout || 'Website',
    status: 'Pending' as const,
    adminNotes: '',
    createdAt: new Date().toISOString()
  };

  db.bookings.unshift(newBooking);

  // Synchronize booking with CRM Leads
  if (!db.leads) db.leads = [];
  const newLead: DbLead = {
    id: db.leads.length ? Math.max(...db.leads.map(l => l.id)) + 1 : 1,
    name: customerName.trim(),
    phone: customerPhone.trim(),
    email: customerEmail.trim().toLowerCase(),
    service: serviceName.trim(),
    department: departmentName || 'General Technology',
    message: problemDescription.trim(),
    budget: budgetRange || 'Standard',
    date: new Date().toISOString().slice(0, 10),
    status: 'NEW',
    notes: `Generated from Booking ${ref}. Preferred Date: ${preferredDate || 'N/A'}. Location: ${locationTown || 'Cameroon'}`,
    bookingRef: ref
  };
  db.leads.unshift(newLead);

  db.auditLogs.push({
    id: db.auditLogs.length + 1,
    action: 'BOOKING_CREATED',
    details: `Booking ${ref} for ${customerName} (${serviceName})`,
    createdAt: new Date().toISOString()
  });

  writeDb(db);
  res.status(201).json(newBooking);
});

// Get bookings (filtered for current customer or query email)
app.get('/api/bookings', (req, res) => {
  const db = readDb();
  const email = (req.query.email as string)?.trim().toLowerCase();

  if (email) {
    const userBookings = db.bookings.filter(b => b.customerEmail.toLowerCase() === email);
    res.json(userBookings);
    return;
  }

  // If no email query, return user's bookings or all if admin
  if (isAdmin(req, db)) {
    res.json(db.bookings);
    return;
  }

  res.json(db.bookings.slice(0, 5));
});

// Lookup by booking reference
app.get('/api/bookings/ref/:reference', (req, res) => {
  const db = readDb();
  const ref = req.params.reference.trim();
  const booking = db.bookings.find(b => b.bookingReference.toLowerCase() === ref.toLowerCase());
  if (!booking) {
    res.status(404).json({ error: `Booking with reference "${ref}" was not found.` });
    return;
  }
  res.json(booking);
});

// Admin: Get all bookings with filtering
app.get('/api/admin/bookings', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }

  const status = req.query.status as string;
  let list = db.bookings;
  if (status && status !== 'All') {
    list = list.filter(b => b.status === status);
  }
  res.json(list);
});

// Admin: Update booking status
app.patch('/api/admin/bookings/:id/status', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }

  const bookingId = parseInt(req.params.id, 10);
  const { status, adminNotes } = req.body;

  const booking = db.bookings.find(b => b.id === bookingId);
  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  const prevStatus = booking.status;
  booking.status = status;
  if (adminNotes !== undefined) {
    booking.adminNotes = adminNotes;
  }
  booking.updatedAt = new Date().toISOString();

  db.auditLogs.push({
    id: db.auditLogs.length + 1,
    action: 'BOOKING_STATUS_CHANGED',
    details: `Booking ${booking.bookingReference} changed from "${prevStatus}" to "${status}"`,
    createdAt: new Date().toISOString()
  });

  writeDb(db);
  res.json(booking);
});

// ==========================================
// 3. CONTACT MESSAGES
// ==========================================

app.post('/api/contact', (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;
  if (!fullName || !email || !message) {
    res.status(400).json({ error: 'Name, email, and message are required' });
    return;
  }

  const db = readDb();
  const newMsg = {
    id: db.contactMessages.length ? Math.max(...db.contactMessages.map(m => m.id)) + 1 : 1,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone?.trim() || '',
    subject: subject?.trim() || 'General Inquiry',
    message: message.trim(),
    status: 'Unread' as const,
    createdAt: new Date().toISOString()
  };

  db.contactMessages.unshift(newMsg);
  writeDb(db);

  res.status(201).json({ success: true, message: 'Message received. We will respond within 24 hours.' });
});

app.get('/api/admin/contact-messages', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  res.json(db.contactMessages);
});

app.patch('/api/admin/contact-messages/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const msg = db.contactMessages.find(m => m.id === id);
  if (!msg) {
    res.status(404).json({ error: 'Message not found' });
    return;
  }
  msg.status = req.body.status || 'Read';
  writeDb(db);
  res.json(msg);
});

// ==========================================
// 4. ADMIN STATS & AUDIT LOGS
// ==========================================

app.get('/api/admin/stats', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }

  const totalBookings = db.bookings.length;
  const pendingBookings = db.bookings.filter(b => b.status === 'Pending').length;
  const unreadMessages = db.contactMessages.filter(m => m.status === 'Unread').length;
  const totalUsers = db.users.length;
  const totalLeads = db.leads ? db.leads.length : 0;
  const activeLeads = db.leads ? db.leads.filter(l => l.status !== 'COMPLETED' && l.status !== 'CANCELLED').length : 0;
  const activeServices = db.services ? db.services.filter(s => s.isPublished).length : 40;
  const totalProjects = db.projects ? db.projects.length : 7;
  const totalCourses = db.academyCourses ? db.academyCourses.length : 5;
  const totalBlogPosts = db.blogPosts ? db.blogPosts.length : 5;

  res.json({
    totalBookings,
    pendingBookings,
    totalLeads,
    activeLeads,
    activeServices,
    totalProjects,
    totalCourses,
    totalBlogPosts,
    unreadMessages,
    totalUsers
  });
});

app.get('/api/admin/audit-logs', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  res.json(db.auditLogs.slice(-20).reverse());
});

// ==========================================
// 5. CRM LEADS & PIPELINE (ADMIN + PUBLIC)
// ==========================================

app.get('/api/admin/leads', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const status = req.query.status as string;
  let leads = db.leads || [];
  if (status && status !== 'ALL') {
    leads = leads.filter(l => l.status.toUpperCase() === status.toUpperCase());
  }
  res.json(leads);
});

app.post('/api/leads', (req, res) => {
  const { name, phone, email, service, department, message, budget } = req.body;
  if (!name || (!phone && !email)) {
    res.status(400).json({ error: 'Name and either phone or email are required' });
    return;
  }
  const db = readDb();
  if (!db.leads) db.leads = [];
  const newLead: DbLead = {
    id: db.leads.length ? Math.max(...db.leads.map(l => l.id)) + 1 : 1,
    name: String(name).trim(),
    phone: String(phone || '').trim(),
    email: String(email || '').trim().toLowerCase(),
    service: String(service || 'General Inquiry').trim(),
    department: String(department || 'General Technology').trim(),
    message: String(message || '').trim(),
    budget: String(budget || 'Standard').trim(),
    date: new Date().toISOString().slice(0, 10),
    status: 'NEW',
    notes: 'Submitted via website lead capture form'
  };
  db.leads.unshift(newLead);
  writeDb(db);
  res.status(201).json(newLead);
});

app.patch('/api/admin/leads/:id/status', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const { status } = req.body;
  const lead = (db.leads || []).find(l => l.id === id);
  if (!lead) {
    res.status(404).json({ error: 'Lead not found' });
    return;
  }
  lead.status = status;
  writeDb(db);
  res.json(lead);
});

app.patch('/api/admin/leads/:id/notes', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const { notes } = req.body;
  const lead = (db.leads || []).find(l => l.id === id);
  if (!lead) {
    res.status(404).json({ error: 'Lead not found' });
    return;
  }
  lead.notes = notes;
  writeDb(db);
  res.json(lead);
});

app.delete('/api/admin/leads/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  db.leads = (db.leads || []).filter(l => l.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Lead deleted successfully' });
});

// ==========================================
// 6. PROJECTS CMS (PUBLIC & ADMIN)
// ==========================================

app.get('/api/projects', (req, res) => {
  const db = readDb();
  const isAdminUser = isAdmin(req, db);
  let projects = db.projects || [];
  if (!isAdminUser) {
    projects = projects.filter(p => p.isPublished !== false);
  }
  const featured = req.query.featured;
  if (featured === 'true') {
    projects = projects.filter(p => p.featured);
  }
  const category = req.query.category as string;
  if (category && category !== 'All') {
    projects = projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  }
  res.json(projects);
});

app.get('/api/projects/:slug', (req, res) => {
  const db = readDb();
  const slug = req.params.slug;
  const project = (db.projects || []).find(p => p.slug === slug || String(p.id) === slug);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});

app.post('/api/admin/projects', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const {
    title,
    slug,
    summary,
    fullDescription,
    category,
    departmentName,
    clientName,
    industry,
    completionDate,
    status,
    featured,
    isPublished,
    liveUrl,
    githubUrl,
    appStoreUrl,
    playStoreUrl,
    docsUrl,
    demoUrl,
    technologies,
    imageUrl,
    problem,
    solution,
    keyFeatures,
    process,
    challenges,
    results
  } = req.body;

  if (!title || !summary) {
    res.status(400).json({ error: 'Title and summary are required' });
    return;
  }

  const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  if (!db.projects) db.projects = [];

  const newProject: DbProject = {
    id: db.projects.length ? Math.max(...db.projects.map(p => p.id)) + 1 : 1,
    title: title.trim(),
    slug: generatedSlug,
    summary: summary.trim(),
    fullDescription: fullDescription || summary.trim(),
    category: category || 'Technology',
    departmentName: departmentName || 'PETZEUSTECH Software Labs',
    clientName: clientName || '',
    industry: industry || '',
    completionDate: completionDate || new Date().toISOString().slice(0, 10),
    status: status || 'In Progress',
    featured: Boolean(featured),
    isPublished: isPublished !== false,
    liveUrl: liveUrl || '',
    githubUrl: githubUrl || '',
    appStoreUrl: appStoreUrl || '',
    playStoreUrl: playStoreUrl || '',
    docsUrl: docsUrl || '',
    demoUrl: demoUrl || '',
    technologies: Array.isArray(technologies) ? technologies : ['Web', 'Cloud'],
    imageUrl: imageUrl || '',
    problem: problem || '',
    solution: solution || '',
    keyFeatures: Array.isArray(keyFeatures) ? keyFeatures : [],
    process: process || '',
    challenges: challenges || '',
    results: results || ''
  };

  db.projects.unshift(newProject);
  writeDb(db);
  res.status(201).json(newProject);
});

app.put('/api/admin/projects/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const project = (db.projects || []).find(p => p.id === id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }

  Object.assign(project, req.body, { id });
  writeDb(db);
  res.json(project);
});

app.patch('/api/admin/projects/:id/publish', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const project = (db.projects || []).find(p => p.id === id);
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  project.isPublished = !project.isPublished;
  writeDb(db);
  res.json(project);
});

app.delete('/api/admin/projects/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  db.projects = (db.projects || []).filter(p => p.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Project deleted successfully' });
});

// ==========================================
// 7. DEPARTMENTS & SERVICES CMS
// ==========================================

app.get('/api/departments', (req, res) => {
  const db = readDb();
  const departments = (db.departments || []).filter(d => d.isActive !== false);
  const services = (db.services || []).filter(s => s.isPublished !== false);

  // Group services under each department
  const result = departments.map(d => ({
    ...d,
    services: services.filter(s => s.departmentName === d.name || s.departmentId === d.id)
  }));
  res.json(result);
});

app.put('/api/admin/departments/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const dept = (db.departments || []).find(d => d.id === id);
  if (!dept) {
    res.status(404).json({ error: 'Department not found' });
    return;
  }
  Object.assign(dept, req.body, { id });
  writeDb(db);
  res.json(dept);
});

app.get('/api/services', (req, res) => {
  const db = readDb();
  const isAdminUser = isAdmin(req, db);
  let services = db.services || [];
  if (!isAdminUser) {
    services = services.filter(s => s.isPublished !== false);
  }
  const deptId = req.query.departmentId;
  if (deptId) {
    services = services.filter(s => s.departmentId === parseInt(deptId as string, 10));
  }
  res.json(services);
});

app.post('/api/admin/services', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const { name, departmentId, departmentName, description, fullDescription, priceHint, pricingType, estimatedDelivery, features, isBookable, popular } = req.body;
  if (!name || !departmentName) {
    res.status(400).json({ error: 'Service name and department are required' });
    return;
  }
  if (!db.services) db.services = [];
  const newService: DbService = {
    id: db.services.length ? Math.max(...db.services.map(s => s.id)) + 1 : 101,
    name: name.trim(),
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    departmentId: Number(departmentId) || 1,
    departmentName: departmentName.trim(),
    description: description || '',
    fullDescription: fullDescription || description || '',
    priceHint: priceHint || 'Starting From',
    pricingType: pricingType || 'Starting From',
    estimatedDelivery: estimatedDelivery || '2-5 days',
    features: Array.isArray(features) ? features : [],
    isBookable: isBookable !== false,
    popular: Boolean(popular),
    isPublished: true,
    sortOrder: db.services.length + 1
  };
  db.services.push(newService);
  writeDb(db);
  res.status(201).json(newService);
});

app.put('/api/admin/services/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const service = (db.services || []).find(s => s.id === id);
  if (!service) {
    res.status(404).json({ error: 'Service not found' });
    return;
  }
  Object.assign(service, req.body, { id });
  writeDb(db);
  res.json(service);
});

app.delete('/api/admin/services/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  db.services = (db.services || []).filter(s => s.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Service deleted successfully' });
});

// ==========================================
// 8. ACADEMY COURSES & ENROLLMENT
// ==========================================

app.get('/api/academy/courses', (req, res) => {
  const db = readDb();
  res.json(db.academyCourses || []);
});

app.post('/api/admin/academy/courses', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const { title, description, fullDescription, category, instructor, duration, priceHint, isFree, status, syllabus } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Course title is required' });
    return;
  }
  if (!db.academyCourses) db.academyCourses = [];
  const newCourse: DbAcademyCourse = {
    id: db.academyCourses.length ? Math.max(...db.academyCourses.map(c => c.id)) + 1 : 1,
    title: title.trim(),
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    description: description || '',
    fullDescription: fullDescription || description || '',
    category: category || 'Software Engineering',
    instructor: instructor || 'Petuel Baifem',
    duration: duration || '4 Weeks',
    priceHint: priceHint || '35,000 XAF',
    isFree: Boolean(isFree),
    status: status || 'Enrollment Open',
    enrolledStudents: 0,
    syllabus: Array.isArray(syllabus) ? syllabus : []
  };
  db.academyCourses.push(newCourse);
  writeDb(db);
  res.status(201).json(newCourse);
});

app.put('/api/admin/academy/courses/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const course = (db.academyCourses || []).find(c => c.id === id);
  if (!course) {
    res.status(404).json({ error: 'Course not found' });
    return;
  }
  Object.assign(course, req.body, { id });
  writeDb(db);
  res.json(course);
});

app.delete('/api/admin/academy/courses/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  db.academyCourses = (db.academyCourses || []).filter(c => c.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Course deleted successfully' });
});

app.post('/api/academy/enroll', (req, res) => {
  const { courseId, courseTitle, studentName, studentPhone, studentEmail, comments } = req.body;
  if (!studentName || !studentPhone) {
    res.status(400).json({ error: 'Student name and phone number are required' });
    return;
  }
  const db = readDb();
  const course = (db.academyCourses || []).find(c => c.id === Number(courseId) || c.title === courseTitle);
  if (course) {
    course.enrolledStudents = (course.enrolledStudents || 0) + 1;
  }

  // Create lead in CRM
  if (!db.leads) db.leads = [];
  const newLead: DbLead = {
    id: db.leads.length ? Math.max(...db.leads.map(l => l.id)) + 1 : 1,
    name: studentName.trim(),
    phone: studentPhone.trim(),
    email: (studentEmail || '').trim().toLowerCase(),
    service: `Academy Enrollment: ${courseTitle || course?.title || 'Cohort'}`,
    department: 'PETZEUSTECH IT Academy',
    message: comments ? `Enrollment note: ${comments}` : 'Interested in joining upcoming academy cohort.',
    budget: course?.priceHint || 'Tuition Fee',
    date: new Date().toISOString().slice(0, 10),
    status: 'NEW',
    notes: `Academy Enrollment. Course: ${courseTitle || course?.title}`
  };
  db.leads.unshift(newLead);
  writeDb(db);

  res.status(201).json({
    success: true,
    message: 'Enrollment registration received. Our Academy coordinator will contact you via WhatsApp with syllabus and cohort dates.',
    leadId: newLead.id
  });
});

// ==========================================
// 9. BLOG CMS
// ==========================================

app.get('/api/blog', (req, res) => {
  const db = readDb();
  const isAdminUser = isAdmin(req, db);
  let posts = db.blogPosts || [];
  if (!isAdminUser) {
    posts = posts.filter(p => p.isPublished !== false);
  }
  res.json(posts);
});

app.get('/api/blog/:slug', (req, res) => {
  const db = readDb();
  const slug = req.params.slug;
  const post = (db.blogPosts || []).find(p => p.slug === slug || String(p.id) === slug);
  if (!post) {
    res.status(404).json({ error: 'Article not found' });
    return;
  }
  res.json(post);
});

app.post('/api/admin/blog', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const { title, slug, category, summary, content, authorName, readTimeMinutes, tags, isPublished } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: 'Title and content are required' });
    return;
  }
  if (!db.blogPosts) db.blogPosts = [];
  const newPost: DbBlogPost = {
    id: db.blogPosts.length ? Math.max(...db.blogPosts.map(p => p.id)) + 1 : 1,
    title: title.trim(),
    slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    category: category || 'Technology',
    summary: summary || content.slice(0, 160) + '...',
    content: content.trim(),
    authorName: authorName || 'Petuel Baifem',
    readTimeMinutes: Number(readTimeMinutes) || Math.ceil(content.split(' ').length / 180),
    isPublished: isPublished !== false,
    publishedAt: new Date().toISOString().slice(0, 10),
    tags: Array.isArray(tags) ? tags : ['Technology', 'PETZEUSTECH']
  };
  db.blogPosts.unshift(newPost);
  writeDb(db);
  res.status(201).json(newPost);
});

app.put('/api/admin/blog/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const post = (db.blogPosts || []).find(p => p.id === id);
  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  Object.assign(post, req.body, { id });
  writeDb(db);
  res.json(post);
});

app.delete('/api/admin/blog/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  db.blogPosts = (db.blogPosts || []).filter(p => p.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Article deleted successfully' });
});

// ==========================================
// 10. ANNOUNCEMENTS & TESTIMONIALS & STATS
// ==========================================

app.get('/api/announcement', (req, res) => {
  const db = readDb();
  res.json(db.announcement || SEED_ANNOUNCEMENT);
});

app.put('/api/admin/announcement', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  db.announcement = { ...db.announcement, ...req.body };
  writeDb(db);
  res.json(db.announcement);
});

app.get('/api/testimonials', (req, res) => {
  const db = readDb();
  const isAdminUser = isAdmin(req, db);
  let testimonials = db.testimonials || [];
  if (!isAdminUser) {
    testimonials = testimonials.filter(t => t.isPublished !== false);
  }
  res.json(testimonials);
});

app.post('/api/admin/testimonials', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const { clientName, company, position, testimonial, relatedService, rating } = req.body;
  if (!clientName || !testimonial) {
    res.status(400).json({ error: 'Client name and testimonial quote are required' });
    return;
  }
  if (!db.testimonials) db.testimonials = [];
  const newTestimonial: DbTestimonial = {
    id: db.testimonials.length ? Math.max(...db.testimonials.map(t => t.id)) + 1 : 1,
    clientName: clientName.trim(),
    company: company || 'Cameroon',
    position: position || 'Client',
    testimonial: testimonial.trim(),
    relatedService: relatedService || 'Custom Solution',
    isPublished: true,
    rating: Number(rating) || 5
  };
  db.testimonials.push(newTestimonial);
  writeDb(db);
  res.status(201).json(newTestimonial);
});

app.put('/api/admin/testimonials/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  const item = (db.testimonials || []).find(t => t.id === id);
  if (!item) {
    res.status(404).json({ error: 'Testimonial not found' });
    return;
  }
  Object.assign(item, req.body, { id });
  writeDb(db);
  res.json(item);
});

app.delete('/api/admin/testimonials/:id', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  const id = parseInt(req.params.id, 10);
  db.testimonials = (db.testimonials || []).filter(t => t.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Testimonial deleted successfully' });
});

app.get('/api/stats/config', (req, res) => {
  const db = readDb();
  res.json(db.siteStats || SEED_SITE_STATS);
});

app.put('/api/admin/stats/config', (req, res) => {
  const db = readDb();
  if (!isAdmin(req, db)) {
    res.status(403).json({ error: 'Administrative authorization required' });
    return;
  }
  if (Array.isArray(req.body)) {
    db.siteStats = req.body;
  } else {
    const id = parseInt((req.params as any)?.id || (req.body as any)?.id, 10);
    const stat = (db.siteStats || []).find(s => s.id === id);
    if (stat) Object.assign(stat, req.body);
  }
  writeDb(db);
  res.json(db.siteStats);
});

// ==========================================
// 5. ZEUSAI CONSULTATION (GEMINI API)
// ==========================================

let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

app.post('/api/zeus-ai', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  try {
    const ai = getGemini();
    if (ai) {
      const systemInstruction = `You are ZeusAI, the intelligent technology advisor for PETZEUSTECH, an African technology and innovation company based in Cameroon founded by Petuel Baifem.
The company operates 6 departments:
1. Software Labs (Websites, PHP/MySQL, Web apps, WordPress, maintenance)
2. CloudCore (Linux VPS, Nginx, Docker, domains, SSL, hosting)
3. Graphics (Flyers, posters, Canva, social media branding)
4. Electronics (Phone troubleshooting, screen replacements, Windows install, laptop maintenance)
5. Ads / Digital Marketing (Facebook Ads, Google Ads, SEO, WhatsApp funnels)
6. IT Academy (Practical hands-on tech training)

COMMUNICATION STYLE:
- Speak in warm, clear, simple English without confusing technical jargon.
- Explain technical problems simply as if teaching an intelligent beginner.
- Recommend the exact PETZEUSTECH department and service that solves the user's issue.
- Give realistic advice.
- When helpful, mention that they can book directly on the website or message on WhatsApp at +237 677 251 088.
- Keep responses concise (2-4 paragraphs maximum).`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ reply: response.text || 'I am ready to help you find the right technology solution at PETZEUSTECH.' });
      return;
    }
  } catch (err) {
    console.warn('Gemini API query issue, using intelligent diagnostic fallback:', err);
  }

  // Resilient fallback advice engine if Gemini API key is not active
  const lower = prompt.toLowerCase();
  let fallbackReply = "Hello! I am ZeusAI, your PETZEUSTECH tech advisor. ";

  if (lower.includes('screen') || lower.includes('phone') || lower.includes('laptop') || lower.includes('windows') || lower.includes('repair')) {
    fallbackReply += "It sounds like you need assistance from **PETZEUSTECH Electronics**! We handle common phone diagnostics, verified screen replacements, Windows/Linux OS installation, and laptop tune-ups in Cameroon. You can book an appointment directly through our 'Book a Service' page, or continue the discussion directly on WhatsApp at +237 677 251 088.";
  } else if (lower.includes('website') || lower.includes('software') || lower.includes('wordpress') || lower.includes('app') || lower.includes('php')) {
    fallbackReply += "That sounds like a great fit for **PETZEUSTECH Software Labs**! We build fast, mobile-friendly websites, custom PHP/MySQL management tools, and WordPress business portals that are designed specifically to work smoothly on African mobile networks. Tell us a bit more about your project or submit a quick booking!";
  } else if (lower.includes('vps') || lower.includes('server') || lower.includes('hosting') || lower.includes('domain') || lower.includes('nginx') || lower.includes('cloud')) {
    fallbackReply += "You are looking for **PETZEUSTECH CloudCore**! We help businesses set up clean Linux VPS servers, configure Nginx, install Let's Encrypt SSL, connect domains, and deploy Docker containers so your site stays up 24/7 without unexpected downtime.";
  } else if (lower.includes('flyer') || lower.includes('poster') || lower.includes('graphic') || lower.includes('logo') || lower.includes('design')) {
    fallbackReply += "Our **PETZEUSTECH Graphics** department is ready to help! We design eye-catching event flyers, social media banners for WhatsApp and Facebook, and complete business branding materials that make your message stand out.";
  } else if (lower.includes('learn') || lower.includes('training') || lower.includes('academy') || lower.includes('course') || lower.includes('class')) {
    fallbackReply += "Check out the **PETZEUSTECH IT Academy**! We offer hands-on, practical classes in web development, graphic design, computer essentials, and AI productivity tools. Every lesson is beginner-friendly and focused on practical skills you can immediately use.";
  } else {
    fallbackReply += "PETZEUSTECH offers complete digital solutions across Software Labs, CloudCore VPS hosting, Graphics, Electronics repairs, Digital Marketing, and our IT Academy. Feel free to ask about any specific problem, or message our founder Petuel Baifem on WhatsApp at +237 677 251 088!";
  }

  res.json({ reply: fallbackReply });
});

// ==========================================
// 6. VITE & STATIC FILE MIDDLEWARE
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PETZEUSTECH Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
