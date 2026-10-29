import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    serviceType: 'Residential Solar & Battery',
    roofType: 'Tile Roof',
    monthlyBill: 'R3,500 - R7,000',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#0284c7', '#10b981']
    });
  };

  const directWhatsAppLink = `https://wa.me/27849515177?text=${encodeURIComponent(
    `Hi EKM Installation and Maintenance,\n` +
    `My name is ${formData.fullName || 'a client'}.\n` +
    `Phone: ${formData.phone || 'N/A'}\n` +
    `Location: ${formData.location || 'South Africa'}\n` +
    `Service: ${formData.serviceType}\n` +
    `Roof Type: ${formData.roofType}\n` +
    `Monthly Bill: ${formData.monthlyBill}\n` +
    `Notes: ${formData.notes || 'Please provide a quote.'}`
  )}`;

  return (
    <div className="bg-[#FAFBFC] pb-24">
      {/* Header */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-sky-50/40 via-white to-[#FAFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Fast Turnaround Consultation
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Request an Official Engineering Proposal
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get in touch directly with our registered solar electricians for turnkey installations, SANS 10142-1 CoC audits, or preventative maintenance.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <h3 className="text-xl font-black text-slate-900">Direct Contact Channels</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 hover:border-amber-400 transition-colors shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Direct Phone</span>
                    <span className="font-black text-slate-900 text-base">{COMPANY_INFO.displayPhone}</span>
                  </div>
                </a>

                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-4 hover:bg-emerald-50 transition-colors shadow-xs group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">WhatsApp Direct (Instant)</span>
                    <span className="font-black text-emerald-950 text-base">{COMPANY_INFO.displayPhone}</span>
                  </div>
                </a>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Official Email</span>
                    <span className="font-bold text-slate-900">{COMPANY_INFO.email}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Working Hours</span>
                    <span className="font-semibold text-slate-800 leading-tight block">{COMPANY_INFO.hours}</span>
                  </div>
                </div>
              </div>

              {/* Google Maps Location Verification Card */}
              <div className="pt-2">
                <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-300">
                      Google Maps Verified Place
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-white">
                    EKM INSTALLATION AND MAINTENANCE
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Registered Construction Company & Service Establishment serving Gauteng, Limpopo, Mpumalanga, and nationwide commercial projects.
                  </p>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors pt-1"
                  >
                    <span>Open in Google Maps Application</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7">
            <div className="glass-card-light rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl bg-white">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Proposal Request Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. One of our registered electrical engineers will review your specs and contact you within 24 hours.
                  </p>

                  <div className="pt-4">
                    <a
                      href={directWhatsAppLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Speed Up: Send Specs to WhatsApp Now</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">Online Quote Questionnaire</h3>
                      <p className="text-xs text-slate-500">Provide details for an accurate system sizing</p>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      Free & No Obligation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Johan van Zyl"
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 084 123 4567"
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. johan@example.co.za"
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Property Location / City</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Centurion / Midrand / Pretoria"
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Service Required</label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>Residential Solar & Battery</option>
                        <option>Commercial Rooftop Solar</option>
                        <option>SANS 10142-1 CoC Compliance Audit</option>
                        <option>Solar Maintenance & Thermal Audit</option>
                        <option>Solar Carport & Civil Infrastructure</option>
                        <option>Automatic Generator Changeover (ATS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">Roof Structure Type</label>
                      <select
                        value={formData.roofType}
                        onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      >
                        <option>Tile Roof</option>
                        <option>Corrugated Iron Roof</option>
                        <option>IBR Metal Sheet</option>
                        <option>Klip-Lok Standing Seam</option>
                        <option>Flat Concrete Roof</option>
                        <option>Ground Mount / Yard</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Estimated Monthly Electricity Bill</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['R1,500 - R3,500', 'R3,500 - R7,500', 'R7,500 - R20,000+'].map((bill) => (
                        <button
                          key={bill}
                          type="button"
                          onClick={() => setFormData({ ...formData, monthlyBill: bill })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            formData.monthlyBill === bill
                              ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {bill}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Additional Notes / Special Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Looking to run borehole pump and pool pump through load-shedding..."
                      className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Proposal Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
