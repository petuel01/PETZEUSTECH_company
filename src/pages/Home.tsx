import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Code, 
  Server, 
  Palette, 
  Smartphone, 
  Megaphone, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Award, 
  Phone, 
  Layers,
  ChevronRight,
  Zap,
  ExternalLink,
  Play,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';
import { DEPARTMENTS, PROJECTS, COMPANY_INFO } from '../data/companyData';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { APP_IMAGES } from '../assets/images';
import { api } from '../lib/api';
import { Project, Announcement } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HomeProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [projectList, setProjectList] = useState<Project[]>(PROJECTS);
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    // Load live projects & announcements from REST API
    api.getProjects().then((data) => {
      if (data && data.length > 0) setProjectList(data);
    }).catch((e) => console.warn('Using offline static projects', e));

    api.getAnnouncements().then((anns) => {
      const live = anns?.find(a => a.isActive);
      if (live) setActiveAnnouncement(live);
    }).catch((e) => console.warn('Using offline announcements', e));
  }, []);
  const departmentIcons: Record<string, React.ReactNode> = {
    'software-labs': <Code className="w-6 h-6 text-purple-400" />,
    'cloudcore': <Server className="w-6 h-6 text-indigo-400" />,
    'graphics': <Palette className="w-6 h-6 text-fuchsia-400" />,
    'electronics': <Smartphone className="w-6 h-6 text-cyan-400" />,
    'ads-marketing': <Megaphone className="w-6 h-6 text-amber-400" />,
    'it-academy': <GraduationCap className="w-6 h-6 text-emerald-400" />,
  };

  const departmentImages: Record<string, string> = {
    'software-labs': APP_IMAGES.softwareLabs,
    'cloudcore': APP_IMAGES.cloudServers,
    'graphics': APP_IMAGES.graphicsMedia,
    'electronics': APP_IMAGES.electronicsRepair,
    'ads-marketing': APP_IMAGES.adsMarketing,
    'it-academy': APP_IMAGES.itAcademy,
  };

  const departmentVisualTags: Record<string, { tag: string; bg: string }> = {
    'software-labs': { tag: 'Web & Mobile Coding', bg: 'bg-purple-600/95' },
    'cloudcore': { tag: 'Cloud Servers & Hosting', bg: 'bg-indigo-600/95' },
    'graphics': { tag: 'Logos & Visual Branding', bg: 'bg-fuchsia-600/95' },
    'electronics': { tag: 'Hardware & Phone Repairs', bg: 'bg-cyan-600/95' },
    'ads-marketing': { tag: 'Online Ads & Social Media', bg: 'bg-amber-600/95' },
    'it-academy': { tag: 'Tech Classes & Mentorship', bg: 'bg-emerald-600/95' },
  };

  return (
    <div className={`space-y-24 pb-20 transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      {/* 1. HERO SECTION */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative pt-6 md:pt-12 overflow-hidden"
      >
        {/* Subtle background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-purple-900/20 via-indigo-950/15 to-transparent -z-10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border shadow-sm ${
                isDark 
                  ? 'bg-purple-950/60 border-purple-500/40 text-purple-300 shadow-purple-900/30' 
                  : 'bg-purple-100 border-purple-300 text-purple-800'
              }`}>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                <span>Powering Africa's Digital Future • Cameroon</span>
              </div>

              {/* Exact Approved Headline with vibrant purple gradient */}
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-600">Digital Solutions</span> for a Better Future.
              </h1>

              {/* Exact Approved Supporting Text */}
              <p className={`text-lg sm:text-xl max-w-2xl font-normal leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                PETZEUSTECH creates practical digital products, technology services and creative solutions for individuals, businesses and organizations.
              </p>

              {/* Exact Approved Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  id="hero-explore-services-btn"
                  onClick={() => onNavigate('services')}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all border ${
                    isDark 
                      ? 'text-white bg-[#0e102d] hover:bg-[#161942] border-purple-500/40 shadow-md shadow-purple-950/40 hover:border-purple-400' 
                      : 'text-slate-800 bg-white hover:bg-slate-50 border-slate-300 shadow-md shadow-slate-200/60 hover:border-purple-300'
                  }`}
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-purple-500" />
                </button>

                <button
                  id="hero-book-service-btn"
                  onClick={() => onNavigate('book')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:from-purple-700 active:to-indigo-700 shadow-lg shadow-purple-600/40 border border-purple-400/40 transition-all transform active:scale-98"
                >
                  <span>Book a Service</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className={`pt-6 border-t flex flex-wrap items-center gap-6 text-xs font-medium ${
                isDark ? 'border-purple-900/40 text-slate-400' : 'border-slate-200 text-slate-600'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Real Reference Codes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Safe WhatsApp Messaging</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>100% Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* Right Premium Visual (Central Africa Tech Hub & Department Directory) */}
            <div className="lg:col-span-5">
              <div className={`relative rounded-3xl p-5 sm:p-6 border backdrop-blur-xl overflow-hidden group transition-all ${
                isDark 
                  ? 'bg-[#0b0c24]/90 shadow-2xl shadow-purple-950/60 border-purple-500/30 text-white' 
                  : 'bg-white shadow-xl shadow-slate-200/80 border-slate-200 text-slate-800'
              }`}>
                
                {/* Visual Hero Authentic Tech Lab Frame */}
                <div className={`relative rounded-2xl overflow-hidden mb-5 group/img border shadow-lg ${
                  isDark ? 'border-purple-500/40 shadow-purple-950/50' : 'border-slate-200 shadow-slate-200/60'
                }`}>
                  <img
                    src={APP_IMAGES.heroTech}
                    alt="PETZEUSTECH Technology Engineering in Cameroon"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                  
                  {/* Floating Location Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-400/50 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 shadow-lg">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Cameroon & Global</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div>
                      <p className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                        PETZEUSTECH Tech Hub
                      </p>
                      <p className="text-xs font-semibold text-slate-200">
                        Bridging Technology & Real Commercial Impact
                      </p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-500 text-white backdrop-blur-sm border border-emerald-400/40 shadow-sm">
                      On-Site & Online
                    </span>
                  </div>
                </div>

                {/* Card Title & Info */}
                <div className={`flex items-center justify-between pb-3 border-b ${
                  isDark ? 'border-purple-900/40' : 'border-slate-200'
                }`}>
                  <div>
                    <h3 className={`font-extrabold text-sm font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Six Dedicated Departments
                    </h3>
                    <p className={`text-[11px] ${isDark ? 'text-purple-300/70' : 'text-purple-700'}`}>
                      Commercial & Local Tech Services
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                    isDark 
                      ? 'bg-purple-900/60 text-purple-300 border-purple-500/30' 
                      : 'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>
                    40+ Services
                  </span>
                </div>

                {/* 6 Department Snapshot Grid with Enlarged Visual Thumbnails & Flexboxes */}
                <div className="grid grid-cols-2 gap-3 py-4">
                  {DEPARTMENTS.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => onNavigate('services', dept.slug)}
                      className={`p-3 rounded-2xl border transition-all text-left group flex items-center gap-3.5 transform hover:-translate-y-0.5 ${
                        isDark 
                          ? 'border-purple-900/40 bg-[#101235]/80 hover:bg-purple-900/30 hover:border-purple-400/60 shadow-md shadow-purple-950/40 hover:shadow-xl hover:shadow-purple-900/40' 
                          : 'border-slate-200 bg-slate-50/80 hover:bg-purple-50/50 hover:border-purple-300 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-purple-500/40 shadow-md relative group-hover:scale-105 transition-transform duration-300">
                        {departmentImages[dept.slug] ? (
                          <img
                            src={departmentImages[dept.slug]}
                            alt={dept.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-purple-950' : 'bg-purple-100'}`}>
                            {departmentIcons[dept.slug] || <Code className="w-6 h-6 text-purple-500" />}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-bold text-xs transition-colors truncate ${
                          isDark ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
                        }`}>
                          {dept.name.replace('PETZEUSTECH ', '')}
                        </h4>
                        <p className={`text-[11px] font-medium truncate ${
                          isDark ? 'text-purple-300/80' : 'text-purple-700'
                        }`}>
                          {departmentVisualTags[dept.slug]?.tag || `${dept.services.length} services`}
                        </p>
                        <span className={`inline-block mt-0.5 text-[9px] font-semibold px-1.5 py-0.5 rounded border ${
                          isDark ? 'text-slate-400 bg-black/40 border-purple-900/40' : 'text-slate-600 bg-white border-slate-200'
                        }`}>
                          {dept.services.length} services
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Founder Fast Dispatch Banner with Petuel's Authentic Portrait */}
                <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 shadow-inner ${
                  isDark ? 'bg-[#060714] border-purple-900/40 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
                }`}>
                  <div className="flex items-center gap-3">
                    <img
                      src={APP_IMAGES.founderProfile}
                      alt="Petuel Baifem"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-xl object-cover border-2 border-purple-500 shadow-md shadow-purple-600/30"
                    />
                    <div>
                      <p className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Founder WhatsApp Dispatch</p>
                      <p className={`text-[10px] ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>Petuel Baifem • +237 677 251 088</p>
                    </div>
                  </div>
                  <a
                    href={buildGeneralWhatsAppUrl('Hero Fast Chat')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 flex-shrink-0"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 2. KEY STATISTICS with slide animation */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/80 border-purple-900/40 shadow-lg shadow-purple-950/20 hover:border-purple-500/40' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-fuchsia-500 font-display">6</span>
            <h4 className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Core Departments</h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Software, Cloud, Electronics & more</p>
          </div>

          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/80 border-purple-900/40 shadow-lg shadow-purple-950/20 hover:border-purple-500/40' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 font-display">40+</span>
            <h4 className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Active Services</h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Ready for direct booking</p>
          </div>

          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/80 border-purple-900/40 shadow-lg shadow-purple-950/20 hover:border-purple-500/40' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 font-display">&lt; 24h</span>
            <h4 className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>WhatsApp Response</h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Quick diagnostic & quote</p>
          </div>

          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/80 border-purple-900/40 shadow-lg shadow-purple-950/20 hover:border-purple-500/40' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300'
          }`}>
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-display">100%</span>
            <h4 className={`text-sm font-bold mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Honest Scoping</h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>No fake tech promises</p>
          </div>
        </div>
      </motion.section>

      {/* 2. SERVICE HIGHLIGHTS (All 6 Departments) */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-left max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            What We Do
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mt-1 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Six Specialized Technology Departments.
          </h2>
          <p className={`text-base mt-2 ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Every department is focused on real commercial capability that the founder and our team actively support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className={`rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between text-left group overflow-hidden ${
                isDark 
                  ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 hover:border-purple-500/70 hover:shadow-2xl hover:shadow-purple-700/20' 
                  : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-100'
              }`}
            >
              <div>
                {/* Visual Image Header - Significantly Increased Size with Beautiful Shadows & Flex Boxes */}
                <div className={`w-full h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 relative group/img border-2 transition-all duration-500 ${
                  isDark 
                    ? 'shadow-2xl shadow-purple-950/70 border-purple-500/40 group-hover:border-purple-400/80' 
                    : 'shadow-lg shadow-slate-200 border-slate-200 group-hover:border-purple-300'
                }`}>
                  {departmentImages[dept.slug] ? (
                    <img
                      src={departmentImages[dept.slug]}
                      alt={dept.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-[#121332]' : 'bg-slate-100'}`}>
                      {departmentIcons[dept.slug]}
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Floating Department Icon Badge */}
                  <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-2xl bg-black/70 backdrop-blur-md shadow-lg flex items-center justify-center border border-purple-400/50">
                    {departmentIcons[dept.slug] || <Code className="w-5 h-5 text-purple-400" />}
                  </div>

                  {/* Visual Capability Tag Flex Box */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className={`px-3 py-1.5 text-xs font-bold rounded-xl text-white shadow-lg backdrop-blur-sm border border-white/20 ${departmentVisualTags[dept.slug]?.bg || 'bg-purple-600/90'}`}>
                      {departmentVisualTags[dept.slug]?.tag || dept.name}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-black/75 text-purple-200 border border-purple-400/40 backdrop-blur-md shadow-md">
                      {dept.services.length} Services
                    </span>
                  </div>
                </div>

                <h3 className={`text-xl sm:text-2xl font-bold font-display transition-colors ${
                  isDark ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-700'
                }`}>
                  {dept.name}
                </h3>

                {/* Approved Simple Wording */}
                <p className={`text-xs sm:text-sm font-semibold rounded-xl p-3.5 my-3.5 border shadow-inner ${
                  isDark 
                    ? 'text-purple-300 bg-purple-950/60 border-purple-500/40' 
                    : 'text-purple-900 bg-purple-50/80 border-purple-200'
                }`}>
                  "{dept.simpleWording}"
                </p>

                <p className={`text-xs leading-relaxed mb-4 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {dept.shortDescription}
                </p>

                {/* Highlighted services list with beautiful flex chips */}
                <div className={`border-t pt-3.5 space-y-2 ${isDark ? 'border-purple-900/30' : 'border-slate-200'}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${
                    isDark ? 'text-purple-400' : 'text-purple-700'
                  }`}>Popular Capabilities:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.services.slice(0, 3).map((srv) => (
                      <span 
                        key={srv.id} 
                        className={`text-[11px] rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm border ${
                          isDark 
                            ? 'text-purple-200 bg-[#12143a]/90 border-purple-800/40' 
                            : 'text-slate-700 bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                        <span className="truncate max-w-[200px]">{srv.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`pt-6 mt-4 border-t flex items-center justify-between ${
                isDark ? 'border-purple-900/30' : 'border-slate-200'
              }`}>
                <button
                  onClick={() => onNavigate('services', dept.slug)}
                  className={`text-xs font-bold flex items-center gap-1 group-hover:underline ${
                    isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
                  }`}
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('book', dept.name)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white transition-all shadow-md shadow-purple-600/30"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 4. SHORT COMPANY STORY & FOUNDER with motion */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className={`rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border transition-all ${
          isDark 
            ? 'bg-[#090a1e] text-white border-purple-900/40 shadow-2xl shadow-purple-950/40' 
            : 'bg-white text-slate-900 border-slate-200 shadow-xl shadow-slate-200/70'
        }`}>
          {/* Accent corner glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 blur-3xl -z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                Our Story & Commitment
              </span>
              <h2 className={`text-3xl sm:text-4xl font-black font-display ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Built in Cameroon. Built for Africa.
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                PETZEUSTECH was founded by <strong>Petuel Baifem</strong> with one conviction: technology should not be an inaccessible luxury or an exaggerated promise. It should solve everyday problems for schools, local businesses, entrepreneurs, and students.
              </p>
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                We believe in straightforward communication, robust engineering, and transparent pricing. When you request a service, you speak directly with our team, receive a real reference code, and get practical results.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-purple-500 hover:text-purple-600 underline underline-offset-4"
                >
                  <span>Read full founder profile and company vision</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className={`rounded-2xl p-6 border space-y-4 text-left shadow-xl ${
                isDark ? 'bg-[#0d0f2b] border-purple-500/30' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-4">
                  <img
                    src={APP_IMAGES.founderProfile}
                    alt="Petuel Baifem, Founder and Lead Engineer"
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-500 shadow-lg shadow-purple-600/30 flex-shrink-0"
                  />
                  <div>
                    <h4 className={`font-bold text-base sm:text-lg font-display ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {COMPANY_INFO.founder.name}
                    </h4>
                    <p className={`text-xs font-semibold ${
                      isDark ? 'text-purple-400' : 'text-purple-700'
                    }`}>
                      {COMPANY_INFO.founder.title}
                    </p>
                    <p className={`text-[11px] mt-0.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {COMPANY_INFO.founder.location}
                    </p>
                  </div>
                </div>
                <p className={`text-xs italic border-l-2 border-purple-500 pl-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  "{COMPANY_INFO.founder.bio}"
                </p>
                <div className="pt-2 flex gap-2">
                  <a
                    href={buildGeneralWhatsAppUrl('Inquiry for Petuel')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 text-center text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Petuel</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. SELECTED PROJECTS WITH HONEST STATUSES with motion */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 text-left gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
              What We Have Built
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black mt-1 font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Selected Projects & Systems.
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Every project is labeled with its real, honest stage of development.
            </p>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-500 hover:text-purple-600"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectList.filter((p) => p.featured).slice(0, 3).map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl p-6 border flex flex-col justify-between text-left transition-all ${
                isDark
                  ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-lg shadow-purple-950/20 hover:border-purple-500/50'
                  : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-purple-400">
                    {project.departmentName}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                      project.status === 'Completed'
                        ? isDark ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : project.status === 'In Progress'
                        ? isDark ? 'bg-purple-950/60 text-purple-300 border-purple-500/30' : 'bg-purple-50 text-purple-700 border-purple-200'
                        : project.status === 'Prototype'
                        ? isDark ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : isDark ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className={`font-bold text-lg font-display mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {project.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                        isDark 
                          ? 'bg-purple-950/40 text-purple-200 border-purple-900/40' 
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onNavigate('projects', String(project.id))}
                className="w-full py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-colors shadow-md shadow-purple-900/20"
              >
                View Project Details
              </button>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 6. WHY CHOOSE PETZEUSTECH with motion */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-left max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Our Advantage
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mt-1 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Why People and Businesses Work With Us.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-lg shadow-purple-950/20' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${
              isDark ? 'bg-purple-950/70 text-purple-400 border-purple-500/30' : 'bg-purple-50 text-purple-600 border-purple-200'
            }`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Honest Engineering</h4>
            <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              We never promise things we cannot deliver. If a job is outside our current scope, we tell you immediately.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-lg shadow-purple-950/20' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${
              isDark ? 'bg-indigo-950/70 text-indigo-400 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Direct WhatsApp Access</h4>
            <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              No endless automated support tickets. You communicate directly with the technicians building or repairing your solution.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-lg shadow-purple-950/20' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${
              isDark ? 'bg-cyan-950/70 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-600 border-cyan-200'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>African Network Optimized</h4>
            <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              All web products and hosting are configured to load rapidly on mobile networks and budget Android devices.
            </p>
          </div>

          <div className={`p-6 rounded-2xl border text-left transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-lg shadow-purple-950/20' 
              : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${
              isDark ? 'bg-fuchsia-950/70 text-fuchsia-400 border-fuchsia-500/30' : 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200'
            }`}>
              <Award className="w-5 h-5" />
            </div>
            <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>Full Service Lifecycle</h4>
            <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              From web software and cloud deployment to creative flyers and hardware repairs, you have one trusted partner.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 6.5 GOOGLE OVERVIEW & FREQUENTLY ASKED QUESTIONS SECTION (SEO RICH) */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Frequently Asked Questions"
      >
        <div className="text-left max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Google Overview & Quick Answers
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black mt-1 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Everything You Need to Know About PETZEUSTECH.
          </h2>
          <p className={`text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Clear, honest answers about our commercial capabilities, founder background, and client process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
          {[
            {
              q: "What commercial technology services does PETZEUSTECH provide?",
              a: "PETZEUSTECH specializes in six core areas: Software Labs (custom websites, web portals, PHP/MySQL, WordPress), CloudCore (Linux VPS, Nginx, server administration, domain config), Graphics & Creative (logos, brand identity, marketing flyers), Electronics Diagnostics (smartphone and laptop repairs, screen fixes, OS installs), Ads & Digital Marketing (targeted Meta & Google ads), and the PETZEUSTECH IT Academy (practical hands-on tech training)."
            },
            {
              q: "Who is the lead technology architect and founder?",
              a: "PETZEUSTECH was founded by Petuel Baifem, a full-stack software engineer and systems administrator based in Cameroon. Petuel personally oversees architectural design, hardware diagnostics, and student mentorship."
            },
            {
              q: "Where is the physical office located and can international clients hire you?",
              a: "Our central workshop and engineering lab are located in Cameroon. We serve both local Cameroonian clients on-site and remote clients across Africa and globally for software engineering, cloud systems, and branding."
            },
            {
              q: "How does the booking process and WhatsApp confirmation work?",
              a: "When you book a service on our website, our system immediately generates a verified tracking reference code (e.g. PTZ-2026-XXXX). You can then open WhatsApp with one click to confirm your scope directly with founder Petuel Baifem without delays."
            },
            {
              q: "How do I enroll in courses at the PETZEUSTECH IT Academy?",
              a: "Visit the Academy page to view current cohorts in Web Development, Cloud Systems, Graphic Design, and Electronics Maintenance. You can submit your reservation online or message our advisor directly on WhatsApp."
            },
            {
              q: "What makes PETZEUSTECH solutions optimized for African networks?",
              a: "We avoid bloat and heavy frameworks when unnecessary. Our websites and cloud endpoints are optimized with lightweight bundles, responsive caching, and compression so they load in milliseconds even on budget 3G mobile connections."
            }
          ].map((faq, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                isDark 
                  ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-lg shadow-purple-950/20' 
                  : 'bg-white border-slate-200 shadow-md shadow-slate-200/50'
              }`}
            >
              <h3 className={`font-bold text-base font-display flex items-start gap-2.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span className="text-purple-500 font-mono text-sm mt-0.5 font-black">Q{idx + 1}.</span>
                <span>{faq.q}</span>
              </h3>
              <p className={`text-xs sm:text-sm mt-2.5 leading-relaxed pl-6 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 7. FINAL CONVERSION CALL TO ACTION with motion */}
      <motion.section 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl shadow-purple-950/50 border border-purple-500/40">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              Ready to build your digital solution?
            </h2>
            <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
              Whether you need a custom business website, server setup, flyers, phone repair, or IT training, PETZEUSTECH is ready to work with you.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onNavigate('book')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold bg-white text-purple-900 hover:bg-purple-50 shadow-md transition-all"
              >
                Book a Service Now
              </button>
              <a
                href={buildGeneralWhatsAppUrl('Final CTA')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Chat on WhatsApp (+237 677 251 088)</span>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};
