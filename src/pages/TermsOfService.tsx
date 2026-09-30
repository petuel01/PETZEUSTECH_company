import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';

interface TermsOfServiceProps {
  onNavigate: (page: string) => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onNavigate }) => {
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
          Customer Terms & Service Agreement
        </span>
        <h1 className={`text-3xl sm:text-4xl font-black font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Terms of Service
        </h1>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Last Updated: September 2026 • PETZEUSTECH (Cameroon)
        </p>
      </div>

      <div className={`rounded-3xl p-6 sm:p-10 border shadow-xl space-y-6 text-xs sm:text-sm leading-relaxed transition-all ${
        isDark 
          ? 'bg-[#0b0c24]/90 border-purple-900/40 text-slate-300 shadow-purple-950/30' 
          : 'bg-white border-slate-200 text-slate-700 shadow-slate-200/50'
      }`}>
        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>1. Service Scope & Scoping Transparency</h2>
          <p>
            PETZEUSTECH agrees to perform commercial services based on mutually agreed written quotations and task orders. We adhere to an honest scoping policy: we do not accept payment for services outside our verified technical capability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>2. Software Development Deliverables</h2>
          <p>
            Custom web applications and software deliverables are built to the specifications confirmed during the consultation phase. Client ownership of source code, deployment credentials, and databases is fully transferred upon receipt of final project settlement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>3. Electronics & Hardware Repair Diagnostics</h2>
          <p>
            Hardware brought in for repair undergoes an initial diagnostic assessment. If internal hardware damage renders repair uneconomical or unfeasible, the client is informed immediately prior to incurrence of component replacement fees.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>4. CloudCore Hosting SLA</h2>
          <p>
            CloudCore hosting and Linux server management strive for high uptime and security best practices, including automatic firewall rules, SSL certificate renewals, and Nginx proxy optimization. Regular automated backups are scheduled for all managed instances.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className={`text-base font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>5. Inquiries & Disputes</h2>
          <p>
            Any inquiries regarding deliverables or service warranties may be directed directly to Founder Petuel Baifem via WhatsApp at <strong className={isDark ? 'text-white' : 'text-slate-900'}>{COMPANY_INFO.whatsapp}</strong> or email at <a href={`mailto:${COMPANY_INFO.email}`} className="text-purple-500 underline">{COMPANY_INFO.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
