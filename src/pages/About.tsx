import React from 'react';
import { 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Layers, 
  HeartHandshake,
  Code,
  Server,
  Palette,
  Smartphone,
  Megaphone,
  GraduationCap
} from 'lucide-react';
import { COMPANY_INFO, COMMERCIAL_SKILLS, LAB_AREAS } from '../data/companyData';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { APP_IMAGES } from '../assets/images';
import { useTheme } from '../context/ThemeContext';

interface AboutProps {
  onNavigate: (page: string, param?: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const skillDomains = [
    {
      title: 'Full-Stack Software Engineering',
      image: APP_IMAGES.softwareLabs,
      icon: <Code className="w-5 h-5 text-purple-400" />,
      tag: 'Production Core',
      skills: ['TypeScript / JavaScript', 'React 18 & Next.js', 'Node.js & Express', 'Tailwind CSS', 'REST & GraphQL APIs', 'PostgreSQL & MySQL']
    },
    {
      title: 'Cloud DevOps & Linux Systems',
      image: APP_IMAGES.cloudServers,
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      tag: 'Infrastructure',
      skills: ['Ubuntu / Debian / CentOS', 'Docker & Containerization', 'Nginx & SSL Configuration', 'CI/CD Automation', 'Bash Automation Scripts', 'Server Hardening']
    },
    {
      title: 'Hardware & Electronics Diagnostics',
      image: APP_IMAGES.electronicsRepair,
      icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
      tag: 'Lab Workbench',
      skills: ['Logic Board Diagnostics', 'Screen & Battery Assembly', 'Multimeter & Oscilloscope', 'Micro-soldering', 'Thermal Analysis', 'Firmware Flashing']
    },
    {
      title: 'Visual Identity & Digital Growth',
      image: APP_IMAGES.graphicsMedia,
      icon: <Palette className="w-5 h-5 text-fuchsia-400" />,
      tag: 'Creative Studio',
      skills: ['Corporate Brand Identity', 'Vector Illustration', 'Marketing Assets & Posters', 'Meta & Google Ads Setup', 'Technical SEO', 'Social Media Analytics']
    }
  ];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* 1. Header & Core Explanation */}
      <section className="max-w-3xl space-y-4">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
          isDark ? 'bg-purple-950/60 border-purple-500/40 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700'
        }`}>
          <MapPin className="w-3.5 h-3.5 text-purple-500" />
          <span>Cameroon • Serving Africa & Global Clients</span>
        </div>

        <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-500">PETZEUSTECH</span>
        </h1>

        {/* Exact Approved Simple English Description */}
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-3.5 text-base sm:text-lg leading-relaxed ${
          isDark 
            ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 text-slate-200' 
            : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 text-slate-700'
        }`}>
          <p className="font-semibold text-purple-500">
            PETZEUSTECH is a technology and innovation company.
          </p>
          <p>
            We build practical digital solutions for everyday challenges.
          </p>
          <p>
            We work across software, cloud hosting, creative design, electronics repair, digital marketing, and hands-on IT training.
          </p>
          <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Our mission is simple: <strong className={isDark ? 'text-white' : 'text-slate-900'}>we want to help people and businesses use technology better.</strong>
          </p>
        </div>
      </section>

      {/* 2. Professional Founder Section with Enlarged Portfolio Profile Picture */}
      <section className={`rounded-3xl p-8 sm:p-12 border relative overflow-hidden transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/95 border-purple-900/40 shadow-2xl shadow-purple-950/40' 
          : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/60'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-3xl -z-0 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* Enlarged Founder Portfolio Profile with Glowing Purple Ring & Rich Shadows */}
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/40 border-2 border-purple-500/80 group">
              <img
                src={APP_IMAGES.founderProfile}
                alt="Petuel Baifem, Founder and Lead Engineer of PETZEUSTECH"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md text-xs text-purple-200 text-center font-bold border border-purple-500/50 shadow-md">
                Lead Engineer & Founder
              </div>
            </div>

            <h2 className={`text-2xl sm:text-3xl font-bold font-display mt-5 ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {COMPANY_INFO.founder.name}
            </h2>
            <p className="text-sm font-semibold text-purple-500 mt-1">
              {COMPANY_INFO.founder.title}
            </p>
            <p className={`text-xs mt-1 flex items-center gap-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <MapPin className="w-3.5 h-3.5 text-purple-500" />
              <span>{COMPANY_INFO.founder.location}</span>
            </p>

            <div className={`mt-5 pt-5 border-t w-full flex flex-col gap-2.5 ${
              isDark ? 'border-purple-900/40' : 'border-slate-200'
            }`}>
              <a
                href={buildGeneralWhatsAppUrl('Founder Connect')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 text-xs font-bold text-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {COMPANY_INFO.whatsapp}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className={`w-full py-2.5 px-3 text-xs font-medium text-center rounded-xl transition-colors truncate border ${
                  isDark 
                    ? 'bg-[#111333] hover:bg-[#181b45] text-purple-200 border-purple-900/30' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <h3 className={`text-xl sm:text-2xl font-bold font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Leadership & Engineering Philosophy
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Petuel Baifem founded PETZEUSTECH to provide practical, reliable, and accessible technology services directly to the local community in Cameroon and across Africa. With a strong engineering foundation in full-stack web development, Linux systems administration, and DevOps automation, Petuel leads product design, client consultations, and technical execution.
            </p>
            <p className={`text-sm leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              In an industry often clouded by hype and exaggerated promises, our guiding principle is complete transparency: we commercially advertise only what we are genuinely qualified to deliver, test every system rigorously, and maintain close communication with our clients on WhatsApp.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#08091a] border-purple-900/40' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-bold text-purple-500 uppercase">African Network Reality</h4>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  We engineer websites and systems that load instantly even on 3G mobile connections and budget smartphones.
                </p>
              </div>
              <div className={`p-4 rounded-2xl border ${
                isDark ? 'bg-[#08091a] border-purple-900/40' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-bold text-purple-500 uppercase">Community Elevation</h4>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Through the PETZEUSTECH IT Academy, we train youth and professionals in practical skills they can immediately monetize.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Studio & Workshop Photography Showcase */}
        <div className={`mt-8 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-4 ${
          isDark ? 'border-purple-900/40' : 'border-slate-200'
        }`}>
          <div className="relative rounded-2xl overflow-hidden group shadow-lg border border-purple-500/30">
            <img
              src={APP_IMAGES.heroTech}
              alt="PETZEUSTECH Innovation Studio in Cameroon"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 text-white">
              <p className="text-xs font-bold font-display text-purple-300">Technology & Software Studio</p>
              <p className="text-[11px] text-slate-300">Cameroon • Production Workspace</p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group shadow-lg border border-purple-500/30">
            <img
              src={APP_IMAGES.electronicsRepair}
              alt="PETZEUSTECH Electronics & Hardware Diagnostic Workbench"
              referrerPolicy="no-referrer"
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3.5 left-3.5 text-white">
              <p className="text-xs font-bold font-display text-purple-300">Electronics Diagnostic & Repair Workbench</p>
              <p className="text-[11px] text-slate-300">Precision hardware tools & screen calibration</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Skills with Increased Image Sizes, Beautiful Flex Boxes and Shadows */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
            Technical Competence
          </span>
          <h2 className={`text-3xl font-black mt-1 font-display ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Current Commercial Skills & Technology Stack
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Technologies and tools we actively use in commercial client projects today.
          </p>
        </div>

        {/* Enhanced Visual Skill Domain Flex Boxes with Images & Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillDomains.map((domain, idx) => (
            <div
              key={idx}
              className={`rounded-3xl border p-5 sm:p-6 transition-all flex flex-col justify-between group ${
                isDark 
                  ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 hover:border-purple-500/60' 
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50 hover:border-purple-300'
              }`}
            >
              <div>
                {/* Domain Header Image with Significantly Increased Size & Purple Glow */}
                <div className="relative w-full h-60 sm:h-64 rounded-2xl overflow-hidden mb-5 border border-purple-500/40 shadow-xl shadow-purple-950/60 group/img">
                  <img
                    src={domain.image}
                    alt={domain.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute top-3.5 left-3.5 p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-purple-500/50 shadow-md">
                    {domain.icon}
                  </div>

                  <span className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600/90 text-white shadow-lg backdrop-blur-sm border border-purple-400/30">
                    {domain.tag}
                  </span>
                </div>

                <h3 className={`text-xl font-bold font-display mb-3 group-hover:text-purple-500 transition-colors ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {domain.title}
                </h3>

                {/* Skills Flex Box Badges with Enhanced Spacing & Shadows */}
                <div className="flex flex-wrap gap-2.5">
                  {domain.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
                        isDark 
                          ? 'bg-[#111333]/90 border-purple-900/50 text-purple-200 hover:border-purple-400 hover:text-white' 
                          : 'bg-purple-50 border-purple-200 text-purple-700 hover:border-purple-300 hover:bg-purple-100'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Quick Reference Skills Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {COMMERCIAL_SKILLS.map((skill, index) => (
            <div
              key={index}
              className={`p-3.5 rounded-xl border shadow-sm flex items-center gap-2.5 text-xs font-semibold transition-colors ${
                isDark 
                  ? 'bg-[#0c0e2a]/80 border-purple-900/30 text-slate-200 hover:border-purple-500/40' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-purple-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>

        {/* Learning / Technology Lab Box */}
        <div className={`rounded-3xl border p-6 sm:p-8 space-y-4 shadow-xl transition-all ${
          isDark ? 'bg-[#090a1e] border-purple-900/50' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h3 className={`font-bold text-sm uppercase tracking-wide ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Learning / Technology Lab (Active R&D)
            </h3>
          </div>
          <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            In accordance with our strict honesty policy, the following areas remain in our research and development lab. We do not commercially advertise them as public turn-key services until our internal quality benchmarks are fully verified:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {LAB_AREAS.map((item, index) => (
              <span
                key={index}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border shadow-sm ${
                  isDark 
                    ? 'bg-[#131538] text-purple-200 border-purple-500/40' 
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}
              >
                🔬 {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Company Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-3xl border space-y-2 transition-all ${
          isDark 
            ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl' 
            : 'bg-white border-slate-200 shadow-md'
        }`}>
          <h3 className={`font-bold text-lg font-display flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <ShieldCheck className="w-5 h-5 text-purple-500" />
            <span>Honesty & Integrity</span>
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            We give straightforward advice. If an off-the-shelf tool solves your problem better than custom software, we tell you openly.
          </p>
        </div>

        <div className={`p-6 rounded-3xl border space-y-2 transition-all ${
          isDark 
            ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl' 
            : 'bg-white border-slate-200 shadow-md'
        }`}>
          <h3 className={`font-bold text-lg font-display flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <Cpu className="w-5 h-5 text-indigo-500" />
            <span>Practical Engineering</span>
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            We avoid fragile technical trends. We build systems using stable, well-supported technologies like Linux, Nginx, PHP/MySQL, and modern TypeScript.
          </p>
        </div>

        <div className={`p-6 rounded-3xl border space-y-2 transition-all ${
          isDark 
            ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl' 
            : 'bg-white border-slate-200 shadow-md'
        }`}>
          <h3 className={`font-bold text-lg font-display flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <HeartHandshake className="w-5 h-5 text-emerald-500" />
            <span>Human-First Service</span>
          </h3>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Technology should empower people, not intimidate them. We explain technical concepts simply and remain accessible on WhatsApp.
          </p>
        </div>
      </section>

      {/* 5. Contact CTA */}
      <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-500/40 shadow-2xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold font-display">Have questions about our background?</h3>
          <p className="text-xs text-purple-200">
            We welcome inquiries from clients, partners, and future students.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-purple-950 text-xs font-bold transition-colors whitespace-nowrap shadow-md"
        >
          Contact PETZEUSTECH
        </button>
      </section>

    </div>
  );
};
