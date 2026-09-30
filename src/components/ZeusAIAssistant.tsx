import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  HelpCircle, 
  Calendar, 
  Phone,
  RefreshCw,
  ChevronUp
} from 'lucide-react';
import { api } from '../lib/api';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { useTheme } from '../context/ThemeContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ZeusAIAssistantProps {
  onNavigateToBook: (department?: string, service?: string) => void;
}

export const ZeusAIAssistant: React.FC<ZeusAIAssistantProps> = ({ onNavigateToBook }) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I am ZeusAI, the technology advisor for PETZEUSTECH in Cameroon. How can I help you today? Tell me what you need—whether it's a website, Linux VPS hosting, graphic design, phone or laptop repair, ads, or IT training!",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const updatedMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const reply = await api.askZeusAI(userText, updatedMessages.slice(-6));
      setMessages([...updatedMessages, { role: 'model', text: reply }]);
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        {
          role: 'model',
          text: "I had a moment connecting to the server, but our founder Petuel Baifem is always on WhatsApp at +237 677 251 088 to help you directly!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "I need a custom website for my business",
    "My phone screen is cracked, can you fix it?",
    "How do I set up an Ubuntu VPS with Nginx?",
    "I want to learn web development in Cameroon",
  ];

  return (
    <>
      {/* Floating Trigger Badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-semibold text-sm shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-200 group"
          id="zeus-ai-trigger-btn"
          aria-label="Open ZeusAI Tech Assistant"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
          </div>
          <span>Ask ZeusAI Assistant</span>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh] rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 ${
          isDark 
            ? 'bg-[#0d0f28] border-purple-500/40 shadow-purple-950/80 text-white' 
            : 'bg-white border-slate-200 shadow-slate-300 text-slate-900'
        }`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 p-4 text-white flex items-center justify-between border-b border-purple-900/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5 text-cyan-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm tracking-tight font-display text-white">ZeusAI Tech Advisor</h4>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    GEMINI
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">PETZEUSTECH Expert Guidance</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Conversation"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Direct Actions Sub-bar */}
          <div className={`px-4 py-2 border-b flex items-center justify-between text-xs ${
            isDark 
              ? 'bg-[#10133a] border-purple-900/40 text-slate-300' 
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <span>Official Channel:</span>
            <a
              href={buildGeneralWhatsAppUrl('ZeusAI Fast Chat')}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+237 677 251 088</span>
            </a>
          </div>

          {/* Messages Stream */}
          <div className={`flex-1 p-4 overflow-y-auto space-y-3.5 ${
            isDark ? 'bg-[#090b1e]' : 'bg-slate-50/70'
          }`}>
            {messages.map((m, idx) => {
              const isAi = m.role === 'model';
              return (
                <div
                  key={idx}
                  className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      isAi
                        ? isDark
                          ? 'bg-[#141842] text-slate-100 border border-purple-900/50 shadow-md'
                          : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className={`rounded-2xl px-4 py-3 text-xs border shadow-sm flex items-center gap-2 ${
                  isDark 
                    ? 'bg-[#141842] text-slate-300 border-purple-900/50' 
                    : 'bg-white text-slate-600 border-slate-200'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                  <span>ZeusAI is analyzing your request...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Prompts */}
          {messages.length < 3 && (
            <div className={`px-4 py-2 border-t ${
              isDark ? 'bg-[#0d0f28] border-purple-900/40' : 'bg-white border-slate-100'
            }`}>
              <p className={`text-[11px] font-semibold mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Common questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(prompt);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-full text-left transition-colors border ${
                      isDark 
                        ? 'bg-[#181c4e] hover:bg-purple-900/60 text-purple-200 border-purple-800/40' 
                        : 'bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border-slate-200'
                    }`}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className={`p-3 border-t ${
            isDark ? 'bg-[#0d0f28] border-purple-900/40' : 'bg-white border-slate-200'
          }`}>
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about websites, repairs, hosting..."
                className={`flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all border ${
                  isDark 
                    ? 'bg-[#141842] border-purple-900/60 text-white placeholder-slate-400 focus:bg-[#191f56]' 
                    : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-500 focus:bg-white'
                }`}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white flex items-center justify-center transition-colors shadow-md shadow-blue-900/40"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className={`mt-2 flex items-center justify-between text-[11px] px-1 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigateToBook();
                }}
                className="text-blue-400 hover:underline font-semibold flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Book Service Directly</span>
              </button>
              <span>Cameroon • Global Support</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
