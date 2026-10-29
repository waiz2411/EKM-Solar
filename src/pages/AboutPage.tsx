import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Sun, 
  Building2, 
  Users, 
  MapPin, 
  ExternalLink, 
  Phone, 
  MessageCircle,
  FileText
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FAFBFC] pb-24">
      {/* Header */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-sky-50/40 via-white to-[#FAFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            Engineering Standards & Certifications
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            About EKM Installation & Maintenance
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded with a commitment to technical integrity, safety, and energy self-reliance across South Africa.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Our Technical Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Bridging Solar Photovoltaic Power with Heavy-Duty Electrical Engineering
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In a market crowded with non-compliant installations and unlicensed fly-by-night solar installers, <strong>{COMPANY_INFO.name}</strong> was established to provide homeowners, farmers, and commercial facility managers with uncompromised engineering precision.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We do not treat solar as an off-the-shelf gadget. Every system is treated as a high-voltage electrical power station integrated directly into your building’s distribution board. Our team is led by Department of Labour registered Master Electricians who ensure that every wire, surge arrestor, and changeover switch adheres strictly to <strong>SANS 10142-1</strong> safety standards.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs font-bold text-slate-700 mt-1">SANS CoC Issuance</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Insurance guaranteed</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <div className="text-2xl font-black text-slate-900">&lt;20 ms</div>
                <div className="text-xs font-bold text-slate-700 mt-1">UPS Changeover</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Zero appliance flicker</div>
              </div>
            </div>
          </div>

          {/* Right Image / Accreditation Card */}
          <div className="lg:col-span-5">
            <div className="glass-card-light rounded-3xl p-8 border border-slate-200/90 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">Verified Accreditations</h4>
                  <p className="text-xs text-slate-500">Regulatory standards compliance</p>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs font-semibold text-slate-700">
                {COMPANY_INFO.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>

              {/* Google Maps Verified Listing Pill */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={COMPANY_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Verified Google Business Place</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Point Quality Guarantee Underwrite */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
            Client Peace of Mind
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            The EKM 5-Point Workmanship Guarantee
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Zero Roof Leaks Guarantee',
              desc: 'Specialized aluminum tile brackets and hanger bolts fitted with UV-resistant EPDM rubber gaskets ensure zero water ingress during severe summer downpours.'
            },
            {
              title: 'Tier-1 Equipment Exclusively',
              desc: 'We never install unbranded or grey-market components. All panels, hybrid inverters, and lithium storage walls come with authentic South African distributor warranties.'
            },
            {
              title: 'Legal CoC for Home Insurance',
              desc: 'Your installation is officially logged with local municipal distributors and the Department of Labour, protecting your building insurance against repudiation.'
            },
            {
              title: 'Clean Cable Trunking & Wireways',
              desc: 'No tangled wiring or exposed DC conductors. Every line is secured inside UV-stabilized conduits and heavy-duty trunking for maximum aesthetic appeal and safety.'
            },
            {
              title: 'Sub-20ms UPS Performance',
              desc: 'Continuous uninterrupted power. When load-shedding strikes, your lights, computers, Wi-Fi routers, and security cameras do not even blink.'
            },
            {
              title: '24/7 Breakdown Priority Response',
              desc: 'Dedicated technical hotline for our clients. In the unlikely event of an inverter fault or grid trip, our mobile technicians deploy rapidly.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass-card-light p-6 rounded-2xl border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-sm mb-4">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-black text-slate-900 mb-2">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
