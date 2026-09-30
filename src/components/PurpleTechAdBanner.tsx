import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, ArrowRight, X, Zap, ChevronRight } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { useTheme } from '../context/ThemeContext';

interface PurpleTechAdBannerProps {
  onNavigate: (page: string, param?: string) => void;
}

export const PurpleTechAdBanner: React.FC<PurpleTechAdBannerProps> = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('petzeustech_ad_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const [activeSlide, setActiveSlide] = useState<number>(0);

  const promoOffers = [
    {
      badge: 'LIMITED TECH PROMOTION',
      title: 'Power Your Business Online — Get 20% Off Custom Web & Cloud Setup',
      subtitle: 'Modern software, high-speed cloud hosting, and transparent pricing built for African bandwidth.',
      actionText: 'Claim 20% Discount',
      actionParam: 'Software Labs Promo',
    },
    {
      badge: 'RAPID DIAGNOSTIC',
      title: 'Free 15-Minute WhatsApp Technical Architecture & Scope Consultation',
      subtitle: 'Talk directly with founder & lead engineer Petuel Baifem before committing a single franc.',
      actionText: 'Chat With Lead Engineer',
      actionParam: 'Architecture Consultation',
    },
    {
      badge: 'STUDIO & ACADEMY',
      title: 'Monetize Tech Skills: Practical IT Academy Enrollment Now Open in Cameroon',
      subtitle: 'Learn web development, graphic design, and hardware troubleshooting with hands-on labs.',
      actionText: 'View Academy Courses',
      actionParam: 'IT Academy',
    },
  ];

  // Rotate through promo highlights every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % promoOffers.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [promoOffers.length]);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('petzeustech_ad_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  if (isDismissed) {
    return null;
  }

  const currentPromo = promoOffers[activeSlide];

  return (
    <div className={`relative z-20 overflow-hidden border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white border-purple-800/40 shadow-md' 
        : 'bg-gradient-to-r from-purple-50 via-indigo-50/70 to-purple-50 text-slate-900 border-purple-200 shadow-sm'
    }`}>
      {/* Animated glowing sheen layer */}
      {isDark ? (
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.4),transparent_65%)] animate-pulse" 
          style={{ animationDuration: '4s' }}
        />
      ) : (
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.12),transparent_70%)]" 
        />
      )}
      <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-purple-600/20' : 'bg-purple-300/30'
      }`} />
      <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-cyan-600/15' : 'bg-indigo-200/30'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
          
          {/* Promo Content */}
          <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
            <div className={`w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0 shadow-sm ${
              isDark 
                ? 'bg-purple-600/30 border-purple-400/30 text-purple-300 shadow-purple-500/20' 
                : 'bg-purple-100 border-purple-300 text-purple-700 shadow-purple-200/50'
            }`}>
              <Zap className={`w-4 h-4 ${isDark ? 'text-purple-300 fill-purple-300/30' : 'text-purple-600 fill-purple-600/30'}`} />
            </div>

            <div className="space-y-0.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                  isDark 
                    ? 'bg-purple-500/20 border-purple-400/30 text-purple-300' 
                    : 'bg-purple-100 border-purple-300 text-purple-800'
                }`}>
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{currentPromo.badge}</span>
                </span>
                <span className={`text-[11px] hidden sm:inline ${isDark ? 'text-purple-200/70' : 'text-slate-400'}`}>•</span>
                <p className={`text-xs sm:text-sm font-bold truncate font-display ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {currentPromo.title}
                </p>
              </div>
              <p className={`text-[11px] hidden md:block line-clamp-1 ${
                isDark ? 'text-purple-200/80' : 'text-slate-600'
              }`}>
                {currentPromo.subtitle}
              </p>
            </div>
          </div>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
            {/* WhatsApp CTA */}
            <a
              href={buildGeneralWhatsAppUrl(currentPromo.actionParam)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:from-purple-700 active:to-indigo-700 text-white text-xs font-bold transition-all shadow-sm shadow-purple-900/40 flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>{currentPromo.actionText}</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Book Service Link */}
            <button
              onClick={() => onNavigate('book', currentPromo.actionParam)}
              className={`hidden lg:flex px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors items-center gap-1 ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/15 text-purple-100 border-purple-400/20' 
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
              }`}
            >
              <span>Book Online</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Slide Dots Indicator */}
            <div className="flex items-center gap-1 px-2">
              {promoOffers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activeSlide 
                      ? isDark ? 'w-4 bg-purple-400' : 'w-4 bg-purple-600' 
                      : isDark ? 'bg-purple-700/60 hover:bg-purple-500' : 'bg-slate-300 hover:bg-purple-400'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className={`p-1 rounded-lg transition-colors ml-1 ${
                isDark 
                  ? 'text-purple-300/70 hover:text-white hover:bg-purple-800/40' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Dismiss announcement"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
