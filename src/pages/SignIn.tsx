import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { api } from '../lib/api';
import { User } from '../types';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface SignInProps {
  onSuccess: (user: User) => void;
  onNavigate: (page: string, param?: string) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSuccess, onNavigate }) => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // First try dedicated admin login endpoint
      let authUser: User | null = null;
      try {
        const adminRes = await api.loginAdmin(email.trim(), password);
        authUser = adminRes.user;
      } catch (err) {
        // Fallback to standard login
        const stdRes = await api.loginEmail(email.trim(), password);
        authUser = stdRes.user;
      }

      if (authUser) {
        onSuccess(authUser);
        onNavigate('admin-dashboard');
      } else {
        throw new Error('Authentication returned empty user record.');
      }
    } catch (err: any) {
      console.error('Admin login error:', err);
      setError(err.message || 'Admin authentication failed. Please verify email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-left relative z-10">
      <div className={`rounded-3xl p-8 sm:p-10 border shadow-2xl space-y-6 transition-all ${
        isDark 
          ? 'bg-[#0a0c27]/95 border-purple-900/50 shadow-purple-950/70' 
          : 'bg-white border-slate-200 shadow-slate-200/80'
      }`}>
        
        {/* Header with Official PT Logo */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-purple-500/60 shadow-lg shadow-purple-950/60 flex items-center justify-center bg-black">
              <img
                src={APP_IMAGES.ptLogo}
                alt="PETZEUSTECH Official Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
              isDark 
                ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' 
                : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
              <span>Admin Access Console</span>
            </span>
          </div>

          <div>
            <h1 className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Administrator <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Sign In</span>
            </h1>
            <p className={`text-xs mt-1.5 leading-relaxed ${
              isDark ? 'text-purple-300/80' : 'text-slate-600'
            }`}>
              Restricted management console for Founder <strong>Petuel Baifem</strong> and authorized technical personnel.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className={`p-3.5 border text-xs rounded-xl flex items-start gap-2.5 animate-in fade-in ${
            isDark ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Authentication Failed</p>
              <p className="mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Admin Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="baifempetuel0.2@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                  isDark 
                    ? 'bg-[#070817] border-purple-900/60 text-white placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
              Master Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                  isDark 
                    ? 'bg-[#070817] border-purple-900/60 text-white placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-400 p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-950/50 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Authenticating Admin Guard...' : 'Unlock Admin Console'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Customer Redirection */}
        <div className={`pt-4 border-t text-center space-y-2 text-xs ${
          isDark ? 'border-purple-900/40 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <p>
            Looking to check your device repair or project status?
          </p>
          <button
            type="button"
            onClick={() => onNavigate('customer-dashboard')}
            className={`font-bold hover:underline transition-colors ${
              isDark ? 'text-purple-300 hover:text-white' : 'text-purple-700 hover:text-purple-900'
            }`}
          >
            Go to Customer Order Tracking (Reference Code Only) →
          </button>
        </div>

      </div>
    </div>
  );
};
