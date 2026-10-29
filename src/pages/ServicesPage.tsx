import React, { useState } from 'react';
import { 
  Sun, 
  Building2, 
  ShieldCheck, 
  Wrench, 
  Hammer, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  FileCheck,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/companyData';

const iconMap: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-6 h-6 text-amber-500" />,
  Building2: <Building2 className="w-6 h-6 text-sky-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
  Wrench: <Wrench className="w-6 h-6 text-purple-500" />,
  Hammer: <Hammer className="w-6 h-6 text-amber-600" />,
  Zap: <Zap className="w-6 h-6 text-sky-600" />
};

export const ServicesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => {
        if (activeCategory === 'solar') return s.id.includes('solar');
        if (activeCategory === 'electrical') return s.id.includes('coc') || s.id.includes('ats');
        if (activeCategory === 'maintenance') return s.id.includes('maintenance') || s.id.includes('carports');
        return true;
      });

  return (
    <div className="bg-[#FAFBFC] pb-24">
      {/* Page Header */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-sky-50/50 via-white to-[#FAFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Engineering & Technical Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Specialized Solar & Maintenance Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            From tier-1 residential solar micro-grids to Department of Labour certified SANS 10142-1 CoC compliance audits and structural solar carports.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'solar', label: 'Solar & Battery Systems' },
              { id: 'electrical', label: 'Electrical CoC & Compliance' },
              { id: 'maintenance', label: 'Maintenance & Structural Works' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-card-light rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                    {iconMap[service.iconName] || <Sun className="w-6 h-6 text-amber-500" />}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-50 text-amber-700 border border-amber-200">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Ideal for: {service.idealFor}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {service.fullDesc}
                </p>

                {/* Key Features List */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    Engineering Deliverables:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specification Table */}
                <div className="grid grid-cols-2 gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 text-xs">
                  {service.specs.map((spec, sIdx) => (
                    <div key={sIdx}>
                      <span className="text-slate-400 font-medium block text-[11px]">{spec.label}</span>
                      <span className="font-extrabold text-slate-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with Price & WhatsApp Button */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Guide Pricing
                  </span>
                  <div className="text-lg font-black text-slate-900">
                    From {service.startingFrom}
                  </div>
                </div>

                <a
                  href={`https://wa.me/27849515177?text=Hi%20EKM,%20I%20would%20like%20to%20request%20a%20detailed%20proposal%20for%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Book Service</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5-STEP INSTALLATION & COMPLIANCE ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-3">
            <FileCheck className="w-3.5 h-3.5 text-sky-600" />
            Standard Operating Procedure
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            The EKM 5-Stage Engineering Protocol
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            How we take you from high municipal bills to certified legal power independence in under 72 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'On-Site Load Audit',
              desc: 'Detailed assessment of your peak kW demand, roof tilt, cable runs, and essential circuits.'
            },
            {
              step: '02',
              title: 'SANS Single Line Diagram',
              desc: 'Custom CAD electrical schematic designed to SANS 10142-1 standard with surge arrestors.'
            },
            {
              step: '03',
              title: 'Precision Installation',
              desc: 'Tier-1 bifacial panels mounted with zero roof leak penetration. Neat surface trunking.'
            },
            {
              step: '04',
              title: 'Telemetry Commissioning',
              desc: 'Inverter cloud sync, sub-20ms UPS transfer testing, and smartphone app setup.'
            },
            {
              step: '05',
              title: 'Legal CoC Certificate',
              desc: 'Department of Labour registered Master Electrician signs off your official legal CoC.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card-light p-6 rounded-2xl border border-slate-200/90 relative"
            >
              <div className="text-2xl font-black text-amber-500 mb-2">
                {item.step}
              </div>
              <h4 className="text-base font-black text-slate-900 mb-2">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="glass-card-light p-8 sm:p-12 rounded-3xl border-2 border-amber-400/40 bg-gradient-to-r from-amber-50/50 via-white to-sky-50/50 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            Need an Urgent SANS 10142-1 Electrical CoC Inspection?
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Selling a property or need your solar system verified for building insurance? Our registered electricians are on call.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book CoC Inspection on WhatsApp</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-6 py-3.5 rounded-2xl text-xs font-extrabold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition-all flex items-center gap-2"
            >
              <span>Call {COMPANY_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
