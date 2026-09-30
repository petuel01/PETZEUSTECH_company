import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, Eye, Database } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';

interface PrivacyPolicyProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();

  return (
    <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      <button
        onClick={() => onNavigate('home')}
        className={`text-xs font-bold hover:underline flex items-center gap-1 ${
          isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-700 hover:text-purple-900'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
          Legal & Data Protection
        </span>
        <h1 className={`text-3xl sm:text-4xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Privacy Policy
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Effective Date: September 2026 • PETZEUSTECH (Cameroon)
        </p>
      </div>

      <div className={`rounded-3xl p-6 sm:p-10 border shadow-xl space-y-6 text-xs sm:text-sm leading-relaxed transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/90 border-purple-900/40 text-slate-300 shadow-purple-950/30' 
          : 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50'
      }`}>
        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>1. Information We Collect</h2>
          <p>
            When you book a service, request a quote, or contact us through WhatsApp or this website, we collect only the necessary information to serve you: your name, email address, phone/WhatsApp number, physical town/location, and project or repair details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>2. How We Use Your Data</h2>
          <p>
            Your information is used strictly to communicate with you regarding service requests, prepare technical quotes, deliver software or hardware repairs, and maintain accurate order records. We never sell, rent, or trade your contact information with external marketing companies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>3. WhatsApp Communication Protocol</h2>
          <p>
            For customer convenience in Cameroon and Africa, we generate direct WhatsApp messages. Our pre-filled WhatsApp links contain only your public request details (name, service, date, location). We strictly exclude passwords, tokens, or internal database identifiers from these messages.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>4. Hardware & Client Device Privacy</h2>
          <p>
            When repairing laptops or smartphones, technician staff access only what is required to perform hardware diagnostics and software fixes. We treat all client data stored on customer hardware with the highest confidentiality.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>5. Contact Our Privacy Officer</h2>
          <p>
            For questions or requests to remove your booking records, contact Petuel Baifem at <a href={`mailto:${COMPANY_INFO.email}`} className="text-purple-500 underline">{COMPANY_INFO.email}</a> or WhatsApp at <strong className={isDark ? 'text-white' : 'text-slate-900'}>{COMPANY_INFO.whatsapp}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
