import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Lock, 
  Mail, 
  Phone, 
  ArrowRight, 
  AlertCircle,
  Github,
  CheckCircle2
} from 'lucide-react';
import { api } from '../lib/api';
import { User } from '../types';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface SignUpProps {
  onSuccess: (user: User) => void;
  onNavigate: (page: string) => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSuccess, onNavigate }) => {
  const { isDark } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const user = await api.register({
        fullName,
        email,
        phone,
        password,
      });
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError(null);
    setLoading(true);
    try {
      const user = await api.oauthLogin(provider, {
        providerId: `${provider}_${Date.now()}`,
        email: `new.${provider}@petzeustech.com`,
        fullName: `${provider.toUpperCase()} New Member`,
      });
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || `Failed to sign up with ${provider}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-left relative z-10">
      <div className={`rounded-3xl p-8 border shadow-2xl space-y-6 transition-all ${
        isDark 
          ? 'bg-[#0a0c27]/95 border-purple-900/40 shadow-purple-950/60' 
          : 'bg-white border-slate-200 shadow-slate-200/80'
      }`}>
        
        {/* Header with PT Logo */}
        <div className="space-y-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-950/50 flex items-center justify-center bg-black/60">
            <img
              src={APP_IMAGES.ptLogo}
              alt="PETZEUSTECH PT Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className={`text-2xl sm:text-3xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Create an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Account</span>
            </h1>
            <p className={`text-xs mt-1 ${isDark ? 'text-purple-300/80' : 'text-slate-600'}`}>
              Join PETZEUSTECH to track projects, manage hosting, and book priority services.
            </p>
          </div>
        </div>

        {error && (
          <div className={`p-3 border text-xs rounded-xl flex items-center gap-2 ${
            isDark ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}>
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-xl border font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm ${
              isDark 
                ? 'border-purple-900/50 bg-[#111338]/80 hover:bg-[#191c4d] text-white' 
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={loading}
            className={`w-full py-2.5 px-4 rounded-xl border font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm ${
              isDark 
                ? 'border-purple-900/50 bg-[#111338]/80 hover:bg-[#191c4d] text-white' 
                : 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800'
            }`}
          >
            <Github className={`w-4 h-4 ${isDark ? 'text-purple-300' : 'text-slate-700'}`} />
            <span>Sign up with GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className={`flex-grow border-t ${isDark ? 'border-purple-900/40' : 'border-slate-200'}`}></div>
          <span className={`flex-shrink mx-3 text-[11px] uppercase font-bold tracking-wider ${
            isDark ? 'text-purple-400' : 'text-slate-500'
          }`}>
            Or Complete Details
          </span>
          <div className={`flex-grow border-t ${isDark ? 'border-purple-900/40' : 'border-slate-200'}`}></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
              Full Name <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Roland Ewane"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                  isDark 
                    ? 'bg-[#070817] border-purple-900/60 text-white placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
              Email Address <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="roland@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                  isDark 
                    ? 'bg-[#070817] border-purple-900/60 text-white placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
              WhatsApp / Phone
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="+237 6XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                  isDark 
                    ? 'bg-[#070817] border-purple-900/60 text-white placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-purple-200' : 'text-slate-700'}`}>
              Create Password <span className="text-purple-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 border transition-colors ${
                  isDark 
                    ? 'bg-[#070817] border-purple-900/60 text-white placeholder:text-slate-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-purple-950/50 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Sign Up'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch to Sign In */}
        <div className={`pt-2 text-center text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>Already have an account? </span>
          <button
            onClick={() => onNavigate('signin')}
            className={`font-bold hover:underline ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'}`}
          >
            Sign In Here
          </button>
        </div>

      </div>
    </div>
  );
};
