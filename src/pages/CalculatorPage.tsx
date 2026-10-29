import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Zap, 
  Sun, 
  Battery, 
  ShieldCheck, 
  TrendingUp, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Calculator,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface ApplianceOption {
  id: string;
  name: string;
  watts: number;
  selected: boolean;
}

export const CalculatorPage: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(4500);
  const [propertyType, setPropertyType] = useState<'residential' | 'commercial' | 'farm'>('residential');
  const [loadSheddingTarget, setLoadSheddingTarget] = useState<number>(6); // Stage 6 default
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([
    'wifi', 'fridge', 'lights', 'tv', 'geyser'
  ]);

  const applianceList = [
    { id: 'wifi', name: 'Wi-Fi & Fibre Routers', watts: 60 },
    { id: 'fridge', name: 'Refrigerators & Freezers', watts: 450 },
    { id: 'lights', name: 'LED Household Lighting', watts: 180 },
    { id: 'tv', name: 'TV & Home Entertainment', watts: 300 },
    { id: 'geyser', name: 'Solar Smart Geyser Controller', watts: 2500 },
    { id: 'aircon', name: 'Inverter Air Conditioners', watts: 1600 },
    { id: 'pool', name: 'Swimming Pool Pump', watts: 1100 },
    { id: 'borehole', name: 'Borehole / Booster Pump', watts: 1800 },
  ];

  const toggleAppliance = (id: string) => {
    if (selectedAppliances.includes(id)) {
      setSelectedAppliances(selectedAppliances.filter((item) => item !== id));
    } else {
      setSelectedAppliances([...selectedAppliances, id]);
    }
  };

  // Calculation Logic tailored to South African Rand and Solar Irradiance
  const calculation = useMemo(() => {
    // Average cost per kWh in SA is approx R3.20 - R3.80
    const estKwhPerMonth = monthlyBill / 3.4;
    const dailyKwh = estKwhPerMonth / 30;

    // Inverter Sizing
    let inverterKw = 5;
    if (monthlyBill > 2500 && monthlyBill <= 6000) inverterKw = 8;
    else if (monthlyBill > 6000 && monthlyBill <= 12000) inverterKw = 10;
    else if (monthlyBill > 12000 && monthlyBill <= 20000) inverterKw = 12;
    else if (monthlyBill > 20000) inverterKw = 16;

    if (propertyType === 'commercial') inverterKw = Math.max(16, inverterKw * 2);
    if (propertyType === 'farm') inverterKw = Math.max(12, inverterKw * 1.5);

    // Lithium Storage Sizing (kWh)
    let batteryKwh = 5.12;
    if (loadSheddingTarget >= 4 && loadSheddingTarget <= 6) {
      batteryKwh = monthlyBill > 4000 ? 10.24 : 5.12;
    } else if (loadSheddingTarget > 6) {
      batteryKwh = monthlyBill > 6000 ? 15.36 : 10.24;
    }
    if (selectedAppliances.includes('geyser') || selectedAppliances.includes('aircon')) {
      batteryKwh = Math.max(10.24, batteryKwh);
    }
    if (propertyType === 'commercial') batteryKwh = Math.max(20, batteryKwh * 2);

    // Panels (550W Monocrystalline)
    const requiredKwp = (dailyKwh * 0.75) / 5.2; // 5.2 peak sun hours in SA
    const panelCount = Math.max(6, Math.ceil((requiredKwp * 1000) / 550));
    const totalArrayKw = ((panelCount * 550) / 1000).toFixed(1);

    // Savings in ZAR
    const monthlySavings = Math.round(monthlyBill * 0.82);
    const annualSavings = monthlySavings * 12;
    const paybackYears = (3.6 + (monthlyBill < 3000 ? 0.8 : -0.4)).toFixed(1);

    return {
      inverterKw,
      batteryKwh,
      panelCount,
      totalArrayKw,
      monthlySavings,
      annualSavings,
      paybackYears,
      loadSheddingTarget,
    };
  }, [monthlyBill, propertyType, loadSheddingTarget, selectedAppliances]);

  const triggerCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#0284c7', '#10b981']
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hi EKM Installation & Maintenance! I used your website solar calculator:\n` +
    `- Property Type: ${propertyType.toUpperCase()}\n` +
    `- Monthly Eskom Bill: R${monthlyBill.toLocaleString()}\n` +
    `- Recommended Inverter: ${calculation.inverterKw}kW Hybrid\n` +
    `- Battery Storage: ${calculation.batteryKwh}kWh LiFePO4\n` +
    `- Solar Array: ${calculation.panelCount}x 550W Panels (${calculation.totalArrayKw}kWp)\n` +
    `- Projected Monthly Savings: R${calculation.monthlySavings.toLocaleString()}/month\n` +
    `Please provide me with an official quote and SANS CoC consultation.`
  );

  return (
    <div className="bg-[#FAFBFC] pb-24">
      {/* Header */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-amber-50/40 via-white to-[#FAFBFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 mb-4">
            <Calculator className="w-3.5 h-3.5 text-amber-600" />
            South Africa Rand (ZAR) Sizing Tool
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Solar & Load-Shedding ROI Calculator
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Configure your monthly municipal bill and critical appliances to calculate the ideal hybrid inverter, LiFePO4 battery bank, and estimated Rand savings.
          </p>
        </div>
      </section>

      {/* Main Calculator Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Input 1: Monthly Eskom Bill Slider */}
            <div className="glass-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900">Current Monthly Eskom Bill</h3>
                  <p className="text-xs text-slate-500">Your average electricity cost in Rands</p>
                </div>
                <div className="text-2xl font-black text-amber-600 tracking-tight">
                  R {monthlyBill.toLocaleString()}
                </div>
              </div>

              <input
                type="range"
                min="1500"
                max="25000"
                step="500"
                value={monthlyBill}
                onChange={(e) => {
                  setMonthlyBill(Number(e.target.value));
                }}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-4"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>R 1,500</span>
                <span>R 10,000</span>
                <span>R 25,000+</span>
              </div>
            </div>

            {/* Input 2: Property Type Selector */}
            <div className="glass-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <h3 className="text-base font-black text-slate-900 mb-1">Property Classification</h3>
              <p className="text-xs text-slate-500 mb-4">Optimizes single-phase vs three-phase balancing</p>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'residential', label: 'Residential Home', sub: 'Single / Dual Phase' },
                  { id: 'commercial', label: 'Commercial Office', sub: 'Three-Phase 400V' },
                  { id: 'farm', label: 'Farm / Agricultural', sub: 'Pumps & Boreholes' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPropertyType(p.id as any)}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      propertyType === p.id
                        ? 'bg-amber-500/10 border-amber-400 text-slate-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-black">{p.label}</div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">{p.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Target Load-Shedding Defense Level */}
            <div className="glass-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-black text-slate-900">Eskom Defense Target</h3>
                <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                  Stage {loadSheddingTarget} Outage Immunity
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">Choose the grid outage severity you want to defeat</p>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { stage: 2, label: 'Stage 2', desc: 'Up to 4h off' },
                  { stage: 4, label: 'Stage 4', desc: 'Up to 8h off' },
                  { stage: 6, label: 'Stage 6', desc: 'Up to 12h off' },
                  { stage: 8, label: 'Stage 8+', desc: '100% Off-Grid' },
                ].map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => setLoadSheddingTarget(s.stage)}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      loadSheddingTarget === s.stage
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-black">{s.label}</div>
                    <div className="text-[10px] opacity-75">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input 4: Critical Appliances Checklist */}
            <div className="glass-card-light rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <h3 className="text-base font-black text-slate-900 mb-1">Essential Appliances to Protect</h3>
              <p className="text-xs text-slate-500 mb-4">Select the circuits that must remain powered</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {applianceList.map((app) => {
                  const isChecked = selectedAppliances.includes(app.id);
                  return (
                    <button
                      key={app.id}
                      onClick={() => toggleAppliance(app.id)}
                      className={`p-3 rounded-2xl text-left border transition-all ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-xs leading-snug">{app.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{app.watts}W Avg</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Card */}
          <div className="lg:col-span-5 sticky top-28">
            <div className="glass-card-light rounded-3xl p-6 sm:p-8 border-2 border-amber-400/50 shadow-xl bg-white/95 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="text-base font-black text-slate-900">Recommended System</h4>
                    <p className="text-xs text-slate-500">Engineered for your property</p>
                  </div>
                </div>

                <button
                  onClick={triggerCelebrate}
                  className="p-2 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors"
                  title="Celebrate savings"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>

              {/* Hardware Sizing Specs */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Hybrid Inverter
                      </span>
                      <span className="text-base font-black text-slate-900">
                        {calculation.inverterKw}kW Sunsynk / Deye
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">Sub-20ms UPS</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Battery className="w-5 h-5 text-emerald-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        LiFePO4 Lithium Storage
                      </span>
                      <span className="text-base font-black text-slate-900">
                        {calculation.batteryKwh} kWh Capacity
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600">6,000 Cycles</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-sky-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Tier-1 Solar PV Array
                      </span>
                      <span className="text-base font-black text-slate-900">
                        {calculation.panelCount}x 550W Panels ({calculation.totalArrayKw}kWp)
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-sky-600">25-Yr Yield</span>
                </div>
              </div>

              {/* Financial Return Callouts in ZAR */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/90 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    Estimated Monthly Savings
                  </span>
                  <span className="text-xs font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                    ~82% Eskom Cut
                  </span>
                </div>
                <div className="text-3xl font-black text-emerald-950 tracking-tight mb-2">
                  R {calculation.monthlySavings.toLocaleString()} <span className="text-xs font-bold text-emerald-700">/ month</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-emerald-200 text-xs font-bold text-emerald-800">
                  <span>Annual Savings: R {calculation.annualSavings.toLocaleString()}</span>
                  <span>Est. Payback: {calculation.paybackYears} Yrs</span>
                </div>
              </div>

              {/* Legal CoC Guarantee Note */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-600 mb-6">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Includes Department of Labour SANS 10142-1 Electrical CoC certification.
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/27849515177?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Calculation to EKM on WhatsApp</span>
                </a>

                <p className="text-[11px] text-center text-slate-400">
                  Pre-fills WhatsApp chat with your exact calculated specs (+27 84 951 5177)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
