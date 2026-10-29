import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Zap, 
  ShieldCheck, 
  BatteryCharging, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  Award, 
  Star,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Solar3DCanvas } from '../components/canvas/Solar3DCanvas';
import { SystemViewer3D } from '../components/canvas/SystemViewer3D';
import { LoadSheddingMatrix } from '../components/common/LoadSheddingMatrix';
import { COMPANY_INFO, SERVICES, PROJECTS, TESTIMONIALS, FAQS } from '../data/companyData';

export const HomePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION WITH 3D CANVAS */}
      <section className="relative pt-6 pb-16 md:pt-10 md:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill & Headline */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/10 text-amber-800 border border-amber-300/80 mb-4 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Next-Gen Solar Power & Certified Electrical Engineering</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">
              Power Your Future with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                Certified Solar Resilience
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Defeat load-shedding permanently with turnkey Tier-1 hybrid solar systems, LiFePO4 battery storage, and official SANS 10142-1 certified electrical compliance across South Africa.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <Link
                to="/calculator"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-extrabold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Calculate My Solar Savings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-sm font-extrabold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300/80 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Quick WhatsApp Quote</span>
              </a>
            </div>
          </div>

          {/* Interactive 3D Solar Scene Canvas */}
          <div className="relative mt-2">
            <Solar3DCanvas />
          </div>

          {/* Trust Metrics Ribbon */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {COMPANY_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-card-light p-4 sm:p-5 rounded-2xl border border-slate-200/90 text-center"
              >
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] font-semibold text-slate-400 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. DUAL PILLAR ARCHITECTURE: SOLAR & ENGINEERING MAINTENANCE */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              The EKM Engineering Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              More Than Just Solar Panels: Complete Engineering & Maintenance
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Unlike sales-only brokers, EKM is a qualified construction and technical service establishment providing holistic electrical engineering, structural carports, and preventative detailing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar A: Solar & Battery Generation */}
            <div className="glass-card-light p-8 rounded-3xl border border-slate-200 relative overflow-hidden group hover:border-amber-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                <Sun className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Turnkey Solar Energy & LiFePO4 Storage
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Custom engineered residential and commercial solar systems tailored to your roof orientation, tilt angles, and load profile. Sub-20ms automated UPS transfer safeguards your appliances through all municipal grid failures.
              </p>
              <ul className="space-y-3 mb-8 text-xs sm:text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Tier-1 N-Type TOPCon bifacial modules (25-year performance warranty)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sunsynk & Deye hybrid inverters with smartphone telemetry</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>LiFePO4 lithium battery storage (6,000+ cycles at 90% DoD)</span>
                </li>
              </ul>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                <span>Explore Solar Solutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Pillar B: Certified Maintenance & Construction Works */}
            <div className="glass-card-light p-8 rounded-3xl border border-slate-200 relative overflow-hidden group hover:border-sky-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">
                Electrical Compliance, Maintenance & Civil Works
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Full-spectrum technical establishment capabilities. Department of Labour certified Master Electricians issuing legal SANS 10142-1 CoC certificates, structural solar carports, and thermal drone efficiency scans.
              </p>
              <ul className="space-y-3 mb-8 text-xs sm:text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Official Department of Labour SANS 10142-1 Electrical CoC sign-off</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Thermal infrared drone audits & de-ionized solar panel wash</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Engineered structural steel solar carports & cable infrastructure</span>
                </li>
              </ul>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700"
              >
                <span>Explore Engineering & CoC</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE 3D SYSTEM EXPLODED VIEWER */}
      <section className="py-16 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SystemViewer3D />
        </div>
      </section>

      {/* 4. ESKOM LOAD-SHEDDING DEFENSE MATRIX */}
      <LoadSheddingMatrix />

      {/* 5. TIER-1 BRAND PARTNERSHIPS */}
      <section className="py-14 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Approved Equipment & Tier-1 Engineering Partners
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center">
            {COMPANY_INFO.brands.map((brand, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center hover:bg-white hover:border-amber-300 transition-all"
              >
                <div className="font-extrabold text-sm text-slate-900">{brand.name}</div>
                <div className="text-[10px] text-slate-500 font-medium mt-0.5 line-clamp-1">{brand.type}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS PREVIEW */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-2">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Featured South African Installations
              </h2>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-amber-600 transition-colors"
            >
              <span>View All Completed Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="glass-card-light rounded-3xl overflow-hidden border border-slate-200/90 shadow-md group hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-md">
                      {project.annualSavingsZAR}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{project.description}</p>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">PV Generation</span>
                      <span className="font-extrabold text-slate-900">{project.systemSize}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Lithium Storage</span>
                      <span className="font-extrabold text-slate-900">{project.storage}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CLIENT TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
              <Star className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              5-Star Client Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by Homeowners, Clinics & Commercial Facilities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="glass-card-light p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                    "{t.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-black text-sm text-slate-900">{t.name}</h4>
                      <p className="text-xs text-slate-500">{t.role} &bull; {t.location}</p>
                    </div>
                    <span className="p-1 rounded-full bg-emerald-100 text-emerald-700" title="Verified Customer">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] font-bold text-amber-600">
                    System: {t.system}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ ACCORDION */}
      <section className="py-20 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Clear Answers
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Frequently Asked Technical Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card-light rounded-2xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONVERSION CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-6">
            <Sun className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ready to Never Face a Power Outage Again?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Speak directly with our Department of Labour registered electrical specialists. Receive a bespoke proposal with South African Rand ROI modeling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Engineer on WhatsApp</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call {COMPANY_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
