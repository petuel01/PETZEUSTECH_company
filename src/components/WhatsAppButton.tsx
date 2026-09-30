import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';

interface WhatsAppButtonProps {
  label?: string;
  topic?: string;
  variant?: 'primary' | 'outline' | 'pill' | 'compact';
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label = 'Chat on WhatsApp',
  topic,
  variant = 'primary',
  className = '',
}) => {
  const url = buildGeneralWhatsAppUrl(topic);

  let styleClasses = 'inline-flex items-center gap-2 font-semibold transition-all ';

  switch (variant) {
    case 'primary':
      styleClasses += 'px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 active:scale-98';
      break;
    case 'outline':
      styleClasses += 'px-3.5 py-2 rounded-lg border border-emerald-300 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100/80 active:scale-98 text-sm';
      break;
    case 'pill':
      styleClasses += 'px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs tracking-wide shadow-md active:scale-98';
      break;
    case 'compact':
      styleClasses += 'p-2 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800';
      break;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styleClasses} ${className}`}
      title="Open WhatsApp chat with PETZEUSTECH (+237 677 251 088)"
    >
      <MessageCircle className="w-4 h-4 flex-shrink-0" />
      <span>{label}</span>
    </a>
  );
};
