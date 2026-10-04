import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  ShieldCheck, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  LayoutDashboard,
  Sun,
  Moon
} from 'lucide-react';
import { User } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  currentUser,
  onLogout,
}) => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'academy', label: 'Academy' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 shadow-lg ${
      isDark 
        ? 'bg-[#070817]/95 border-purple-900/30 text-white shadow-purple-950/20' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-200/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity with awesome PT Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl p-1"
            id="brand-logo-btn"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-purple-500/40 shadow-md shadow-purple-600/30 group-hover:border-purple-400 group-hover:scale-105 transition-all bg-black/60 flex items-center justify-center relative">
              <img
                src={APP_IMAGES.ptLogo}
                alt="PETZEUSTECH PT Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className={`font-black text-2xl tracking-tight font-display flex items-center gap-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                PETZEUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600">TECH</span>
              </span>
              <p className={`text-[11px] font-semibold uppercase tracking-widest hidden sm:block ${
                isDark ? 'text-purple-300/80' : 'text-purple-700'
              }`}>
                Technology & Innovation
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl transition-all duration-150 ${
                    isActive
                      ? isDark
                        ? 'text-white bg-purple-600/30 border border-purple-500/40 font-bold shadow-sm shadow-purple-900/30'
                        : 'text-purple-700 bg-purple-100 border border-purple-300 font-bold shadow-sm'
                      : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions & CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button (Light / Dark Mode) */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                isDark 
                  ? 'bg-purple-950/40 border-purple-500/30 text-amber-300 hover:bg-purple-900/50 hover:text-amber-200 shadow-sm' 
                  : 'bg-slate-100 border-slate-300 text-indigo-700 hover:bg-slate-200 hover:text-indigo-900 shadow-sm'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] text-slate-300">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span className="text-[11px] text-slate-700">Dark</span>
                </>
              )}
            </button>

            {/* Authentication / User Account Menu */}
            {currentUser && (
              <div className="relative">
                <button
                  id="user-menu-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border transition-colors text-sm font-medium ${
                    isDark 
                      ? 'border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/40 text-slate-200' 
                      : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate">{currentUser.fullName.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 ${isDark ? 'text-purple-300' : 'text-slate-500'}`} />
                </button>

                {profileDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl border py-1.5 z-50 transition-all ${
                    isDark 
                      ? 'bg-[#0c0d24] border-purple-500/30 text-slate-200 shadow-purple-950/50' 
                      : 'bg-white border-slate-200 text-slate-800 shadow-xl'
                  }`}>
                    <div className={`px-4 py-2.5 border-b ${isDark ? 'border-purple-900/40' : 'border-slate-100'}`}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-purple-300/80' : 'text-purple-600'}`}>Signed in as</p>
                      <p className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{currentUser.fullName}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full border ${
                        isDark 
                          ? 'bg-purple-900/60 text-purple-300 border-purple-500/30' 
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {currentUser.role}
                      </span>
                    </div>

                    <button
                      onClick={() => handleNavClick('customer-dashboard')}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                        isDark ? 'text-slate-200 hover:bg-purple-900/30' : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      id="menu-my-dashboard-btn"
                    >
                      <LayoutDashboard className="w-4 h-4 text-purple-500" />
                      <span>My Dashboard & Bookings</span>
                    </button>

                    {(currentUser.role === 'admin' || currentUser.role === 'super_admin' || currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
                      <button
                        onClick={() => handleNavClick('admin-dashboard')}
                        className={`w-full text-left px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${
                          isDark ? 'text-purple-300 hover:bg-purple-900/40' : 'text-purple-700 hover:bg-purple-50'
                        }`}
                        id="menu-admin-panel-btn"
                      >
                        <ShieldCheck className="w-4 h-4 text-purple-500" />
                        <span>Admin Control Console</span>
                      </button>
                    )}

                    <div className={`border-t my-1 ${isDark ? 'border-purple-900/40' : 'border-slate-100'}`}></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 flex items-center gap-2 transition-colors`}
                      id="menu-logout-btn"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              id="mobile-theme-toggle-btn"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-xl border transition-colors ${
                isDark 
                  ? 'bg-purple-950/50 border-purple-500/30 text-amber-300' 
                  : 'bg-slate-100 border-slate-300 text-indigo-700'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t px-4 pt-3 pb-6 space-y-3 ${
          isDark ? 'border-purple-900/40 bg-[#0a0b1e]' : 'border-slate-200 bg-white'
        }`}>
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-purple-900/20">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === link.id
                    ? isDark 
                      ? 'bg-purple-900/50 text-purple-300 font-bold border border-purple-500/30' 
                      : 'bg-purple-100 text-purple-800 font-bold border border-purple-200'
                    : isDark 
                      ? 'text-slate-300 hover:bg-white/5' 
                      : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-1">
            {currentUser && (
              <div className={`pt-2 border-t space-y-1 ${isDark ? 'border-purple-900/40' : 'border-slate-200'}`}>
                <div className={`px-3 py-1 text-xs ${isDark ? 'text-purple-300/80' : 'text-purple-700'}`}>
                  Logged in as <strong className={isDark ? 'text-white' : 'text-slate-900'}>{currentUser.fullName}</strong>
                </div>
                <button
                  onClick={() => handleNavClick('customer-dashboard')}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                    isDark ? 'text-slate-200 hover:bg-purple-900/30' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  My Dashboard & Bookings
                </button>
                {(currentUser.role === 'admin' || currentUser.role === 'super_admin' || currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN') && (
                  <button
                    onClick={() => handleNavClick('admin-dashboard')}
                    className={`w-full text-left px-3 py-2 text-sm font-bold rounded-lg ${
                      isDark ? 'text-purple-300 hover:bg-purple-900/40' : 'text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    Admin Control Console
                  </button>
                )}
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-rose-500 hover:bg-rose-500/10 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
