import { 
  Booking, 
  BookingStatus, 
  User, 
  BlogPost, 
  Project, 
  ContactMessage, 
  Department, 
  Service, 
  Lead, 
  LeadStatus,
  AcademyCourse, 
  Announcement, 
  Testimonial, 
  SiteStatistic,
  AuditLog
} from '../types';

const TOKEN_KEY = 'petzeus_auth_token';
const USER_KEY = 'petzeus_current_user';

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, user: User) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to store auth in localStorage', e);
  }
}

export function clearStoredAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to clear auth from localStorage', e);
  }
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || 'Request failed');
  }
  return data;
}

export const api = {
  // Auth
  async loginAdmin(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await request<{ user: User; token: string }>('/api/auth/admin-login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setStoredAuth(res.token, res.user);
    return res;
  },

  async loginEmail(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await request<{ user: User; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setStoredAuth(res.token, res.user);
    return res;
  },

  async uploadImage(image: string, filename?: string): Promise<{ url: string; success: boolean }> {
    return request<{ url: string; success: boolean }>('/api/upload', {
      method: 'POST',
      body: JSON.stringify({ image, filename }),
    });
  },

  async registerEmail(fullName: string, email: string, password: string, phone?: string): Promise<{ user: User; token: string }> {
    const res = await request<{ user: User; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, phone }),
    });
    setStoredAuth(res.token, res.user);
    return res;
  },

  async loginGoogle(googleToken?: string, mockProfile?: { name: string; email: string; avatarUrl?: string }): Promise<{ user: User; token: string }> {
    const res = await request<{ user: User; token: string }>('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ googleToken, profile: mockProfile }),
    });
    setStoredAuth(res.token, res.user);
    return res;
  },

  async loginGithub(code?: string, mockProfile?: { name: string; email: string; avatarUrl?: string }): Promise<{ user: User; token: string }> {
    const res = await request<{ user: User; token: string }>('/api/auth/github', {
      method: 'POST',
      body: JSON.stringify({ code, profile: mockProfile }),
    });
    setStoredAuth(res.token, res.user);
    return res;
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await request<{ user: User }>('/api/auth/me');
      setStoredAuth(getStoredToken() || 'active', res.user);
      return res.user;
    } catch {
      return null;
    }
  },

  async logout() {
    try {
      await request('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    }
    clearStoredAuth();
  },

  // Bookings
  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
    try {
      return await request<Booking>('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingData),
      });
    } catch {
      // Offline / Static frontend fallback
      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const reference = `PTZ-${datePart}-${randomPart}`;
      const fallbackBooking: Booking = {
        id: Date.now(),
        bookingReference: reference,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        ...bookingData,
      };
      try {
        const existing = JSON.parse(localStorage.getItem('petzeustech_offline_bookings') || '[]');
        existing.unshift(fallbackBooking);
        localStorage.setItem('petzeustech_offline_bookings', JSON.stringify(existing));
      } catch {
        // ignore
      }
      return fallbackBooking;
    }
  },

  async getMyBookings(email?: string): Promise<Booking[]> {
    const query = email ? `?email=${encodeURIComponent(email)}` : '';
    try {
      return await request<Booking[]>(`/api/bookings${query}`);
    } catch {
      try {
        const existing: Booking[] = JSON.parse(localStorage.getItem('petzeustech_offline_bookings') || '[]');
        return email ? existing.filter(b => b.customerEmail.toLowerCase() === email.toLowerCase()) : existing;
      } catch {
        return [];
      }
    }
  },

  async getBookingByRef(reference: string): Promise<Booking> {
    try {
      return await request<Booking>(`/api/bookings/ref/${encodeURIComponent(reference)}`);
    } catch {
      try {
        const existing: Booking[] = JSON.parse(localStorage.getItem('petzeustech_offline_bookings') || '[]');
        const found = existing.find(b => b.bookingReference.toLowerCase() === reference.trim().toLowerCase());
        if (found) return found;
      } catch {
        // ignore
      }
      throw new Error('No booking found with this reference code.');
    }
  },

  // Admin Bookings
  async getAllBookings(statusFilter?: string): Promise<Booking[]> {
    const query = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : '';
    return request<Booking[]>(`/api/admin/bookings${query}`);
  },

  async updateBookingStatus(id: number, status: BookingStatus, adminNotes?: string): Promise<Booking> {
    return request<Booking>(`/api/admin/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, adminNotes }),
    });
  },

  // CRM Leads
  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    return request<Lead>('/api/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  },

  async getAdminLeads(status?: string): Promise<Lead[]> {
    const query = status && status !== 'ALL' ? `?status=${encodeURIComponent(status)}` : '';
    return request<Lead[]>(`/api/admin/leads${query}`);
  },

  async updateLeadStatus(id: number, status: string): Promise<Lead> {
    return request<Lead>(`/api/admin/leads/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  async updateLeadNotes(id: number, notes: string): Promise<Lead> {
    return request<Lead>(`/api/admin/leads/${id}/notes`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    });
  },

  async deleteLead(id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/admin/leads/${id}`, {
      method: 'DELETE',
    });
  },

  // Departments & Services
  async getDepartments(): Promise<Department[]> {
    return request<Department[]>('/api/departments');
  },

  async updateDepartment(id: number, data: Partial<Department>): Promise<Department> {
    return request<Department>(`/api/admin/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async getServices(departmentId?: number): Promise<Service[]> {
    const query = departmentId ? `?departmentId=${departmentId}` : '';
    return request<Service[]>(`/api/services${query}`);
  },

  async createService(service: Partial<Service>): Promise<Service> {
    return request<Service>('/api/admin/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  },

  async updateService(id: number, service: Partial<Service>): Promise<Service> {
    return request<Service>(`/api/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  },

  async deleteService(id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/admin/services/${id}`, {
      method: 'DELETE',
    });
  },

  // Projects
  async getProjects(params?: { featured?: boolean; category?: string }): Promise<Project[]> {
    const searchParams = new URLSearchParams();
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.category && params.category !== 'All') searchParams.set('category', params.category);
    const qs = searchParams.toString();
    return request<Project[]>(`/api/projects${qs ? `?${qs}` : ''}`);
  },

  async getProjectBySlug(slug: string): Promise<Project> {
    return request<Project>(`/api/projects/${encodeURIComponent(slug)}`);
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    return request<Project>('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },

  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    return request<Project>(`/api/admin/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  },

  async togglePublishProject(id: number): Promise<Project> {
    return request<Project>(`/api/admin/projects/${id}/publish`, {
      method: 'PATCH',
    });
  },

  async deleteProject(id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/admin/projects/${id}`, {
      method: 'DELETE',
    });
  },

  // Academy Courses
  async getAcademyCourses(): Promise<AcademyCourse[]> {
    return request<AcademyCourse[]>('/api/academy/courses');
  },

  async enrollAcademyCourse(data: {
    courseId?: number;
    courseTitle: string;
    studentName: string;
    studentPhone: string;
    studentEmail?: string;
    comments?: string;
  }): Promise<{ success: boolean; message: string; leadId: number }> {
    return request('/api/academy/enroll', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async createAcademyCourse(course: Partial<AcademyCourse>): Promise<AcademyCourse> {
    return request<AcademyCourse>('/api/admin/academy/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    });
  },

  async updateAcademyCourse(id: number, course: Partial<AcademyCourse>): Promise<AcademyCourse> {
    return request<AcademyCourse>(`/api/admin/academy/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    });
  },

  async deleteAcademyCourse(id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/admin/academy/courses/${id}`, {
      method: 'DELETE',
    });
  },

  // Blog
  async getBlogPosts(category?: string): Promise<BlogPost[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request<BlogPost[]>(`/api/blog${query}`);
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    return request<BlogPost>(`/api/blog/${encodeURIComponent(slug)}`);
  },

  async createBlogPost(post: Partial<BlogPost>): Promise<BlogPost> {
    return request<BlogPost>('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },

  async updateBlogPost(id: number, post: Partial<BlogPost>): Promise<BlogPost> {
    return request<BlogPost>(`/api/admin/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  },

  async deleteBlogPost(id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/admin/blog/${id}`, {
      method: 'DELETE',
    });
  },

  // CRM Leads
  async getLeads(status?: string): Promise<Lead[]> {
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    return request<Lead[]>(`/api/admin/leads${query}`);
  },

  async updateLead(id: number, data: { status?: LeadStatus; notes?: string }): Promise<Lead> {
    if (data.status) {
      await request<Lead>(`/api/admin/leads/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: data.status }),
      });
    }
    if (data.notes !== undefined) {
      await request<Lead>(`/api/admin/leads/${id}/notes`, {
        method: 'PATCH',
        body: JSON.stringify({ notes: data.notes }),
      });
    }
    return request<Lead>(`/api/admin/leads`);
  },

  // Announcement & Testimonials & Stats
  async getAnnouncement(): Promise<Announcement> {
    return request<Announcement>('/api/announcement');
  },

  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const single = await this.getAnnouncement();
      return single ? [single] : [];
    } catch {
      return [];
    }
  },

  async updateAnnouncement(idOrData: number | Partial<Announcement>, maybeData?: Partial<Announcement>): Promise<Announcement> {
    const payload = typeof idOrData === 'object' ? idOrData : (maybeData || {});
    return request<Announcement>('/api/admin/announcement', {
      method: 'PUT',
      body: JSON.stringify(payload),
    });
  },

  async createAnnouncement(data: Partial<Announcement>): Promise<Announcement> {
    return this.updateAnnouncement(data);
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return request<Testimonial[]>('/api/testimonials');
  },

  async createTestimonial(data: Partial<Testimonial>): Promise<Testimonial> {
    return request<Testimonial>('/api/admin/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateTestimonial(id: number, data: Partial<Testimonial>): Promise<Testimonial> {
    return request<Testimonial>(`/api/admin/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteTestimonial(id: number): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
    });
  },

  async getSiteStats(): Promise<SiteStatistic[]> {
    return request<SiteStatistic[]>('/api/stats/config');
  },

  async updateSiteStats(stats: SiteStatistic[]): Promise<SiteStatistic[]> {
    return request<SiteStatistic[]>('/api/admin/stats/config', {
      method: 'PUT',
      body: JSON.stringify(stats),
    });
  },

  // Contact Messages
  async sendContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): Promise<{ success: boolean; message: string }> {
    try {
      return await request('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch {
      try {
        const existing = JSON.parse(localStorage.getItem('petzeustech_contact_messages') || '[]');
        existing.unshift({ id: Date.now(), ...data, createdAt: new Date().toISOString() });
        localStorage.setItem('petzeustech_contact_messages', JSON.stringify(existing));
      } catch {
        // ignore
      }
      return { success: true, message: 'Message recorded successfully! We will connect via WhatsApp or email shortly.' };
    }
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      return await request<ContactMessage[]>('/api/admin/contact-messages');
    } catch {
      try {
        return JSON.parse(localStorage.getItem('petzeustech_contact_messages') || '[]');
      } catch {
        return [];
      }
    }
  },

  async updateContactStatus(id: number, status: 'Unread' | 'Read' | 'Replied'): Promise<ContactMessage> {
    return request<ContactMessage>(`/api/admin/contact-messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Stats & Audit
  async getAdminStats(): Promise<{
    totalBookings: number;
    pendingBookings: number;
    totalLeads: number;
    activeLeads: number;
    activeServices: number;
    totalProjects: number;
    totalCourses: number;
    totalBlogPosts: number;
    unreadMessages: number;
    totalUsers: number;
  }> {
    return request('/api/admin/stats');
  },

  async getAuditLogs(): Promise<AuditLog[]> {
    return request<AuditLog[]>('/api/admin/audit-logs');
  },

  // ZeusAI Consultation
  async askZeusAI(prompt: string, history: { role: 'user' | 'model'; text: string }[]): Promise<string> {
    try {
      const res = await request<{ reply: string }>('/api/zeus-ai', {
        method: 'POST',
        body: JSON.stringify({ prompt, history }),
      });
      return res.reply;
    } catch {
      const lower = prompt.toLowerCase();
      if (lower.includes('screen') || lower.includes('phone') || lower.includes('laptop') || lower.includes('repair') || lower.includes('windows')) {
        return "It sounds like you need assistance from **PETZEUSTECH Electronics**! We handle phone diagnostics, AMOLED screen replacements, OS installation, and hardware tune-ups in Cameroon. You can book an appointment on our 'Book a Service' page, or message directly on WhatsApp at +237 677 251 088.";
      } else if (lower.includes('website') || lower.includes('software') || lower.includes('wordpress') || lower.includes('app') || lower.includes('php')) {
        return "That's a perfect match for **PETZEUSTECH Software Labs**! We build fast, mobile-friendly websites, custom PHP/MySQL databases, and WordPress portals designed for African networks. Submit a quick booking request or chat with Petuel on WhatsApp!";
      } else if (lower.includes('vps') || lower.includes('server') || lower.includes('hosting') || lower.includes('domain') || lower.includes('cloud')) {
        return "You are looking for **PETZEUSTECH CloudCore**! We configure Linux VPS servers, Nginx reverse proxies, SSL certificates, custom domains, and Docker containers for zero downtime.";
      } else if (lower.includes('flyer') || lower.includes('logo') || lower.includes('design') || lower.includes('brand')) {
        return "Our **PETZEUSTECH Graphics & Creative** department can help! We design eye-catching event flyers, social media banners, and full brand identities that make your business stand out.";
      } else if (lower.includes('course') || lower.includes('learn') || lower.includes('academy') || lower.includes('training')) {
        return "Check out the **PETZEUSTECH IT Academy**! We offer hands-on, practical classes in web development, graphic design, and computer fundamentals in Cameroon and online.";
      }
      return "PETZEUSTECH offers complete digital solutions across Software Labs, CloudCore VPS hosting, Graphics, Electronics repairs, Digital Marketing, and our IT Academy. Ask about any specific challenge or chat with founder Petuel Baifem on WhatsApp at +237 677 251 088!";
    }
  },

  // Compatibility helpers
  async login(creds: { email: string; password: string }): Promise<User> {
    const res = await this.loginEmail(creds.email, creds.password);
    return res.user;
  },

  async register(data: { fullName: string; email: string; password: string; phone?: string }): Promise<User> {
    const res = await this.registerEmail(data.fullName, data.email, data.password, data.phone);
    return res.user;
  },

  async oauthLogin(provider: 'google' | 'github', profile?: { providerId?: string; email: string; fullName: string }): Promise<User> {
    const mockProfile = profile ? { name: profile.fullName, email: profile.email } : undefined;
    const res = provider === 'google' 
      ? await this.loginGoogle(undefined, mockProfile)
      : await this.loginGithub(undefined, mockProfile);
    return res.user;
  },

  async getBookings(email?: string): Promise<Booking[]> {
    return this.getMyBookings(email);
  },

  async updateBooking(id: string | number, data: { status: BookingStatus; adminNotes?: string }, _adminKey?: string): Promise<Booking> {
    return this.updateBookingStatus(Number(id), data.status, data.adminNotes);
  },

  async submitContactMessage(data: { name: string; email: string; subject: string; message: string; phone?: string }): Promise<{ success: boolean; message: string }> {
    return this.sendContactMessage({
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
    });
  }
};

