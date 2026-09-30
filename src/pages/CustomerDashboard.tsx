import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  MessageCircle, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  ExternalLink,
  Phone,
  Layers,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { User, Booking } from '../types';
import { api } from '../lib/api';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { useTheme } from '../context/ThemeContext';

interface CustomerDashboardProps {
  currentUser: User | null;
  onNavigate: (page: string, param?: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ currentUser, onNavigate }) => {
  const { isDark } = useTheme();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchRef, setSearchRef] = useState('');
  const [searchedBooking, setSearchedBooking] = useState<Booking | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    loadUserBookings();
  }, [currentUser]);

  const loadUserBookings = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const data = await api.getBookings();
      // Filter bookings for this user if applicable, or by matching email/phone
      const userBookings = data.filter(
        (b) => b.userId === currentUser.id || b.customerEmail.toLowerCase() === currentUser.email.toLowerCase()
      );
      setBookings(userBookings.length > 0 ? userBookings : data.slice(0, 3)); // Fallback sample if brand new
    } catch (err) {
      console.error('Failed to load bookings', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLookupReference = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;
    setSearchError(null);
    setSearchedBooking(null);

    try {
      const res = await api.getBookingByRef(searchRef.trim());
      setSearchedBooking(res);
    } catch (err: any) {
      setSearchError(err.message || 'No booking found with this reference code.');
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'Pending':
        return isDark ? 'bg-amber-950/60 text-amber-300 border-amber-500/40' : 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Confirmed':
        return isDark ? 'bg-blue-950/60 text-blue-300 border-blue-500/40' : 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress':
        return isDark ? 'bg-purple-950/60 text-purple-300 border-purple-500/40' : 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Completed':
        return isDark ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' : 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return isDark ? 'bg-slate-900 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
        isDark ? 'border-purple-900/40' : 'border-slate-200'
      }`}>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Client Self-Service Portal
          </span>
          <h1 className={`text-3xl sm:text-4xl font-black font-display tracking-tight mt-1 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Customer Dashboard & Tracking
          </h1>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {currentUser 
              ? `Welcome back, ${currentUser.fullName}. Review your active and previous service bookings.`
              : 'Track any service booking using your official PETZEUSTECH reference code.'
            }
          </p>
        </div>

        <button
          onClick={() => onNavigate('book')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/30 whitespace-nowrap self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Service Booking</span>
        </button>
      </div>

      {/* Quick Lookup by Reference Code */}
      <div className={`rounded-3xl p-6 border shadow-xl space-y-4 transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-purple-950/30' 
          : 'bg-white border-slate-200 shadow-slate-200/50'
      }`}>
        <h3 className={`text-sm font-bold uppercase tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Instant Booking Status Lookup
        </h3>
        <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
          Enter any reference code (e.g., <code className={`px-1 py-0.5 rounded font-mono ${
            isDark ? 'bg-[#181c4e] text-purple-300' : 'bg-slate-100 text-purple-700'
          }`}>PTZ-20260913-0001</code>) to check live technician updates.
        </p>

        <form onSubmit={handleLookupReference} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="e.g. PTZ-20260913-0001"
              value={searchRef}
              onChange={(e) => setSearchRef(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase font-mono border transition-colors ${
                isDark 
                  ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>
          <button
            type="submit"
            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              isDark 
                ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            Check Status
          </button>
        </form>

        {searchError && (
          <div className={`p-3 border text-xs rounded-xl flex items-center gap-2 ${
            isDark ? 'bg-rose-950/60 border-rose-500/40 text-rose-300' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{searchError}</span>
          </div>
        )}

        {searchedBooking && (
          <div className={`p-5 rounded-2xl border space-y-3 animate-in fade-in ${
            isDark 
              ? 'bg-[#111333] border-purple-900/50' 
              : 'bg-purple-50/50 border-purple-200'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className={`text-[11px] uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Found Reference</span>
                <p className={`font-mono font-bold text-base ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>{searchedBooking.bookingReference}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(searchedBooking.status)}`}>
                {searchedBooking.status}
              </span>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2 border-t ${
              isDark ? 'border-purple-900/40' : 'border-purple-200/80'
            }`}>
              <div>
                <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Service</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{searchedBooking.serviceName}</strong>
              </div>
              <div>
                <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Department</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{searchedBooking.departmentName}</strong>
              </div>
              <div>
                <span className={`block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Preferred Date</span>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>{searchedBooking.preferredDate}</strong>
              </div>
            </div>

            {searchedBooking.adminNotes && (
              <div className={`p-3 rounded-xl border text-xs ${
                isDark 
                  ? 'bg-[#0b0c24] border-purple-900/40 text-slate-200' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <span className={`font-bold block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Technician / Admin Update:</span>
                <p>{searchedBooking.adminNotes}</p>
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <a
                href={buildGeneralWhatsAppUrl(`Status update on reference ${searchedBooking.bookingReference}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm"
              >
                <Phone className="w-3 h-3" />
                <span>Follow up on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* User Bookings Table / List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-lg font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Active & Past Service Requests
          </h3>
          {currentUser && (
            <button
              onClick={loadUserBookings}
              className={`text-xs hover:underline flex items-center gap-1 ${
                isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          )}
        </div>

        {bookings.length === 0 ? (
          <div className={`p-8 rounded-3xl border text-center space-y-3 ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 text-slate-300' 
              : 'bg-white border-slate-200 text-slate-600 shadow-sm'
          }`}>
            <Calendar className={`w-10 h-10 mx-auto ${isDark ? 'text-purple-400' : 'text-slate-400'}`} />
            <h4 className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>No bookings logged yet</h4>
            <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Whenever you book a service or repair, your order details and progress milestones will appear here.
            </p>
            <button
              onClick={() => onNavigate('book')}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/30"
            >
              Book Your First Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-5 rounded-3xl border shadow-md space-y-3 transition-all ${
                  isDark 
                    ? 'bg-[#0b0c24]/90 border-purple-900/40 hover:border-purple-500/50 shadow-purple-950/20' 
                    : 'bg-white border-slate-200 hover:border-purple-300 shadow-slate-200/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    isDark 
                      ? 'bg-purple-950/70 text-purple-300 border-purple-500/30' 
                      : 'bg-purple-50 text-purple-800 border-purple-200'
                  }`}>
                    {booking.bookingReference}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div>
                  <h4 className={`font-bold text-sm font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {booking.serviceName}
                  </h4>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{booking.departmentName}</p>
                </div>

                <div className={`text-xs p-2.5 rounded-xl border ${
                  isDark 
                    ? 'bg-[#08091a] text-slate-300 border-purple-900/30' 
                    : 'bg-slate-50 text-slate-700 border-slate-100'
                }`}>
                  <p className="line-clamp-2 italic">"{booking.problemDescription}"</p>
                </div>

                <div className={`flex items-center justify-between text-xs pt-1 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <span>Scheduled: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{booking.preferredDate}</strong></span>
                  <span>Town: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{booking.locationTown}</strong></span>
                </div>

                {booking.adminNotes && (
                  <div className={`text-[11px] p-2 rounded-lg border ${
                    isDark 
                      ? 'bg-amber-950/60 text-amber-200 border-amber-500/40' 
                      : 'bg-amber-50 text-amber-900 border-amber-200'
                  }`}>
                    <strong>Admin Note:</strong> {booking.adminNotes}
                  </div>
                )}

                <div className={`pt-2 border-t flex items-center justify-between ${
                  isDark ? 'border-purple-900/30' : 'border-slate-100'
                }`}>
                  <a
                    href={buildGeneralWhatsAppUrl(`Inquiry about ${booking.bookingReference}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs font-bold hover:underline flex items-center gap-1 ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                  <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Logged: {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
