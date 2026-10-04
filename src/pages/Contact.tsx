import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { api } from '../lib/api';
import { useTheme } from '../context/ThemeContext';

export const Contact: React.FC = () => {
  const { isDark } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.submitContactMessage({
        name,
        email,
        subject,
        message,
      });
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try WhatsApp directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-left transition-colors duration-200 ${
      isDark ? 'text-slate-100' : 'text-slate-800'
    }`}>
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
          Get In Touch
        </span>
        <h1 className={`text-4xl sm:text-5xl font-black font-display tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Contact PETZEUSTECH
        </h1>
        <p className={`text-base leading-relaxed ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          We operate 100% online, serving clients across Cameroon, Africa, and internationally. For the fastest response, reach out directly on WhatsApp or submit the contact form below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Primary Card */}
          <div className={`p-6 rounded-3xl border space-y-4 shadow-xl ${
            isDark 
              ? 'bg-emerald-950/40 border-emerald-500/40 shadow-emerald-950/20' 
              : 'bg-emerald-50/80 border-emerald-200 shadow-emerald-100/50'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`font-bold text-base font-display ${
                  isDark ? 'text-emerald-300' : 'text-emerald-900'
                }`}>
                  Official WhatsApp Channel
                </h3>
                <p className={`text-xs ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Fastest direct consultation</p>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${
              isDark ? 'text-emerald-200/90' : 'text-emerald-800'
            }`}>
              Founder Petuel Baifem monitors WhatsApp directly. Send a voice note, message, or project brief any time.
            </p>

            <a
              href={buildGeneralWhatsAppUrl('Contact Page Fast Chat')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message +237 677 251 088</span>
            </a>
          </div>

          {/* Location & Details Card */}
          <div className={`p-6 rounded-3xl border shadow-xl space-y-4 transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/90 border-purple-900/40 shadow-purple-950/30' 
              : 'bg-white border-slate-200 shadow-slate-200/60'
          }`}>
            <div className={`space-y-3 text-xs sm:text-sm ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Service Delivery</strong>
                  <span>100% Online & Remote (Worldwide & Cameroon)</span>
                </div>
              </div>

              <div className={`flex items-start gap-3 pt-3 border-t ${
                isDark ? 'border-purple-900/40' : 'border-slate-200'
              }`}>
                <Mail className="w-5 h-5 text-fuchsia-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Email</strong>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-purple-500 hover:underline">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className={`flex items-start gap-3 pt-3 border-t ${
                isDark ? 'border-purple-900/40' : 'border-slate-200'
              }`}>
                <Clock className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Working Hours</strong>
                  <span>Monday – Saturday: 08:00 AM – 06:30 PM (GMT+1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className={`p-6 sm:p-10 rounded-3xl border shadow-2xl space-y-6 transition-all ${
            isDark 
              ? 'bg-[#0b0c24]/95 border-purple-900/40 shadow-purple-950/40' 
              : 'bg-white border-slate-200 shadow-slate-200/60'
          }`}>
            <h3 className={`text-lg font-bold font-display ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Send Us a Message
            </h3>

            {success ? (
              <div className={`p-6 rounded-2xl border text-center space-y-3 ${
                isDark 
                  ? 'bg-emerald-950/50 border-emerald-500/40' 
                  : 'bg-emerald-50 border-emerald-200'
              }`}>
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className={`font-bold text-base ${
                  isDark ? 'text-emerald-300' : 'text-emerald-800'
                }`}>Message Sent Successfully</h4>
                <p className={`text-xs ${
                  isDark ? 'text-emerald-200' : 'text-emerald-700'
                }`}>
                  Thank you for reaching out! Our team will respond to your email promptly. You may also follow up on WhatsApp anytime with your reference.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-950/50 border border-rose-500/40 text-rose-200 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Your Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Fru"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Your Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                        isDark 
                          ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                          : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Subject <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inquiring about School Management Software"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark 
                        ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your questions or project requirements..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full p-3.5 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      isDark 
                        ? 'bg-[#08091a] border-purple-900/50 text-white placeholder:text-slate-500' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
