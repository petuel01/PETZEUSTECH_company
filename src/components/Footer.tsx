import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ArrowUpRight, 
  Heart,
  Code,
  Server,
  Palette,
  Smartphone,
  Megaphone,
  GraduationCap
} from 'lucide-react';
import { COMPANY_INFO, DEPARTMENTS } from '../data/companyData';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = 2026;
  const { isDark } = useTheme();

  return (
    <footer className={`border-t pt-16 pb-12 relative z-10 transition-colors duration-200 ${
      isDark 
        ? 'bg-[#050613] text-slate-300 border-purple-900/30' 
        : 'bg-slate-100 text-slate-700 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
          isDark ? 'border-purple-900/30' : 'border-slate-200'
        }`}>
          
          {/* Brand & Purpose (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-purple-500/40 shadow-md shadow-purple-600/30 flex items-center justify-center bg-black/60">
                <img
                  src={APP_IMAGES.ptLogo}
                  alt="PETZEUSTECH PT Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className={`font-extrabold text-2xl tracking-tight font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                PETZEUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">TECH</span>
              </span>
            </div>
            
            <p className={`text-sm max-w-md leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              A Technology & Innovation Company — Powering Africa's Digital Future. 
              We engineer practical digital solutions, web applications, cloud hosting infrastructure, 
              creative visual design, smartphone and computer repairs, and hands-on IT training.
            </p>

            <div className={`pt-2 space-y-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href={buildGeneralWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium"
                >
                  WhatsApp: {COMPANY_INFO.whatsapp}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-300 flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-purple-300 transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Departments
            </h3>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'software-labs')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}
                >
                  Software Labs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'cloudcore')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}
                >
                  CloudCore Hosting
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'graphics')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}
                >
                  Graphics & Creative
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'electronics')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}
                >
                  Electronics & Repairs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'ads-marketing')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}
                >
                  Ads & Digital Marketing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services', 'it-academy')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}
                >
                  IT Academy
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Company
            </h3>
            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>
                <button onClick={() => onNavigate('about')} className={`transition-colors ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}>
                  About PETZEUSTECH
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className={`transition-colors ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}>
                  Projects & Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className={`transition-colors ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}>
                  Knowledge Hub & Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book')} className={`transition-colors font-semibold ${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'}`}>
                  Book a Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className={`transition-colors ${isDark ? 'hover:text-purple-300' : 'hover:text-purple-800'}`}>
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Location */}
          <div className="space-y-3">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
              Trust & Direct Access
            </h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every booking is backed by real engineering commitment. Verified directly via WhatsApp with zero automated delays.
            </p>
            <div className="pt-2">
              <a
                href={buildGeneralWhatsAppUrl('Fast Quote Inquiry')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-900/40 w-full justify-center"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-300" />
                <span>Chat with Founder</span>
              </a>
            </div>
            <div className={`pt-2 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Founder: <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{COMPANY_INFO.founder.name}</strong>
              <br />
              {COMPANY_INFO.founder.location}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
          <p>© {currentYear} {COMPANY_INFO.name}. All rights reserved. Powering Africa's Digital Future.</p>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('privacy')}
              className={`transition-colors ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-900'}`}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigate('terms')}
              className={`transition-colors ${isDark ? 'hover:text-slate-300' : 'hover:text-slate-900'}`}
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
