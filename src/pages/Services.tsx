import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Server, 
  Palette, 
  Smartphone, 
  Megaphone, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Phone,
  Calendar,
  Search,
  Filter,
  Info,
  Globe
} from 'lucide-react';
import { DEPARTMENTS } from '../data/companyData';
import { Department, Service } from '../types';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { Modal } from '../components/Modal';
import { APP_IMAGES } from '../assets/images';
import { api } from '../lib/api';
import { useTheme } from '../context/ThemeContext';

interface ServicesProps {
  onNavigate: (page: string, param?: string) => void;
  initialDepartment?: string;
}

export const Services: React.FC<ServicesProps> = ({ onNavigate, initialDepartment }) => {
  const { isDark } = useTheme();
  const [deptList, setDeptList] = useState<Department[]>(DEPARTMENTS);
  const [selectedDeptSlug, setSelectedDeptSlug] = useState<string>(initialDepartment || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeServiceModal, setActiveServiceModal] = useState<Service | null>(null);

  useEffect(() => {
    api.getDepartments().then((data) => {
      if (data && data.length > 0) setDeptList(data);
    }).catch((e) => console.warn('Using offline static departments', e));
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

  const filteredDepartments = deptList.filter((dept) => {
    if (selectedDeptSlug !== 'all' && dept.slug !== selectedDeptSlug) {
      return false;
    }
    return true;
  });

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
          Our Capabilities
        </span>
        <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Commercial Services & Solutions
        </h1>
        <p className={`text-base leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          We advertise only the services our founder and technicians can realistically book, engineer, and deliver with top quality.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className={`flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between p-4 sm:p-5 rounded-3xl border transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30' 
          : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
      }`}>
        {/* Department Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedDeptSlug('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDeptSlug === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : isDark 
                  ? 'bg-[#111333] text-purple-200 hover:bg-[#181b48] border border-purple-900/40' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Departments
          </button>
          {deptList.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptSlug(dept.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedDeptSlug === dept.slug
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : isDark 
                    ? 'bg-[#111333] text-purple-200 hover:bg-[#181b48] border border-purple-900/40' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {dept.name.replace('PETZEUSTECH ', '')}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
              isDark 
                ? 'bg-[#08091a] border border-purple-900/50 text-white placeholder:text-slate-500' 
                : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Departments Catalog */}
      <div className="space-y-16">
        {filteredDepartments.map((dept) => {
          const matchingServices = dept.services.filter((s) => {
            if (!searchQuery) return true;
            return (
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
          });

          if (matchingServices.length === 0) return null;

          return (
            <div key={dept.id} className="space-y-6 pt-4">
              {/* Department Banner Card - Increased Image Size & Beautiful Flex Box */}
              <div className={`rounded-3xl p-6 sm:p-8 border flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden relative transition-all ${
                isDark 
                  ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30' 
                  : 'bg-white border-slate-200 shadow-xl shadow-slate-200/60'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 z-10">
                  {departmentImages[dept.slug] && (
                    <div className="relative w-full sm:w-56 md:w-64 h-48 sm:h-44 rounded-2xl overflow-hidden border-2 border-purple-500/50 shadow-2xl shadow-purple-950/70 flex-shrink-0 group">
                      <img
                        src={departmentImages[dept.slug]}
                        alt={dept.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                    </div>
                  )}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md border ${
                        isDark ? 'bg-purple-950/70 border-purple-500/40' : 'bg-purple-50 border-purple-200'
                      }`}>
                        {departmentIcons[dept.slug] || <Code className="w-6 h-6 text-purple-500" />}
                      </div>
                      <div>
                        <h2 className={`text-xl sm:text-2xl font-bold font-display ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {dept.name}
                        </h2>
                        <p className={`text-xs ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>{dept.shortDescription}</p>
                      </div>
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold border ${
                      isDark 
                        ? 'bg-purple-950/60 border-purple-500/30 text-purple-200' 
                        : 'bg-purple-50 border-purple-200 text-purple-700'
                    }`}>
                      "{dept.simpleWording}"
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 z-10">
                  <button
                    onClick={() => onNavigate('book', dept.name)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Department</span>
                  </button>

                  <a
                    href={buildGeneralWhatsAppUrl(dept.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all flex items-center gap-2 shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Architecture Scope for Software & App Labs */}
              {dept.slug === 'software-labs' && (
                <div className={`p-4 rounded-2xl border text-xs grid grid-cols-1 md:grid-cols-3 gap-3 ${
                  isDark ? 'bg-purple-950/40 border-purple-500/40 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                }`}>
                  <div className="flex items-start gap-2.5">
                    <Smartphone className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block font-bold">Mobile Applications</strong>
                      <span className="text-[11px] opacity-80">Android APKs, iOS apps & PWAs with offline storage</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block font-bold">Websites & Web Apps</strong>
                      <span className="text-[11px] opacity-80">Fast business websites, portals & SaaS dashboards</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Code className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="block font-bold">Custom Software Systems</strong>
                      <span className="text-[11px] opacity-80">Inventory, POS, database architecture & business APIs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Notice for Electronics Department */}
              {dept.slug === 'electronics' && (
                <div className={`p-4 rounded-2xl border text-xs flex items-center gap-3 ${
                  isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}>
                  <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>Service Scope Notice:</strong> We handle diagnostics, screen replacements, OS installs, and common maintenance. We do not promise motherboard soldering unless specifically evaluated in person.
                  </span>
                </div>
              )}

              {/* Services Grid with Flex Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {matchingServices.map((srv) => (
                  <div
                    key={srv.id}
                    className={`rounded-3xl p-6 border transition-all flex flex-col justify-between group ${
                      isDark 
                        ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-xl shadow-purple-950/30 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-950/50' 
                        : 'bg-white border-slate-200 shadow-md shadow-slate-200/50 hover:border-purple-300 hover:shadow-lg'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className={`font-bold text-base group-hover:text-purple-500 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {srv.name}
                        </h3>
                        {srv.popular && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border flex-shrink-0 ${
                            isDark ? 'bg-purple-600/30 text-purple-300 border-purple-500/40' : 'bg-purple-100 text-purple-700 border-purple-200'
                          }`}>
                            Popular
                          </span>
                        )}
                      </div>

                      <p className={`text-xs leading-relaxed mb-4 ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {srv.description}
                      </p>
                    </div>

                    <div className={`pt-4 border-t space-y-3 ${isDark ? 'border-purple-900/40' : 'border-slate-200'}`}>
                      {srv.priceHint && (
                        <p className={`text-[11px] font-semibold ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                          Estimated Cost: <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{srv.priceHint}</span>
                        </p>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveServiceModal(srv)}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-colors text-center border ${
                            isDark 
                              ? 'bg-[#111333] hover:bg-[#191b4a] text-purple-200 border-purple-900/40' 
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => onNavigate('book', `${dept.name} - ${srv.name}`)}
                          className="flex-1 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all text-center shadow-md shadow-purple-600/30"
                        >
                          Book Service
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Service Detail Modal */}
      <Modal
        isOpen={!!activeServiceModal}
        onClose={() => setActiveServiceModal(null)}
        title={activeServiceModal?.name || 'Service Details'}
      >
        {activeServiceModal && (
          <div className={`space-y-4 text-left ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            <div className={`p-3 rounded-xl border ${
              isDark ? 'bg-purple-950/60 border-purple-500/40 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-800'
            }`}>
              <p className="text-xs font-bold">
                Department: {activeServiceModal.departmentName}
              </p>
            </div>

            <div>
              <h4 className={`text-xs font-bold uppercase mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Overview</h4>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeServiceModal.description}
              </p>
            </div>

            {activeServiceModal.priceHint && (
              <div>
                <h4 className={`text-xs font-bold uppercase mb-1 ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>Pricing Guide</h4>
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {activeServiceModal.priceHint}
                </p>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Exact quote confirmed after initial review or diagnostic check.
                </p>
              </div>
            )}

            <div className={`p-4 rounded-xl border space-y-2 text-xs ${
              isDark ? 'bg-[#0b0c24] border-purple-900/40 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>What to expect:</p>
              <ul className={`list-disc list-inside space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li>Official booking reference code generated instantly.</li>
                <li>Direct follow-up on WhatsApp with the founder.</li>
                <li>Clear delivery timeline before any commitment.</li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  const s = activeServiceModal;
                  setActiveServiceModal(null);
                  onNavigate('book', `${s.departmentName} - ${s.name}`);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-xs font-bold transition-all text-center shadow-lg shadow-purple-600/30"
              >
                Proceed to Book This Service
              </button>
              <a
                href={buildGeneralWhatsAppUrl(`${activeServiceModal.departmentName} - ${activeServiceModal.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Ask on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
