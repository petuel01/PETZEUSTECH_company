import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Smartphone, 
  Globe, 
  Server, 
  Cpu, 
  Palette, 
  GraduationCap, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Sparkles,
  Layers,
  Code2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';

interface TechMotionShowcaseProps {
  onNavigateToBook: (departmentSlug: string) => void;
  onNavigateToServices: (departmentSlug: string) => void;
}

type ShowcaseTab = 'software' | 'cloud' | 'electronics' | 'graphics' | 'academy';

export const TechMotionShowcase: React.FC<TechMotionShowcaseProps> = ({
  onNavigateToBook,
  onNavigateToServices
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('software');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animationTick, setAnimationTick] = useState<number>(0);
  const [activeMobileScreen, setActiveMobileScreen] = useState<'home' | 'cart' | 'profile'>('home');

  // Looping animation ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimationTick((prev) => (prev + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Tab definitions
  const tabs = [
    {
      id: 'software' as ShowcaseTab,
      label: 'Software, Web & Mobile Apps',
      shortLabel: 'Software & Apps',
      icon: <Smartphone className="w-4 h-4" />,
      color: 'from-purple-500 to-indigo-600',
      badge: 'Mobile + Web + Custom Systems',
      deptSlug: 'software-labs'
    },
    {
      id: 'cloud' as ShowcaseTab,
      label: 'CloudCore & Linux Servers',
      shortLabel: 'Cloud & VPS',
      icon: <Server className="w-4 h-4" />,
      color: 'from-indigo-500 to-cyan-500',
      badge: 'Linux • Nginx • Docker • Cloudflare',
      deptSlug: 'cloudcore'
    },
    {
      id: 'electronics' as ShowcaseTab,
      label: 'Electronics Hardware Diagnostics',
      shortLabel: 'Hardware Repair',
      icon: <Cpu className="w-4 h-4" />,
      color: 'from-cyan-500 to-emerald-500',
      badge: 'Laptops • Phones • Precision Repair',
      deptSlug: 'electronics'
    },
    {
      id: 'graphics' as ShowcaseTab,
      label: 'Graphics & Visual Brand Identity',
      shortLabel: 'Brand & Design',
      icon: <Palette className="w-4 h-4" />,
      color: 'from-fuchsia-500 to-pink-500',
      badge: 'Logos • UI/UX • Digital Branding',
      deptSlug: 'graphics'
    },
    {
      id: 'academy' as ShowcaseTab,
      label: 'IT Academy Tech Cohorts',
      shortLabel: 'IT Academy',
      icon: <GraduationCap className="w-4 h-4" />,
      color: 'from-amber-500 to-emerald-500',
      badge: 'Hands-on Mentorship • Certification',
      deptSlug: 'it-academy'
    }
  ];

  const currentTabInfo = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden" id="tech-in-motion">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/10 via-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2.5 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Technology In Motion</span>
            </div>
            <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              See What We Build & Deliver{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500">
                In Real-Time Motion
              </span>
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Explore interactive visual simulations of our commercial work across smartphone application engineering, responsive web portals, cloud server clusters, and electronics diagnostics.
            </p>
          </div>

          {/* Video Player Style Controls */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all shadow-sm ${
                isDark 
                  ? 'bg-purple-950/40 border-purple-500/30 text-purple-300 hover:bg-purple-900/50' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title={isPlaying ? 'Pause Motion' : 'Play Motion'}
            >
              {isPlaying ? <Pause className="w-4 h-4 text-purple-400" /> : <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />}
              <span>{isPlaying ? 'Pause Motion' : 'Resume Motion'}</span>
            </button>
            <button
              onClick={() => setAnimationTick(0)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-purple-950/40 border-purple-500/30 text-slate-300 hover:text-white hover:bg-purple-900/50' 
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Reset Animation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Department Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setAnimationTick(0);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg shadow-purple-900/40 scale-[1.02]'
                    : isDark
                      ? 'bg-[#0f112e] text-slate-300 hover:text-white border-purple-900/40 hover:bg-[#161942]'
                      : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:bg-slate-100 shadow-sm'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Video Motion Frame / Canvas Display */}
        <div className={`rounded-3xl border shadow-2xl overflow-hidden transition-all relative ${
          isDark 
            ? 'bg-[#07091c] border-purple-500/30 shadow-purple-950/60' 
            : 'bg-white border-slate-200 shadow-slate-200/90'
        }`}>
          {/* Top Video Player Bar */}
          <div className={`px-5 py-3.5 border-b flex items-center justify-between gap-4 text-xs ${
            isDark ? 'bg-[#0b0e2b] border-purple-900/40 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block animate-pulse" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="font-mono text-[11px] text-purple-400 font-semibold hidden sm:inline">
                petzeustech://motion/{activeTab}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                LIVE 60FPS SIMULATION
              </span>
              <span className={`text-[11px] font-semibold hidden md:inline ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {currentTabInfo.badge}
              </span>
            </div>
          </div>

          {/* Interactive Simulation Content by Active Tab */}
          <div className="p-4 sm:p-8 min-h-[460px] flex items-center justify-center">
            
            {/* 1. SOFTWARE & MOBILE APP DEVELOPMENT IN MOTION */}
            {activeTab === 'software' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Live Code Terminal & Web App Viewport */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className={`rounded-2xl border p-4 font-mono text-xs shadow-inner space-y-3 ${
                    isDark ? 'bg-[#050614] border-purple-900/50 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>PetzeusApp.tsx • Mobile & Web Architecture</span>
                      </div>
                      <span className="text-emerald-400 font-bold">✓ Compiled</span>
                    </div>

                    <pre className="text-[11px] leading-relaxed overflow-x-auto text-purple-300">
{`// PETZEUSTECH Multi-Platform Software Stack
import { MobileApp, WebPortal, CloudAPI } from '@petzeus/core';

export const CommercialApp = () => {
  const [platform] = usePlatform(['Android', 'iOS', 'Web']);
  const database = useRemoteSync({ offlineFirst: true, speed: '<20ms' });
  
  return (
    <Application engine="React Native + Next.js" theme="dark">
      <PaymentGateway methods={['MTN MoMo', 'Orange Money', 'Stripe']} />
      <RealTimePushNotifications active={true} />
    </Application>
  );
};`}
                    </pre>

                    <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10">
                      <span>Bundle Size: 2.1 MB (Ultra-Optimized)</span>
                      <span className="text-cyan-400">Target: Android APK + iOS + Responsive Web</span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className={`p-3 rounded-xl border text-xs ${
                      isDark ? 'bg-purple-950/30 border-purple-900/40 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <strong className="block text-purple-400 font-bold text-xs">📱 Mobile Apps</strong>
                      <span className="text-[11px] text-slate-400">Android APK & iOS native experiences</span>
                    </div>
                    <div className={`p-3 rounded-xl border text-xs ${
                      isDark ? 'bg-purple-950/30 border-purple-900/40 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <strong className="block text-indigo-400 font-bold text-xs">🌐 Websites & Portals</strong>
                      <span className="text-[11px] text-slate-400">Fast SEO websites & client dashboards</span>
                    </div>
                    <div className={`p-3 rounded-xl border text-xs col-span-2 sm:col-span-1 ${
                      isDark ? 'bg-purple-950/30 border-purple-900/40 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <strong className="block text-cyan-400 font-bold text-xs">⚙️ Custom Software</strong>
                      <span className="text-[11px] text-slate-400">POS, Inventory & Business Databases</span>
                    </div>
                  </div>
                </div>

                {/* Right: Live Interactive Smartphone Mobile App Simulator */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-[280px] h-[520px] rounded-[42px] border-[8px] border-slate-800 bg-[#090b1c] shadow-2xl relative overflow-hidden flex flex-col p-4 text-left">
                    {/* Phone Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900 mr-2" />
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/60" />
                    </div>

                    {/* Smartphone Screen Content */}
                    <div className="pt-4 flex-1 flex flex-col justify-between text-white text-xs space-y-3">
                      {/* App Header */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <span className="text-[10px] text-purple-400 font-bold uppercase">PETZEUSTECH App</span>
                          <h4 className="font-extrabold text-sm text-white">Client Hub Mobile</h4>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      {/* Animated App Banner Card */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 shadow-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase bg-white/20 px-2 py-0.5 rounded-md">
                            Android & iOS
                          </span>
                          <span className="text-[10px] font-mono text-purple-200">v2.4 Live</span>
                        </div>
                        <p className="text-xs font-bold leading-snug">
                          High Performance Mobile Solutions Designed For Fast Local Networks.
                        </p>
                        <div className="w-full bg-black/30 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(animationTick * 2) % 100}%` }}
                          />
                        </div>
                      </div>

                      {/* App Menu Mock items */}
                      <div className="space-y-2 flex-1">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                              01
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-200">E-Commerce App</p>
                              <p className="text-[10px] text-slate-400">Offline cart + MoMo</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                              02
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-200">School Portal App</p>
                              <p className="text-[10px] text-slate-400">Student grades & fees</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-cyan-400 font-bold">Ready</span>
                        </div>
                      </div>

                      {/* Interactive Bottom Bar */}
                      <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-around text-[10px]">
                        <button 
                          onClick={() => setActiveMobileScreen('home')}
                          className={`font-bold py-1 px-3 rounded-lg transition-colors ${
                            activeMobileScreen === 'home' ? 'bg-purple-600 text-white' : 'text-slate-300'
                          }`}
                        >
                          Home
                        </button>
                        <button 
                          onClick={() => setActiveMobileScreen('cart')}
                          className={`font-bold py-1 px-3 rounded-lg transition-colors ${
                            activeMobileScreen === 'cart' ? 'bg-purple-600 text-white' : 'text-slate-300'
                          }`}
                        >
                          Features
                        </button>
                        <button 
                          onClick={() => setActiveMobileScreen('profile')}
                          className={`font-bold py-1 px-3 rounded-lg transition-colors ${
                            activeMobileScreen === 'profile' ? 'bg-purple-600 text-white' : 'text-slate-300'
                          }`}
                        >
                          Live
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. CLOUDCORE & SERVER OPERATIONS IN MOTION */}
            {activeTab === 'cloud' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      CloudCore Server Engine
                    </span>
                    <h3 className={`text-2xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      VPS Infrastructure, Linux Hardening & Reverse Proxy
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      We configure Linux systems (Ubuntu, Debian), Nginx reverse proxy routing, Docker container virtualization, and Cloudflare SSL so your applications never crash under load.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Uptime Guarantee</span>
                      <strong className="text-lg font-black text-emerald-400">99.98%</strong>
                    </div>
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Response Latency</span>
                      <strong className="text-lg font-black text-cyan-400">18 ms</strong>
                    </div>
                  </div>
                </div>

                {/* Animated Server Cluster Simulation */}
                <div className="lg:col-span-6">
                  <div className={`p-5 rounded-2xl border font-mono text-xs shadow-2xl space-y-3 ${
                    isDark ? 'bg-[#040614] border-indigo-500/30 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-slate-400">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        <span>root@petzeustech-vps:~# htop --live</span>
                      </div>
                      <span className="text-emerald-400 font-bold">STATUS: HEALTHY</span>
                    </div>

                    {/* Server Nodes */}
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="font-bold text-xs text-indigo-300">nginx/1.27.5 (Reverse Proxy)</span>
                        </div>
                        <span className="text-emerald-400 text-[11px]">HTTP/2 200 OK • SSL Active</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          <span className="font-bold text-xs text-cyan-300">docker compose: petzeustech-web</span>
                        </div>
                        <span className="text-slate-300 text-[11px]">Port 80/443 Mapped</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-400" />
                          <span className="font-bold text-xs text-purple-300">Cloudflare Edge Anycast</span>
                        </div>
                        <span className="text-purple-300 text-[11px]">DDoS Protection Enabled</span>
                      </div>
                    </div>

                    {/* Animated Memory Gauge */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>RAM Utilization (1.4 GB / 8.0 GB)</span>
                        <span className="text-emerald-400">17.5%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${17 + ((animationTick % 10) * 0.4)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ELECTRONICS HARDWARE IN MOTION */}
            {activeTab === 'electronics' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Hardware Diagnostics & Component Repair
                  </span>
                  <h3 className={`text-2xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Smartphone, Laptop & Motherboard Engineering
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    From micro-soldering and screen replacements to power IC diagnostics, motherboard revival, and OS reinstalls, we fix technology with precision laboratory instruments.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-cyan-950/30 border-cyan-500/30' : 'bg-slate-50 border-slate-200'}`}>
                      <strong className="block text-cyan-400 font-bold">Smartphones</strong>
                      <span className="text-[11px] text-slate-400">iPhone, Samsung, Tecno, Infinix screen & charging repair</span>
                    </div>
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-cyan-950/30 border-cyan-500/30' : 'bg-slate-50 border-slate-200'}`}>
                      <strong className="block text-emerald-400 font-bold">Laptops & PCs</strong>
                      <span className="text-[11px] text-slate-400">HP, Dell, MacBook board diagnostics & SSD speed upgrades</span>
                    </div>
                  </div>
                </div>

                {/* Oscilloscope / Circuit Diagnostic Animation */}
                <div className="lg:col-span-6">
                  <div className={`p-5 rounded-2xl border font-mono text-xs shadow-2xl space-y-4 ${
                    isDark ? 'bg-[#030814] border-cyan-500/40 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
                      <span>DIGITAL OSCILLOSCOPE & VOLTAGE ANALYZER</span>
                      <span className="text-cyan-400 font-bold">3.3V POWER RAIL: STABLE</span>
                    </div>

                    {/* Animated Oscilloscope Waveform */}
                    <div className="h-28 w-full bg-cyan-950/40 rounded-xl border border-cyan-500/30 relative overflow-hidden flex items-center justify-center p-2">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ffff15_1px,transparent_1px),linear-gradient(to_bottom,#00ffff15_1px,transparent_1px)] bg-[size:16px_16px]" />
                      <div className="relative z-10 w-full flex items-center justify-between text-cyan-400 h-16">
                        {Array.from({ length: 24 }).map((_, i) => {
                          const height = 20 + Math.sin((animationTick + i * 2) * 0.4) * 18;
                          return (
                            <div
                              key={i}
                              className="w-1 bg-cyan-400 rounded-full transition-all duration-75"
                              style={{ height: `${height}px` }}
                            />
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-400 block">V-Core</span>
                        <strong className="text-emerald-400 font-bold">1.25 V</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-400 block">Frequency</span>
                        <strong className="text-cyan-400 font-bold">2.4 GHz</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-slate-400 block">Health</span>
                        <strong className="text-purple-400 font-bold">100% PASS</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. GRAPHICS & CREATIVE BRANDING IN MOTION */}
            {activeTab === 'graphics' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">
                    Visual Brand & UI/UX Design
                  </span>
                  <h3 className={`text-2xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    High-Impact Brand Identity, Motion & Graphic Systems
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    We craft unmistakable visual identities—from corporate logos and social media marketing collateral to complete UI/UX design systems for web and mobile software.
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 font-semibold">
                      Vector Logo Crests
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                      Mobile UI/UX Mockups
                    </span>
                    <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
                      Marketing Flyers & Banners
                    </span>
                  </div>
                </div>

                {/* Animated Design Studio Canvas */}
                <div className="lg:col-span-6">
                  <div className={`p-5 rounded-2xl border text-xs shadow-2xl space-y-4 ${
                    isDark ? 'bg-[#0d071c] border-fuchsia-500/30 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10 font-mono">
                      <span>PETZEUSTECH DESIGN LAB • VECTOR RENDER</span>
                      <span className="text-fuchsia-400 font-bold">100% VECTOR PATHS</span>
                    </div>

                    {/* Dynamic Color Palette & Logo Shape in Motion */}
                    <div className="p-6 rounded-xl bg-gradient-to-tr from-fuchsia-950/60 to-purple-950/60 border border-fuchsia-500/20 flex flex-col items-center justify-center space-y-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-indigo-600 shadow-xl flex items-center justify-center text-white font-black text-3xl font-display transform rotate-3 hover:rotate-0 transition-transform">
                        PT
                      </div>
                      <div className="text-center">
                        <strong className="text-sm font-bold block text-white">PETZEUSTECH BRAND CREST</strong>
                        <span className="text-[11px] text-fuchsia-300">Color Palette: #7C3AED • #4F46E5 • #06B6D4</span>
                      </div>

                      {/* Animated Color Swatches */}
                      <div className="flex gap-2">
                        {['#7C3AED', '#4F46E5', '#06B6D4', '#10B981', '#EC4899'].map((hex, idx) => (
                          <div
                            key={hex}
                            className="w-8 h-8 rounded-lg shadow-md border border-white/20 transition-transform"
                            style={{ 
                              backgroundColor: hex,
                              transform: `scale(${1 + Math.sin((animationTick + idx) * 0.5) * 0.1})` 
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. IT ACADEMY IN MOTION */}
            {activeTab === 'academy' && (
              <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Hands-On Technical Mentorship
                  </span>
                  <h3 className={`text-2xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Learn Real Coding, Server Setup & Hardware Diagnostic Skills
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    The PETZEUSTECH IT Academy delivers practical, job-ready technology training. Build real apps, deploy live websites to VPS servers, and graduate with verified industry skills.
                  </p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-slate-50 border-slate-200'}`}>
                      <strong className="block text-amber-400 font-bold">Practical Cohorts</strong>
                      <span className="text-[11px] text-slate-400">Web Dev, Linux VPS, Mobile Apps & Repairs</span>
                    </div>
                    <div className={`p-3 rounded-2xl border ${isDark ? 'bg-amber-950/30 border-amber-500/30' : 'bg-slate-50 border-slate-200'}`}>
                      <strong className="block text-emerald-400 font-bold">Mentorship</strong>
                      <span className="text-[11px] text-slate-400">Direct instruction by Founder Petuel Baifem</span>
                    </div>
                  </div>
                </div>

                {/* Animated Student Terminal & Test Runner */}
                <div className="lg:col-span-6">
                  <div className={`p-5 rounded-2xl border font-mono text-xs shadow-2xl space-y-3 ${
                    isDark ? 'bg-[#0a0802] border-amber-500/30 text-slate-200' : 'bg-slate-900 border-slate-800 text-slate-100'
                  }`}>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
                      <span>STUDENT_LAB_TERMINAL • TEST RUNNER</span>
                      <span className="text-emerald-400 font-bold">100% TESTS PASSING</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                        <span>✓ Test 1: Build Responsive Web App</span>
                        <span className="text-[10px] text-emerald-400 font-bold">PASSED (14ms)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                        <span>✓ Test 2: Provision VPS & Deploy Docker</span>
                        <span className="text-[10px] text-emerald-400 font-bold">PASSED (28ms)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                        <span>✓ Test 3: Smartphone Hardware Screen Fix</span>
                        <span className="text-[10px] text-emerald-400 font-bold">PASSED (19ms)</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-amber-300">Cohort Graduation Status</p>
                        <p className="text-[10px] text-slate-400">Certification Ready</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        VERIFIED GRADUATE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Action Strip */}
          <div className={`px-5 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isDark ? 'bg-[#0a0c24] border-purple-900/40' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-left text-xs space-y-0.5">
              <span className={`font-bold block ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ready to build this for your business or enroll?
              </span>
              <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                Direct booking with verified tracking code or WhatsApp consultation.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigateToServices(currentTabInfo.deptSlug)}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                  isDark 
                    ? 'border-purple-500/30 hover:bg-purple-900/40 text-purple-200' 
                    : 'border-slate-300 hover:bg-slate-200 text-slate-700'
                }`}
              >
                View Full Details
              </button>
              <button
                onClick={() => onNavigateToBook(currentTabInfo.deptSlug)}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-900/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
