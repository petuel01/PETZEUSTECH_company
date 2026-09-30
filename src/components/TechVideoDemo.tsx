import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Terminal, 
  Cpu, 
  Server, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Code2,
  Layers,
  Zap,
  Activity,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { APP_IMAGES } from '../assets/images';

interface TechVideoDemoProps {
  onNavigate: (page: string, param?: string) => void;
  initialTab?: string;
}

interface DemoVideoItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  duration: string;
  techTags: string[];
  thumbnail: string;
  metrics: { label: string; value: string }[];
  actionTarget: string;
  actionText: string;
  videoType: 'code' | 'cloud' | 'hardware' | 'academy' | 'creative';
}

export const TechVideoDemo: React.FC<TechVideoDemoProps> = ({ onNavigate, initialTab = 'software' }) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(6.4);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [simulatedLogIndex, setSimulatedLogIndex] = useState<number>(0);

  const demoItems: DemoVideoItem[] = [
    {
      id: 'software',
      category: 'Software Labs',
      title: 'Full-Stack React & Node Engine Deployment',
      subtitle: 'Watch how our software engineers architect, compile, and deploy reactive, low-latency web apps built for African bandwidth.',
      duration: '0:30',
      techTags: ['TypeScript', 'React 19', 'Tailwind', 'Express REST API', 'Cloud Run'],
      thumbnail: APP_IMAGES.softwareLabs,
      metrics: [
        { label: 'Build Latency', value: '380ms' },
        { label: 'Bundle Size', value: '42 kB' },
        { label: 'Lighthouse Score', value: '99/100' }
      ],
      actionTarget: 'services',
      actionText: 'Explore Software Labs',
      videoType: 'code'
    },
    {
      id: 'cloud',
      category: 'CloudCore',
      title: 'Enterprise Server Orchestration & Failover',
      subtitle: 'Live packet routing demonstration across distributed data clusters, automated SSL certificates, and zero-downtime hot reloading.',
      duration: '0:28',
      techTags: ['Nginx Reverse Proxy', 'Docker', 'Linux VM', 'PostgreSQL', 'Cloudflare CDN'],
      thumbnail: APP_IMAGES.cloudServers,
      metrics: [
        { label: 'Uptime SLA', value: '99.98%' },
        { label: 'SSL Encryption', value: 'TLS 1.3' },
        { label: 'Edge TTFB', value: '18ms' }
      ],
      actionTarget: 'services',
      actionText: 'Explore CloudCore Solutions',
      videoType: 'cloud'
    },
    {
      id: 'hardware',
      category: 'Hardware & Circuitry',
      title: 'Precision Micro-Soldering & Board Diagnostics',
      subtitle: 'Oscilloscope trace analysis, power rail troubleshooting, and SMD component replacement inside the Cameroon tech repair laboratory.',
      duration: '0:35',
      techTags: ['Hot Air Rework', 'Multimeter Logic', 'SMD IC Soldering', 'Capacitor Diagnostics'],
      thumbnail: APP_IMAGES.electronicsRepair,
      metrics: [
        { label: 'Diagnostic Rate', value: '98.5%' },
        { label: 'Warranty Given', value: '90 Days' },
        { label: 'Turnaround', value: '< 24 Hours' }
      ],
      actionTarget: 'services',
      actionText: 'Book Hardware Repair',
      videoType: 'hardware'
    },
    {
      id: 'academy',
      category: 'IT Academy',
      title: 'Interactive Studio Classroom & Coding Labs',
      subtitle: 'Look inside Petuel Baifem’s practical mentorship program training African youths in practical coding, UI design, and PC maintenance.',
      duration: '0:45',
      techTags: ['Hands-On Labs', 'Live Mentorship', 'Job Readiness', 'Real Projects'],
      thumbnail: APP_IMAGES.itAcademy,
      metrics: [
        { label: 'Practical Ratio', value: '85% Hands-On' },
        { label: 'Cohort Size', value: '12 Max' },
        { label: 'Alumni Hired', value: '92%' }
      ],
      actionTarget: 'academy',
      actionText: 'Apply for Next Cohort',
      videoType: 'academy'
    }
  ];

  const currentDemo = demoItems.find((d) => d.id === activeTab) || demoItems[0];

  // Video progress loop simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 0.2 * playbackSpeed;
        return next > 30 ? 0 : next;
      });
      setSimulatedLogIndex((prev) => (prev + 1) % 12);
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const simulatedCodeLogs = [
    '⚡ Initializing PETZEUSTECH Core Engine v4.2.0...',
    '📦 Bundling micro-modules via Vite + esbuild in 142ms',
    '🔒 Enforcing strict HTTPS security headers & CSP policy',
    '🌐 Connecting to Cameroon Regional Edge gateway (14ms latency)',
    '🚀 Compiling client-side TypeScript AST without memory overhead',
    '📊 Real-time WebSocket telemetry channel authenticated',
    '✅ Healthcheck status: 200 OK — 0 errors, 0 dropped frames',
    '💾 Cloud state mirrored to persistent local cache',
    '📡 Dispatched 256 parallel worker tasks to node pool',
    '🎉 Component mount completed in 1.4ms — 60 FPS verified',
    '🛡️ Zero memory leaks detected across 1,000 stress cycles',
    '✨ PETZEUSTECH production pipeline running optimal'
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-left">
      {/* Header section with slide animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-purple-500/15 border border-purple-500/30 text-purple-400">
            <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>Interactive Technical Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white dark:text-white">
            See Our Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">In Action</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-1.5">
            Watch demonstrative video simulations of our software development workflow, cloud network deployments, hardware diagnostics, and IT Academy training.
          </p>
        </div>

        {/* Video resolution / live indicator badge */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-purple-500/30 text-xs font-mono text-cyan-300 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>60 FPS • 1080p HD DEMO</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs navigation with slide animation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-purple-900/30">
        {demoItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setCurrentTime(0);
                setIsPlaying(true);
              }}
              className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'text-white'
                  : isDark 
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-purple-950/20' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDemoTab"
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-purple-900/40"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {item.id === 'software' && <Code2 className="w-4 h-4" />}
                {item.id === 'cloud' && <Server className="w-4 h-4" />}
                {item.id === 'hardware' && <Cpu className="w-4 h-4" />}
                {item.id === 'academy' && <Terminal className="w-4 h-4" />}
                <span>{item.category}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Video Demo Card with Motion Slide Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDemo.id}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -25 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl p-5 sm:p-7 border backdrop-blur-xl relative overflow-hidden transition-all ${
            isDark 
              ? 'bg-[#090b24]/90 border-purple-500/30 shadow-2xl shadow-purple-950/60' 
              : 'bg-white border-slate-200 shadow-xl shadow-slate-200/80'
          }`}
        >
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Left Column: Demonstrative Video Screen Display */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* The Video Display Frame */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/90 border border-purple-500/40 shadow-xl shadow-purple-950/70 group">
              {/* Simulated Video Content: Layer 1 is thumbnail background with subtle motion */}
              <img
                src={currentDemo.thumbnail}
                alt={currentDemo.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105 opacity-30 mix-blend-screen' : 'scale-100 opacity-60'
                }`}
              />

              {/* Layer 2: Interactive High-Tech Simulated HUD Screen */}
              <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                {/* HUD Top Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-purple-300">
                  <div className="flex items-center gap-2 bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-purple-500/30">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="font-bold uppercase tracking-wider text-rose-300">REC</span>
                    <span className="text-slate-400">|</span>
                    <span>PETZEUS-{currentDemo.id.toUpperCase()}</span>
                  </div>
                  <div className="bg-black/70 px-2.5 py-1 rounded-lg backdrop-blur-md border border-purple-500/30 text-cyan-300">
                    SPEED: {playbackSpeed}x • 1080p
                  </div>
                </div>

                {/* HUD Center: Active Technology Simulation Visualizer */}
                <div className="my-auto text-left space-y-2 max-w-md bg-black/60 p-3.5 rounded-xl border border-purple-500/20 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-bold">LIVE TELEMETRY STREAM:</span>
                  </div>
                  <p className="text-xs font-mono text-emerald-300 tracking-tight transition-all duration-200 line-clamp-2">
                    {simulatedCodeLogs[simulatedLogIndex]}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">
                    {simulatedCodeLogs[(simulatedLogIndex + 1) % simulatedCodeLogs.length]}
                  </p>
                </div>

                {/* HUD Bottom: Tech Timeline Spectrum Visualizer */}
                <div className="flex items-end gap-1 h-6">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const height = isPlaying
                      ? 20 + Math.sin((currentTime * 5) + i) * 15 + Math.random() * 15
                      : 8;
                    return (
                      <div
                        key={i}
                        style={{ height: `${Math.max(4, Math.min(100, height))}%` }}
                        className="flex-1 bg-gradient-to-t from-purple-600 via-indigo-500 to-cyan-400 rounded-t-sm transition-all duration-150 opacity-75"
                      />
                    );
                  })}
                </div>
              </div>

              {/* Layer 3: Interactive Video Player Controls Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2">
                {/* Scrubber timeline bar */}
                <div 
                  className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = clickX / rect.width;
                    setCurrentTime(pct * 30);
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-cyan-400 rounded-full transition-all duration-150"
                    style={{ width: `${(currentTime / 30) * 100}%` }}
                  />
                </div>

                {/* Control Buttons row */}
                <div className="flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-7 h-7 rounded-lg bg-purple-600 hover:bg-purple-500 flex items-center justify-center transition-colors shadow-sm"
                      title={isPlaying ? 'Pause Demo' : 'Play Demo'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />}
                    </button>

                    <button
                      onClick={() => setCurrentTime(0)}
                      className="p-1.5 hover:text-purple-300 text-slate-300 transition-colors"
                      title="Restart Video"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 hover:text-purple-300 text-slate-300 transition-colors"
                      title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-purple-300" />}
                    </button>

                    <span className="font-mono text-[11px] text-slate-300">
                      0:{Math.floor(currentTime).toString().padStart(2, '0')} / {currentDemo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-purple-900/60 border border-purple-500/30 text-[10px] font-mono text-purple-300 transition-colors"
                    >
                      {playbackSpeed}x
                    </button>
                    <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-[10px] font-bold text-cyan-300 uppercase">
                      Demo Mode
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video status summary */}
            <div className={`pt-3 flex items-center justify-between text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Simulated live screen capture from PETZEUSTECH Cameroon Lab</span>
              </span>
              <span className={`font-mono text-[11px] ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                BUILD #PTZ-{Math.floor(currentTime * 142)}
              </span>
            </div>
          </div>

          {/* Right Column: Detailed Tech Specs & Action Button */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase border ${
                  isDark 
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}>
                  {currentDemo.category}
                </span>
                <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>• Walkthrough Demo</span>
              </div>

              <h3 className={`text-xl sm:text-2xl font-black font-display tracking-tight leading-snug ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {currentDemo.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {currentDemo.subtitle}
              </p>

              {/* Technologies Tag Cloud */}
              <div>
                <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-purple-300' : 'text-purple-700'
                }`}>
                  Active Stack & Tools Demonstrated:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentDemo.techTags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border shadow-sm ${
                        isDark 
                          ? 'bg-[#101235] text-purple-200 border-purple-900/60' 
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Real World Performance Benchmarks */}
              <div className="grid grid-cols-3 gap-2.5 pt-2">
                {currentDemo.metrics.map((m, i) => (
                  <div key={i} className={`p-2.5 rounded-xl border text-center ${
                    isDark ? 'bg-[#0c0e2b] border-purple-900/40' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <p className={`text-base sm:text-lg font-black font-display ${
                      isDark ? 'text-cyan-300' : 'text-purple-700'
                    }`}>{m.value}</p>
                    <p className={`text-[10px] font-medium uppercase mt-0.5 ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Link */}
            <div className={`pt-4 border-t flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <button
                onClick={() => onNavigate(currentDemo.actionTarget, currentDemo.category)}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 transition-all"
              >
                <span>{currentDemo.actionText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('book', currentDemo.category)}
                className={`py-3 px-4 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                  isDark 
                    ? 'bg-[#0e102d] hover:bg-[#151944] border-purple-500/40 text-purple-200' 
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                }`}
              >
                <span>Book Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
