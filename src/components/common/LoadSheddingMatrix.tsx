import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LOAD_SHEDDING_MATRIX, COMPANY_INFO } from '../../data/companyData';

export const LoadSheddingMatrix: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(1);
  const currentStage = LOAD_SHEDDING_MATRIX[selectedStageIndex];

  return (
    <section className="py-20 bg-slate-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-3">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            Eskom Grid Failure Protocol
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            South Africa Load-Shedding Defense Matrix
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Compare municipal grid outages from Stage 1 through Stage 8. See how EKM engineered systems keep your appliances running with sub-20 millisecond zero-flicker UPS transfer.
          </p>
        </div>

        {/* Stage Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {LOAD_SHEDDING_MATRIX.map((stageItem, idx) => (
            <button
              key={stageItem.stage}
              onClick={() => setSelectedStageIndex(idx)}
              className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
                selectedStageIndex === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20 scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {stageItem.stage}
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Display Card */}
        <div className="glass-card-light rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl shadow-slate-200/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Summary Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Selected Level</span>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{currentStage.stage}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Grid Outage: {currentStage.hoursOff}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  EKM System Result
                </div>
                <div className="text-lg font-black text-emerald-900">
                  {currentStage.ekmSurvival}
                </div>
                <p className="text-xs text-emerald-700/90 mt-1">
                  Sub-20ms transfer prevents PC reboots, fiber disconnects, and TV trips.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Engineered Hardware Configuration
                </span>
                <div className="text-sm font-black text-slate-900">
                  {currentStage.recommendedSystem}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link
                  to="/calculator"
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Size This System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/27849515177?text=Hi%20EKM,%20I%20want%20protection%20against%20${encodeURIComponent(currentStage.stage)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>WhatsApp Specs</span>
                </a>
              </div>
            </div>

            {/* Right: Protected Appliances Status Grid */}
            <div className="lg:col-span-7">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Circuits & Appliances Active During Outage
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentStage.appliances.map((appliance, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-xs font-extrabold text-slate-800">{appliance.name}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {appliance.status}
                        </span>
                      </div>
                      <span className="p-1.5 rounded-lg bg-emerald-100/70 text-emerald-700 shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-800">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Master Electrician Guarantee:</strong> Dedicated essential and non-essential sub-boards wired to SANS 10142-1 standard.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
