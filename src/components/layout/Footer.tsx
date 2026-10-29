import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2, 
  MessageCircle,
  ExternalLink,
  Award
} from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <span className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">SANS 10142-1 CoC</h5>
              <p className="text-xs text-slate-400">Certified legal compliance</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <span className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">25-Year Performance</h5>
              <p className="text-xs text-slate-400">Tier-1 N-Type TOPCon Panels</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <span className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">Sub-20ms Transfer</h5>
              <p className="text-xs text-slate-400">Zero-flicker UPS backup</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
            <span className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Sun className="w-5 h-5" />
            </span>
            <div>
              <h5 className="text-sm font-bold text-white">Turnkey Maintenance</h5>
              <p className="text-xs text-slate-400">Thermal drone & cleaning</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
                <Sun className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-white tracking-tight">EKM</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                  Installation & Maintenance
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Empowering South African residences, corporate properties, and commercial facilities with certified solar energy resilience, lithium storage, and comprehensive electrical engineering.
            </p>

            <div className="pt-2">
              <a
                href={COMPANY_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700/80 transition-colors border border-slate-700"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Verified Google Business Listing</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-amber-400 transition-colors">Engineering Services</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-slate-400 hover:text-amber-400 transition-colors">Solar Savings Calculator</Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-amber-400 transition-colors">Completed Projects</Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-400 transition-colors">About & Certifications</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-amber-400 transition-colors">Contact & Quote</Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Specializations</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link to="/services" className="hover:text-amber-400 transition-colors line-clamp-1">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">Direct Contact</h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-bold">{COMPANY_INFO.displayPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="font-bold">WhatsApp Direct (+27 84 951 5177)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li className="pt-2 text-slate-400 leading-relaxed text-[11px]">
                {COMPANY_INFO.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. SANS 10142-1 Compliant.
          </p>
          <div className="flex items-center gap-4">
            <span>South Africa</span>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Legal & CoC Verification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
