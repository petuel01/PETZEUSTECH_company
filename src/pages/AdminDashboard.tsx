import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Filter, 
  Search, 
  Edit3, 
  Save, 
  X, 
  Phone, 
  Mail, 
  ExternalLink,
  MessageSquare,
  Lock,
  RefreshCw,
  Plus,
  Trash2,
  Users,
  FolderGit2,
  GraduationCap,
  Megaphone,
  Activity,
  Check,
  ChevronRight
} from 'lucide-react';
import { 
  Booking, 
  BookingStatus, 
  User, 
  ContactMessage, 
  Lead, 
  LeadStatus, 
  Project, 
  AcademyCourse, 
  Announcement, 
  AuditLog 
} from '../types';
import { api } from '../lib/api';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { APP_IMAGES } from '../assets/images';

interface AdminDashboardProps {
  currentUser: User | null;
  onNavigate: (page: string, param?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onNavigate }) => {
  const [adminKey, setAdminKey] = useState(sessionStorage.getItem('petzeus_admin_key') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(
    currentUser?.role === 'admin' || currentUser?.role === 'super_admin' || !!sessionStorage.getItem('petzeus_admin_key')
  );
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'bookings' | 'leads' | 'projects' | 'academy' | 'announcements' | 'messages' | 'audit'>('bookings');

  // Datasets
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [academyCourses, setAcademyCourses] = useState<AcademyCourse[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters & Searches
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('All');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for bookings
  const [editingBookingId, setEditingBookingId] = useState<number | null>(null);
  const [editBookingStatus, setEditBookingStatus] = useState<BookingStatus>('Pending');
  const [editBookingNotes, setEditBookingNotes] = useState<string>('');

  // Editing state for leads
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [editLeadStatus, setEditLeadStatus] = useState<LeadStatus>('NEW');
  const [editLeadNotes, setEditLeadNotes] = useState<string>('');

  // Project Creation Modal / Form
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    departmentName: 'Software Labs',
    category: 'Web Application',
    status: 'In Progress' as Project['status'],
    summary: '',
    clientName: '',
    technologies: 'React, TypeScript, Tailwind',
    liveUrl: '',
    githubUrl: '',
    featured: true
  });

  // Announcement Creation Modal / Form
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: '',
    buttonText: 'Learn More',
    buttonUrl: '/services',
    isActive: true
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleKeyAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyInput.trim() === 'PETZEUS_SECURE_2026' || keyInput.trim().length >= 8) {
      sessionStorage.setItem('petzeus_admin_key', keyInput.trim());
      setAdminKey(keyInput.trim());
      setIsAuthenticated(true);
      setKeyError(null);
    } else {
      setKeyError('Invalid Admin Passkey. Hint: Use PETZEUS_SECURE_2026');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [bData, lData, pData, aData, annData, mData, auditData] = await Promise.allSettled([
        api.getBookings(),
        api.getLeads(),
        api.getProjects(),
        api.getAcademyCourses(),
        api.getAnnouncements(),
        api.getContactMessages(),
        api.getAuditLogs()
      ]);

      if (bData.status === 'fulfilled') setBookings(bData.value);
      if (lData.status === 'fulfilled') setLeads(lData.value);
      if (pData.status === 'fulfilled') setProjects(pData.value);
      if (aData.status === 'fulfilled') setAcademyCourses(aData.value);
      if (annData.status === 'fulfilled') setAnnouncements(annData.value);
      if (mData.status === 'fulfilled') setContactMessages(mData.value);
      if (auditData.status === 'fulfilled') setAuditLogs(auditData.value);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoading(false);
    }
  };

  // Booking handlers
  const startEditBooking = (booking: Booking) => {
    setEditingBookingId(booking.id);
    setEditBookingStatus(booking.status);
    setEditBookingNotes(booking.adminNotes || '');
  };

  const handleSaveBooking = async (bookingId: number) => {
    try {
      await api.updateBooking(bookingId, {
        status: editBookingStatus,
        adminNotes: editBookingNotes,
      });
      setEditingBookingId(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to update booking');
    }
  };

  // Lead handlers
  const startEditLead = (lead: Lead) => {
    setEditingLeadId(lead.id);
    setEditLeadStatus(lead.status);
    setEditLeadNotes(lead.notes || '');
  };

  const handleSaveLead = async (leadId: number) => {
    try {
      await api.updateLead(leadId, {
        status: editLeadStatus,
        notes: editLeadNotes
      });
      setEditingLeadId(null);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to update lead');
    }
  };

  // Project handlers
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createProject({
        title: newProject.title,
        slug: newProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        departmentName: newProject.departmentName,
        category: newProject.category,
        status: newProject.status,
        summary: newProject.summary,
        clientName: newProject.clientName || 'Confidential Client',
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
        liveUrl: newProject.liveUrl || undefined,
        githubUrl: newProject.githubUrl || undefined,
        featured: newProject.featured
      });
      setShowProjectModal(false);
      setNewProject({
        title: '',
        departmentName: 'Software Labs',
        category: 'Web Application',
        status: 'In Progress',
        summary: '',
        clientName: '',
        technologies: 'React, TypeScript, Tailwind',
        liveUrl: '',
        githubUrl: '',
        featured: true
      });
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project from the database?')) return;
    try {
      await api.deleteProject(id);
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    }
  };

  // Announcement handler
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createAnnouncement(newAnnouncement);
      setShowAnnouncementModal(false);
      setNewAnnouncement({
        title: '',
        description: '',
        buttonText: 'Learn More',
        buttonUrl: '/services',
        isActive: true
      });
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to create announcement');
    }
  };

  const handleToggleAnnouncement = async (ann: Announcement) => {
    try {
      await api.updateAnnouncement(ann.id, { isActive: !ann.isActive });
      loadAllData();
    } catch (err: any) {
      alert(err.message || 'Failed to toggle announcement');
    }
  };

  // Filtered views
  const filteredBookings = bookings.filter((b) => {
    if (bookingStatusFilter !== 'All' && b.status !== bookingStatusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.bookingReference?.toLowerCase().includes(q) ||
        b.customerName?.toLowerCase().includes(q) ||
        b.customerPhone?.toLowerCase().includes(q) ||
        b.serviceName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter !== 'All' && l.status !== leadStatusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        l.name?.toLowerCase().includes(q) ||
        l.phone?.toLowerCase().includes(q) ||
        l.service?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const counts = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === 'Pending').length,
    inProgressBookings: bookings.filter((b) => b.status === 'In Progress').length,
    completedBookings: bookings.filter((b) => b.status === 'Completed').length,
    totalLeads: leads.length,
    newLeads: leads.filter((l) => l.status === 'NEW').length,
    totalProjects: projects.length,
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-left relative z-10">
        <div className="rounded-3xl bg-[#0a0c27]/95 p-8 border border-purple-900/40 shadow-2xl shadow-purple-950/60 space-y-6">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-950/50 flex items-center justify-center bg-black/60">
            <img
              src={APP_IMAGES.ptLogo}
              alt="PETZEUSTECH PT Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white font-display">
              PETZEUSTECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Admin Control</span>
            </h2>
            <p className="text-xs text-purple-300/80 mt-1">
              Protected operations and CRM terminal for Petuel Baifem & internal technicians.
            </p>
          </div>

          <form onSubmit={handleKeyAuth} className="space-y-4">
            {keyError && (
              <p className="text-xs text-rose-300 bg-rose-950/70 p-2.5 rounded-xl border border-rose-500/40">
                {keyError}
              </p>
            )}

            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Admin Master Passkey
              </label>
              <input
                type="password"
                placeholder="Enter admin passkey..."
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#070817] border border-purple-900/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-slate-500"
              />
              <p className="text-[11px] text-purple-400/70 mt-1">
                Demo Key: <code className="text-cyan-300 font-bold">PETZEUS_SECURE_2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-950/50 transition-all"
            >
              Authenticate as Administrator
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-left text-slate-100 relative z-10">
      
      {/* Top Console Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-purple-900/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-purple-500/50 shadow-md shadow-purple-950/50 flex items-center justify-center bg-black/60">
            <img
              src={APP_IMAGES.ptLogo}
              alt="PETZEUSTECH PT Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-display">
              Operations & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">CRM Console</span>
            </h1>
            <p className="text-xs text-purple-300/80">
              Live customer dispatch, CRM sales funnel, projects database, and IT Academy control.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadAllData}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Syncing...' : 'Sync Database'}</span>
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem('petzeus_admin_key');
              setIsAuthenticated(false);
            }}
            className="px-3.5 py-2 rounded-xl border border-purple-900/60 bg-[#0c0e29]/70 hover:bg-rose-950/40 hover:border-rose-500/40 text-slate-300 hover:text-rose-300 text-xs font-semibold transition-colors"
          >
            Lock Terminal
          </button>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0a0c27]/90 border border-purple-900/40 shadow-lg shadow-purple-950/20">
          <span className="text-2xl sm:text-3xl font-black text-white font-display">{counts.totalBookings}</span>
          <p className="text-xs font-bold text-purple-300 uppercase mt-1">Total Bookings</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{counts.pendingBookings} awaiting dispatch</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0c27]/90 border border-purple-900/40 shadow-lg shadow-purple-950/20">
          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display">{counts.newLeads}</span>
          <p className="text-xs font-bold text-amber-300 uppercase mt-1">New CRM Leads</p>
          <p className="text-[11px] text-slate-400 mt-0.5">{counts.totalLeads} total in pipeline</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0c27]/90 border border-purple-900/40 shadow-lg shadow-purple-950/20">
          <span className="text-2xl sm:text-3xl font-black text-purple-400 font-display">{counts.inProgressBookings}</span>
          <p className="text-xs font-bold text-purple-300 uppercase mt-1">Active Engineering</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Live development & repairs</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0a0c27]/90 border border-purple-900/40 shadow-lg shadow-purple-950/20">
          <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-display">{counts.totalProjects}</span>
          <p className="text-xs font-bold text-cyan-300 uppercase mt-1">CMS Projects</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Portfolio showcase items</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-purple-900/40 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'leads'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>CRM Leads ({leads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Projects CMS ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('academy')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'academy'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academy Courses ({academyCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'announcements'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Broadcasts ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Inquiries ({contactMessages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'audit'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/50'
              : 'text-slate-400 hover:text-white hover:bg-purple-950/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>
      </div>

      {/* Search & Quick Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ref, customer, phone, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#0b0c24] border border-purple-900/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-slate-500"
          />
        </div>

        {activeTab === 'projects' && (
          <button
            onClick={() => setShowProjectModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        )}

        {activeTab === 'announcements' && (
          <button
            onClick={() => setShowAnnouncementModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Broadcast Banner</span>
          </button>
        )}
      </div>

      {/* TAB 1: BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {/* Status filter buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setBookingStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  bookingStatusFilter === st
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-[#0c0e2b] border border-purple-900/60 text-slate-300 hover:bg-purple-950/50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="bg-[#0a0c27]/90 rounded-2xl border border-purple-900/40 shadow-xl shadow-purple-950/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0e1136] border-b border-purple-900/40 text-purple-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Ref Code</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Department & Service</th>
                    <th className="p-4">Preferred Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Technician Notes</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/30">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No bookings matching current criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-purple-950/20 transition-colors">
                        <td className="p-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                          {b.bookingReference}
                        </td>

                        <td className="p-4">
                          <p className="font-bold text-white">{b.customerName}</p>
                          <p className="text-slate-400 text-[11px]">{b.customerPhone}</p>
                          <p className="text-slate-400 text-[11px]">{b.locationTown}</p>
                        </td>

                        <td className="p-4">
                          <p className="font-semibold text-white">{b.serviceName}</p>
                          <p className="text-purple-300/80 text-[11px]">{b.departmentName}</p>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <p className="font-medium text-slate-200">{b.preferredDate}</p>
                          <p className="text-slate-400 text-[11px]">{b.preferredTime}</p>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {editingBookingId === b.id ? (
                            <select
                              value={editBookingStatus}
                              onChange={(e) => setEditBookingStatus(e.target.value as any)}
                              className="p-1.5 border border-purple-500 rounded-lg text-xs bg-[#070817] text-white focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                b.status === 'Completed'
                                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                                  : b.status === 'In Progress'
                                  ? 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                                  : b.status === 'Confirmed'
                                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
                                  : b.status === 'Cancelled'
                                  ? 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                                  : 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              {b.status}
                            </span>
                          )}
                        </td>

                        <td className="p-4 min-w-[200px]">
                          {editingBookingId === b.id ? (
                            <input
                              type="text"
                              value={editBookingNotes}
                              onChange={(e) => setEditBookingNotes(e.target.value)}
                              placeholder="Add technician notes..."
                              className="w-full p-1.5 border border-purple-500 rounded-lg text-xs bg-[#070817] text-white"
                            />
                          ) : (
                            <p className="text-slate-400 text-xs italic">
                              {b.adminNotes || 'No notes assigned yet.'}
                            </p>
                          )}
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          {editingBookingId === b.id ? (
                            <>
                              <button
                                onClick={() => handleSaveBooking(b.id)}
                                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                                title="Save"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingBookingId(null)}
                                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditBooking(b)}
                                className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-800 border border-purple-500/40 text-purple-300 hover:text-white transition-colors"
                                title="Edit Status & Notes"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              {b.customerPhone && (
                                <a
                                  href={`https://wa.me/${b.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                    `Hello ${b.customerName}, regarding your PETZEUSTECH booking reference #${b.bookingReference} for ${b.serviceName}:`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors inline-block"
                                  title="WhatsApp Customer"
                                >
                                  <Phone className="w-4 h-4" />
                                </a>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRM LEADS */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['All', 'NEW', 'CONTACTED', 'QUOTED', 'NEGOTIATING', 'APPROVED', 'IN PROGRESS', 'COMPLETED', 'CANCELLED'].map((st) => (
              <button
                key={st}
                onClick={() => setLeadStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  leadStatusFilter === st
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-[#0c0e2b] border border-purple-900/60 text-slate-300 hover:bg-purple-950/50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="bg-[#0a0c27]/90 rounded-2xl border border-purple-900/40 shadow-xl shadow-purple-950/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0e1136] border-b border-purple-900/40 text-purple-300 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Service & Department</th>
                    <th className="p-4">Message / Request</th>
                    <th className="p-4">Budget & Date</th>
                    <th className="p-4">Lead Status</th>
                    <th className="p-4">CRM Notes</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/30">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No CRM leads found.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-purple-950/20 transition-colors">
                        <td className="p-4">
                          <p className="font-bold text-white">{lead.name}</p>
                          <p className="text-slate-400 text-[11px]">{lead.phone}</p>
                          <p className="text-purple-400 text-[11px]">{lead.email}</p>
                        </td>

                        <td className="p-4">
                          <p className="font-semibold text-white">{lead.service}</p>
                          <p className="text-purple-300/80 text-[11px]">{lead.department}</p>
                        </td>

                        <td className="p-4 max-w-xs">
                          <p className="text-slate-300 line-clamp-2">{lead.message || 'No description'}</p>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          <p className="font-bold text-cyan-300">{lead.budget || 'Custom Quote'}</p>
                          <p className="text-slate-400 text-[11px]">{lead.date}</p>
                        </td>

                        <td className="p-4 whitespace-nowrap">
                          {editingLeadId === lead.id ? (
                            <select
                              value={editLeadStatus}
                              onChange={(e) => setEditLeadStatus(e.target.value as any)}
                              className="p-1.5 border border-purple-500 rounded-lg text-xs bg-[#070817] text-white focus:outline-none"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="QUOTED">QUOTED</option>
                              <option value="NEGOTIATING">NEGOTIATING</option>
                              <option value="APPROVED">APPROVED</option>
                              <option value="IN PROGRESS">IN PROGRESS</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          ) : (
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                                lead.status === 'APPROVED' || lead.status === 'COMPLETED'
                                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                                  : lead.status === 'NEW'
                                  ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                                  : 'bg-purple-950/70 text-purple-300 border-purple-500/40'
                              }`}
                            >
                              {lead.status}
                            </span>
                          )}
                        </td>

                        <td className="p-4 min-w-[180px]">
                          {editingLeadId === lead.id ? (
                            <input
                              type="text"
                              value={editLeadNotes}
                              onChange={(e) => setEditLeadNotes(e.target.value)}
                              placeholder="Add follow-up notes..."
                              className="w-full p-1.5 border border-purple-500 rounded-lg text-xs bg-[#070817] text-white"
                            />
                          ) : (
                            <p className="text-slate-400 text-xs italic">{lead.notes || 'None'}</p>
                          )}
                        </td>

                        <td className="p-4 text-right whitespace-nowrap space-x-2">
                          {editingLeadId === lead.id ? (
                            <>
                              <button
                                onClick={() => handleSaveLead(lead.id)}
                                className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingLeadId(null)}
                                className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEditLead(lead)}
                                className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-800 border border-purple-500/40 text-purple-300 hover:text-white transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              {lead.phone && (
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                                    `Hello ${lead.name}, regarding your PETZEUSTECH request for ${lead.service}:`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-600 border border-emerald-500/40 text-emerald-300 hover:text-white transition-colors inline-block"
                                >
                                  <Phone className="w-4 h-4" />
                                </a>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS CMS */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-[#0a0c27]/90 p-6 border border-purple-900/40 shadow-xl shadow-purple-950/20 flex flex-col justify-between text-left group hover:border-purple-500/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-purple-300">
                      {proj.departmentName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-600 text-white">
                          Featured
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border bg-purple-950/70 text-purple-300 border-purple-500/40">
                        {proj.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-white font-display mb-1.5">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-3">
                    {proj.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.technologies?.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-purple-950/40 text-purple-200 border border-purple-900/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    ID #{proj.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('projects', String(proj.id))}
                      className="px-2.5 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-800 text-purple-300 text-xs font-semibold transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ACADEMY COURSES */}
      {activeTab === 'academy' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academyCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl bg-[#0a0c27]/90 p-6 border border-purple-900/40 shadow-xl shadow-purple-950/20 text-left space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 uppercase">
                    {course.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                    {course.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {course.description}
                </p>

                <div className="pt-2 border-t border-purple-900/30 flex items-center justify-between text-xs text-slate-400">
                  <span>Duration: <strong className="text-white">{course.duration}</strong></span>
                  <span>Enrolled: <strong className="text-cyan-300">{course.enrolledStudents || 0} students</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BROADCAST ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-2xl bg-[#0a0c27]/90 p-6 border border-purple-900/40 shadow-xl shadow-purple-950/20 text-left space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-white">{ann.title}</h4>
                  <button
                    onClick={() => handleToggleAnnouncement(ann)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors border ${
                      ann.isActive
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    {ann.isActive ? 'Active (Live)' : 'Disabled'}
                  </button>
                </div>
                <p className="text-xs text-slate-300">{ann.description}</p>
                <div className="flex items-center gap-2 text-xs text-purple-400">
                  <span>Action: <strong>{ann.buttonText}</strong></span>
                  <span>•</span>
                  <span>Target: <code>{ann.buttonUrl}</code></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CONTACT INQUIRIES */}
      {activeTab === 'messages' && (
        <div className="bg-[#0a0c27]/90 rounded-2xl border border-purple-900/40 shadow-xl shadow-purple-950/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e1136] border-b border-purple-900/40 text-purple-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Sender</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Message</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Direct Response</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {contactMessages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No customer contact inquiries logged.
                    </td>
                  </tr>
                ) : (
                  contactMessages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="p-4">
                        <p className="font-bold text-white">{msg.fullName}</p>
                        <p className="text-slate-400 text-[11px]">{msg.email}</p>
                        {msg.phone && <p className="text-slate-400 text-[11px]">{msg.phone}</p>}
                      </td>
                      <td className="p-4 font-semibold text-purple-300">{msg.subject}</td>
                      <td className="p-4 max-w-sm text-slate-300 leading-relaxed">{msg.message}</td>
                      <td className="p-4 text-slate-400 whitespace-nowrap">{msg.createdAt}</td>
                      <td className="p-4 text-right whitespace-nowrap">
                        {msg.phone ? (
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${msg.fullName}, thanking you for contacting PETZEUSTECH regarding "${msg.subject}":`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow-md"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WhatsApp Reply</span>
                          </a>
                        ) : (
                          <a
                            href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow-md"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Email Reply</span>
                          </a>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 7: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-[#0a0c27]/90 rounded-2xl border border-purple-900/40 shadow-xl shadow-purple-950/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0e1136] border-b border-purple-900/40 text-purple-300 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">User ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/30">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400">
                      No system events recorded.
                    </td>
                  </tr>
                ) : (
                  auditLogs.slice().reverse().map((log) => (
                    <tr key={log.id} className="hover:bg-purple-950/20 transition-colors">
                      <td className="p-4 text-slate-400 whitespace-nowrap">{log.createdAt}</td>
                      <td className="p-4 font-mono font-bold text-cyan-400">{log.action}</td>
                      <td className="p-4 text-slate-300">{log.details}</td>
                      <td className="p-4 text-slate-400">{log.userId || 'System'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0c27] border border-purple-900/60 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl shadow-purple-950/80 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <h3 className="text-xl font-bold text-white font-display">Add New Project to CMS</h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-purple-200 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Regional Healthcare Patient Portal"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Department</label>
                  <select
                    value={newProject.departmentName}
                    onChange={(e) => setNewProject({ ...newProject, departmentName: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                  >
                    <option value="Software Labs">Software Labs</option>
                    <option value="CloudCore Hosting">CloudCore Hosting</option>
                    <option value="Electronics & Mobile">Electronics & Mobile</option>
                    <option value="Digital Graphics">Digital Graphics</option>
                    <option value="Ads & Media">Ads & Media</option>
                    <option value="IT Academy">IT Academy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Status</label>
                  <select
                    value={newProject.status}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Prototype">Prototype</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-1">Summary / Pitch *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe what the system does and its impact..."
                  value={newProject.summary}
                  onChange={(e) => setNewProject({ ...newProject, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Node.js, Tailwind"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-purple-900/60 text-slate-300 hover:bg-purple-950/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-md"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW ANNOUNCEMENT */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0c27] border border-purple-900/60 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl shadow-purple-950/80 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
              <h3 className="text-xl font-bold text-white font-display">New Broadcast Banner</h3>
              <button
                onClick={() => setShowAnnouncementModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-purple-200 font-semibold mb-1">Banner Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IT Academy Cohort 2026 Admissions Open"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-purple-200 font-semibold mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Details about the notice or promotional discount..."
                  value={newAnnouncement.description}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Button Text</label>
                  <input
                    type="text"
                    value={newAnnouncement.buttonText}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, buttonText: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-purple-200 font-semibold mb-1">Button Link</label>
                  <input
                    type="text"
                    value={newAnnouncement.buttonUrl}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, buttonUrl: e.target.value })}
                    className="w-full px-3 py-2 bg-[#070817] border border-purple-900/60 rounded-xl text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-purple-900/60 text-slate-300 hover:bg-purple-950/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-md"
                >
                  Publish Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
