import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Sun } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userQuery.trim()
      ? encodeURIComponent(`Hi EKM Installation and Maintenance, ${userQuery}`)
      : encodeURIComponent('Hi EKM! I would like a quote and consultation for a solar power system.');
    window.open(`https://wa.me/27849515177?text=${text}`, '_blank');
    setIsOpen(false);
    setUserQuery('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Quick Chat Window */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl glass-card-light border-2 border-emerald-500/40 shadow-2xl overflow-hidden animate-fadeIn bg-white/98">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <Sun className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-emerald-700"></span>
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">EKM Engineering</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                    Online &bull; Instant Response
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-emerald-50/90 leading-tight">
              South Africa certified solar installations, lithium storage & SANS CoC maintenance.
            </p>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-none border border-slate-200 text-xs text-slate-700 shadow-xs">
              <p className="font-semibold text-slate-900 mb-1">
                Hello! 👋 Welcome to EKM Installation & Maintenance.
              </p>
              <p className="leading-relaxed">
                Looking to eliminate load-shedding or need an electrical SANS 10142-1 compliance audit? Type below to chat directly with our engineering team on WhatsApp.
              </p>
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Master Electricians &bull; Verified Business</span>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Home Solar 8kW', 'Commercial 50kW', 'Electrical CoC', 'Load-Shedding Sizing'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setUserQuery(`I am interested in ${chip}. Please assist with pricing.`)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Type your solar inquiry..."
                className="flex-1 px-3.5 py-2.5 rounded-xl text-xs bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all duration-300"
        aria-label="Open WhatsApp chat"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="text-xs font-black tracking-wide hidden sm:inline">
          {isOpen ? 'Close' : 'Chat on WhatsApp'}
        </span>
      </button>
    </div>
  );
};
