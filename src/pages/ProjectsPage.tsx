import React, { useState } from 'react';
import { MapPin, Zap, Battery, Calendar, TrendingUp, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';
import { PROJECTS, COMPANY_INFO } from '../data/companyData';

export const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Residential', 'Commercial', 'Agricultural', 'Maintenance'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="bg-[#FAFBFC] pb-24">
      {/* Page Header */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-sky-50/40 via-white to-[#FAFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-4">
            Proven Performance Across South Africa
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Engineering Portfolio & Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Real solar PV arrays, lithium storage banks, and electrical infrastructure engineered and commissioned by EKM INSTALLATION AND MAINTENANCE.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === cat
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card-light rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-white/95 text-slate-900 backdrop-blur-md shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-md">
                      {project.annualSavingsZAR}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-3">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2 mb-6">
                    {project.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium block">Array Capacity</span>
                      <span className="font-extrabold text-slate-900">{project.systemSize}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Storage Vault</span>
                      <span className="font-extrabold text-slate-900">{project.storage}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Inverter Architecture</span>
                      <span className="font-extrabold text-slate-900">{project.inverter}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium block">Installation Time</span>
                      <span className="font-extrabold text-slate-900">{project.completionTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer with Direct WhatsApp Contact */}
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={`https://wa.me/27849515177?text=Hi%20EKM,%20I%20saw%20your%20project:%20${encodeURIComponent(project.title)}.%20Can%20you%20do%20something%20similar%20for%20my%20property?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Inquire About Similar Installation</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
