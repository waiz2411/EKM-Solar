export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  badge: string;
  features: string[];
  specs: { label: string; value: string }[];
  idealFor: string;
  startingFrom: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Agricultural' | 'Maintenance';
  location: string;
  systemSize: string;
  inverter: string;
  storage: string;
  completionTime: string;
  annualSavingsZAR: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  system: string;
  verified: boolean;
}

export const COMPANY_INFO = {
  name: 'EKM INSTALLATION AND MAINTENANCE',
  shortName: 'EKM Solar & Engineering',
  tagline: 'Precision Solar Generation, Certified Electrical Compliance & Turnkey Infrastructure',
  description: 'Specialists in Tier-1 residential & commercial solar power, LiFePO4 energy storage, legal SANS 10142-1 Electrical Certificates of Compliance (CoC), and industrial facility maintenance across South Africa.',
  phone: '+27 84 951 5177',
  displayPhone: '+27 84 951 5177',
  localPhone: '084 951 5177',
  whatsappUrl: 'https://wa.me/27849515177?text=Hi%20EKM%20Installation%20and%20Maintenance!%20I%20would%20like%20a%20free%20solar%20quote%20and%20consultation.',
  email: 'info@ekminstallations.co.za',
  address: 'South Africa',
  serviceAreas: ['Gauteng (Johannesburg, Pretoria, Centurion)', 'Limpopo', 'Mpumalanga', 'North West', 'National Commercial Deployments'],
  hours: 'Mon - Fri: 07:30 - 17:30 | Sat: 08:00 - 14:00 | 24/7 Emergency Support',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=EKM%20INSTALLATION%20AND%20MAINTENANCE&query_place_id=ChIJZQRyqkGr9x4RkXnQda8Gd0I',
  googlePlaceId: 'ChIJZQRyqkGr9x4RkXnQda8Gd0I',
  stats: [
    { value: '100%', label: 'Load-Shedding Defense', sub: 'Zero-Flicker Sub-20ms Transfer' },
    { value: '25 Yrs', label: 'PV Yield Warranty', sub: 'Tier-1 N-Type TOPCon Cells' },
    { value: 'SANS', label: '10142-1 Certified CoC', sub: 'Dept of Labour Accredited' },
    { value: '3.8 Yrs', label: 'Average Payback', sub: 'Significant Eskom Bill Reduction' },
  ],
  certifications: [
    'Department of Labour Registered Electrical Contractor',
    'SANS 10142-1 Wiring Code Master Compliance',
    'PV GreenCard Certified Solar Engineers',
    'SAPVIA Approved Installation Best Practices',
    'Occupational Health & Safety (OHS) Compliant Racking',
  ],
  brands: [
    { name: 'Sunsynk', type: 'Hybrid Inverters & Smart Paralleling' },
    { name: 'Deye', type: 'Single & 3-Phase Industrial Inverters' },
    { name: 'Canadian Solar', type: 'Tier-1 Bifacial N-Type Modules' },
    { name: 'JA Solar', type: 'High Irradiance Monocrystalline' },
    { name: 'Freedom Won', type: 'Industrial LiFePO4 Energy Storage' },
    { name: 'Hubble Energy', type: 'Cloud-Monitored Lithium Batteries' },
    { name: 'Victron Energy', type: 'Off-Grid Agricultural MPPT Solutions' },
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'residential-solar',
    title: 'Turnkey Residential Solar & Battery Storage',
    shortDesc: 'End load-shedding permanently with custom 5kW to 16kW hybrid solar setups engineered for modern South African homes.',
    fullDesc: 'Tailored residential solar systems that power high-drain domestic appliances including geysers, air conditioners, pool pumps, and home offices. Integrated with ultra-durable LiFePO4 lithium batteries and intelligent peak-shaving inverters that switch over in under 20 milliseconds when Eskom fails.',
    iconName: 'Sun',
    badge: 'Most Popular',
    startingFrom: 'R85,000',
    idealFor: 'Suburban homes, townhouses, and luxury estates seeking 24/7 power autonomy.',
    features: [
      'Sub-20ms uninterruptible power supply (UPS) transfer — zero TV or PC reboots',
      'Dual MPPT string optimization for complex multi-pitch roof angles',
      'Mobile app telemetry for live solar generation, battery SOC, and grid savings',
      'Full legal SANS 10142-1 Electrical Certificate of Compliance (CoC) included',
    ],
    specs: [
      { label: 'Inverter Capacity', value: '5kW - 16kW Sunsynk / Deye' },
      { label: 'Battery Chemistry', value: 'LiFePO4 Lithium (6,000+ cycles)' },
      { label: 'Panel Tech', value: '550W+ Tier-1 Monocrystalline' },
      { label: 'Warranty', value: '10 Yrs Battery & Inverter / 25 Yrs PV' }
    ]
  },
  {
    id: 'commercial-solar',
    title: 'Commercial & Industrial Solar Plants',
    shortDesc: 'Drastically slash daytime operating overheads for factories, warehouses, retail centers, and agricultural packhouses.',
    fullDesc: 'Three-phase commercial photovoltaic engineering from 20kW to 250kW+. Designed to hedge against steep municipal tariff escalations, carbon taxes, and production downtime caused by regional substations or national grid instability.',
    iconName: 'Building2',
    badge: 'High ROI',
    startingFrom: 'R240,000',
    idealFor: 'Manufacturing plants, retail centers, office parks, and cold-storage agricultural operations.',
    features: [
      'Maximum demand peak-shaving to eliminate heavy municipal peak charges',
      'Synchronized diesel generator integration for optimized hybrid fuel savings',
      'Cloud SCADA monitoring with automated fault alerting and remote maintenance',
      'Tax-efficient section 12B depreciation consultation readiness',
    ],
    specs: [
      { label: 'Output Phase', value: 'Three-Phase 400V Industrial' },
      { label: 'Array Scalability', value: 'Modular up to 500kWp' },
      { label: 'Monitoring', value: '24/7 Cloud Telemetry & SCADA' },
      { label: 'Payback Horizon', value: '2.8 to 4.2 Years' }
    ]
  },
  {
    id: 'sans-coc-compliance',
    title: 'SANS 10142-1 Electrical CoC Compliance',
    shortDesc: 'Department of Labour certified inspections, sub-board segregation, lightning surge protection, and legal compliance.',
    fullDesc: 'Do not compromise your home or commercial insurance. Our registered electricians execute rigorous insulation resistance testing, loop impedance verification, earth-leakage calibration, and issue certified Electrical Certificates of Compliance (CoC).',
    iconName: 'ShieldCheck',
    badge: 'Legal Essential',
    startingFrom: 'R2,500',
    idealFor: 'Property sales, insurance updates, new solar installations, and commercial safety audits.',
    features: [
      'Official Department of Labour registered Master Electrician sign-off',
      'Complete distribution board rewiring and phase load re-balancing',
      'Class I+II Type 2 lightning surge arrestors installed to protect sensitive electronics',
      'Guaranteed compliance for building insurance and municipal SSEG registration',
    ],
    specs: [
      { label: 'Standards', value: 'SANS 10142-1 Edition 3' },
      { label: 'Accreditation', value: 'Dept of Labour & ECA(SA)' },
      { label: 'Surge Rating', value: '40kA Type 1+2 Arrestors' },
      { label: 'Turnaround', value: '24 - 48 Hours' }
    ]
  },
  {
    id: 'maintenance-audits',
    title: 'Preventative Maintenance & Thermal Audits',
    shortDesc: 'Thermal drone scans, junction box tightening, string optimization, and de-ionized solar panel detailing.',
    fullDesc: 'Dust, soot, and micro-cracks degrade PV generation by up to 25% across South African seasons. Our technicians perform high-pressure de-ionized glass cleaning, thermal infrared hotspot audits to prevent cell burn-outs, and firmware updates.',
    iconName: 'Wrench',
    badge: 'Performance Boost',
    startingFrom: 'R1,800',
    idealFor: 'Existing solar installations yielding lower than expected returns.',
    features: [
      'High-resolution infrared thermal imaging to identify failing bypass diodes',
      'De-ionized spot-free solar panel wash that eliminates calcium film and bird waste',
      'Torque testing on all DC isolators, breakers, and MC4 weather seals',
      'Battery cell internal impedance balancing for extended lithium lifespan',
    ],
    specs: [
      { label: 'Yield Restoration', value: '+12% to +28% generation' },
      { label: 'Cleaning Medium', value: '0-PPM Purified De-ionized Water' },
      { label: 'Thermal Report', value: 'Full PDF Hotspot Audit Sheet' },
      { label: 'Frequency', value: 'Bi-Annual or Quarterly Contracts' }
    ]
  },
  {
    id: 'solar-carports-civil',
    title: 'Solar Carports & Sustainable Civil Works',
    shortDesc: 'Engineered structural steel shade ports, roof reinforcement, underground cable trenching, and civil infrastructure.',
    fullDesc: 'Transform unused parking bays into revenue-generating, shaded clean-power generation assets. We manufacture galvanized steel solar canopies capable of resisting coastal winds and high-altitude Highveld hail storms.',
    iconName: 'Hammer',
    badge: 'Dual Purpose',
    startingFrom: 'R65,000',
    idealFor: 'Corporate car parks, shopping plazas, residential driveways, and agricultural sites.',
    features: [
      'Structural engineer sign-off on wind-load and foundation depth',
      'Heavy-duty hot-dip galvanized or powder-coated high-yield steel frames',
      'Integrated water guttering and concealed cable wireways',
      'Electric Vehicle (EV) fast-charger integration ready',
    ],
    specs: [
      { label: 'Bay Capacity', value: '2 to 100+ Covered Vehicles' },
      { label: 'Steel Grade', value: 'High-Tensile S355 Structural' },
      { label: 'Wind Resistance', value: 'Up to 140 km/h gusts' },
      { label: 'Hail Defense', value: 'Class 4 Impact Certified' }
    ]
  },
  {
    id: 'emergency-backup-ats',
    title: 'Automatic Changeover (ATS) & Generator Sync',
    shortDesc: 'Automated transfer switching for continuous business continuity when municipal grids fail.',
    fullDesc: 'Never lift a manual lever in the dark again. We install smart Automatic Transfer Switches (ATS) with phase-sensing relays that coordinate solar inverters, lithium batteries, and standby diesel generators seamlessly.',
    iconName: 'Zap',
    badge: 'Zero Downtime',
    startingFrom: 'R12,500',
    idealFor: 'Medical clinics, IT data centers, restaurants, petrol stations, and private residences.',
    features: [
      'Instantaneous utility loss detection with auto-crank signal to generators',
      'Programmable generator run-time limits to slash expensive diesel consumption',
      'Dual-interlock mechanical protection to prevent dangerous grid back-feeding',
      'Audio-visual trip indicators and mobile alert status',
    ],
    specs: [
      { label: 'Switch Time', value: '<20 Milliseconds' },
      { label: 'Interlock Type', value: 'Electromechanical + Digital' },
      { label: 'Compatibility', value: 'All major generator & inverter brands' },
      { label: 'Safety', value: 'SANS 60947-6-1 Certified' }
    ]
  }
];

export const LOAD_SHEDDING_MATRIX = [
  {
    stage: 'Stage 1 - 2',
    hoursOff: '2 - 4 Hours / Day',
    ekmSurvival: '100% Seamless Power',
    appliances: [
      { name: 'Wi-Fi & Fibre Routers', status: 'Active 24/7' },
      { name: 'LED Lighting & Security Beams', status: 'Active 24/7' },
      { name: 'Home Office & TV/Entertainment', status: 'Active 24/7' },
      { name: 'Refrigerators & Freezers', status: 'Active 24/7' },
    ],
    recommendedSystem: '5kW Hybrid Inverter + 5.12kWh LiFePO4'
  },
  {
    stage: 'Stage 3 - 4',
    hoursOff: '4 - 8 Hours / Day',
    ekmSurvival: 'Complete Autonomy',
    appliances: [
      { name: 'All Stage 1-2 Essentials', status: 'Active 24/7' },
      { name: 'Microwave & Induction Hobs', status: 'Fully Supported' },
      { name: 'Borehole & Booster Pumps', status: 'Automated Cycles' },
      { name: 'Security Electric Fence & CCTV', status: '100% Protected' },
    ],
    recommendedSystem: '8kW Hybrid Inverter + 10.24kWh LiFePO4 + 8x 550W Panels'
  },
  {
    stage: 'Stage 5 - 6',
    hoursOff: '8 - 12 Hours / Day',
    ekmSurvival: 'Uninterrupted Operations',
    appliances: [
      { name: 'Full Household Circuitry', status: 'Active 24/7' },
      { name: 'Multiple Air Conditioners (Inverter type)', status: 'Daytime & Evening Run' },
      { name: 'Solar Geyser Smart Controller', status: 'Solar Divert Mode' },
      { name: 'Commercial POS & Refrigeration Racks', status: 'Zero Business Interruption' },
    ],
    recommendedSystem: '10kW - 12kW Inverter + 15.36kWh LiFePO4 + 14x 550W Panels'
  },
  {
    stage: 'Stage 7 - 8 / Total Grid Collapse',
    hoursOff: '12 - 16+ Hours / Day',
    ekmSurvival: '100% Island Off-Grid Self-Sufficiency',
    appliances: [
      { name: 'Full Off-Grid Living & Commercial Operation', status: 'Indefinitely Sustained' },
      { name: 'Heavy Machinery / Three-Phase Loads', status: 'Parallel Inverter Output' },
      { name: 'Automated Solar Water Heating & Pumps', status: 'Pure Sun Powered' },
      { name: 'Auto-Start Generator Backup Integration', status: 'Zero Fuel Waste' },
    ],
    recommendedSystem: '16kW+ Three-Phase Inverter + 20kWh-30kWh Lithium + 20x 550W Panels'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Midrand Executive Estate Hybrid Installation',
    category: 'Residential',
    location: 'Midrand, Gauteng',
    systemSize: '12kWp Solar PV Array',
    inverter: '2x 8kW Sunsynk Inverters in Parallel',
    storage: '20.48kWh Freedom Won LiFePO4 Rack',
    completionTime: '3 Days',
    annualSavingsZAR: 'R46,800 / Year',
    image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80',
    description: 'Complete energy independence for an executive double-story residence. Engineered with split essential and non-essential distribution boards, powering ducted air conditioning, borehole filtration, and full entertainment systems through all load-shedding stages.',
    highlights: [
      'Sub-20ms transfer protects home servers & medical equipment',
      'Tile roof bracket mounts with zero roof penetration leaks',
      'Full SANS 10142-1 CoC issued on day 3'
    ]
  },
  {
    id: 'proj-2',
    title: 'Commercial Distribution Centre Rooftop Plant',
    category: 'Commercial',
    location: 'Industrial Park, Gauteng',
    systemSize: '88kWp Commercial PV Plant',
    inverter: '2x 50kW Deye Three-Phase Inverters',
    storage: '60kWh Industrial Lithium Storage Vault',
    completionTime: '12 Days',
    annualSavingsZAR: 'R318,000 / Year',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed to eliminate staggering peak-demand municipal charges for a logistics warehouse running automated conveyor systems and 24-hour cold storage rooms.',
    highlights: [
      'Integrated with existing 150kVA standby diesel generator to slash fuel consumption by 72%',
      'Structural IBR roof clamp mounting with lightning protection grounding',
      'Real-time cloud SCADA dashboard monitored by facility managers'
    ]
  },
  {
    id: 'proj-3',
    title: 'Solar Carport & Fleet Charging Hub',
    category: 'Maintenance',
    location: 'Corporate Park, Centurion',
    systemSize: '36kWp Solar Shade Canopy',
    inverter: '30kW Sunsynk Three-Phase Hybrid',
    storage: '30kWh Hubble Lithium Storage',
    completionTime: '8 Days',
    annualSavingsZAR: 'R112,000 / Year',
    image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=80',
    description: 'Turnkey structural engineering project creating 12 shaded parking bays with integrated 22kW EV charging pedestals and commercial building backfeed.',
    highlights: [
      'High-tensile hot-dip galvanized steel engineered for 130 km/h wind loads',
      'Underground cable trenching with zero surface disruption',
      'Powers company office IT during day, recharges delivery fleet at night'
    ]
  },
  {
    id: 'proj-4',
    title: 'Agricultural Off-Grid Solar Borehole & Irrigation',
    category: 'Agricultural',
    location: 'Limpopo Agricultural Belt',
    systemSize: '24kWp Heavy-Duty Solar Array',
    inverter: '15kW Victron Energy Off-Grid Tri-Phase',
    storage: '30kWh Freedom Won LiFePO4',
    completionTime: '5 Days',
    annualSavingsZAR: 'R88,500 / Year (Saved Diesel)',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1200&q=80',
    description: 'Pure off-grid solar pumping installation operating three 7.5kW submersible borehole pumps and automated drip irrigation for citrus farming.',
    highlights: [
      'Eliminated monthly diesel delivery dependencies for rural farming',
      'Ground-mount galvanized racking angled for maximum winter & summer irradiation',
      'Remotely monitored via satellite Starlink telemetry'
    ]
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Francois van der Merwe',
    role: 'Homeowner',
    location: 'Centurion',
    rating: 5,
    date: '2 Weeks ago',
    comment: 'EKM Installation and Maintenance did an immaculate job. The cabling is neatly trunked, the Deye 8kW inverter runs completely silent, and we did not even notice Stage 6 load-shedding happening. Their team is polite, punctual, and delivered our SANS CoC certificate without any delay.',
    system: '8kW Hybrid + 10.24kWh Lithium + 10x 550W Panels',
    verified: true
  },
  {
    id: 'test-2',
    name: 'Dr. Zanele Khumalo',
    role: 'Medical Clinic Director',
    location: 'Johannesburg',
    rating: 5,
    date: '1 Month ago',
    comment: 'In our practice, sensitive laboratory cooling and diagnostic equipment cannot afford a single millisecond of voltage drop. EKM engineered a dual-inverter system with surge suppression that has kept our facility 100% operational throughout municipal grid trip incidents.',
    system: '16kW Dual Sunsynk + 20kWh Freedom Won LiFePO4',
    verified: true
  },
  {
    id: 'test-3',
    name: 'Markus Botha',
    role: 'Operations Director, Botha Logistics',
    location: 'Pretoria East',
    rating: 5,
    date: '2 Months ago',
    comment: 'Our commercial electricity bill dropped from R38,000/month to under R11,000/month in the first 60 days. The return on investment is undeniable. EKM handled everything from the structural roof calculations to the council compliance paperwork.',
    system: '50kW Deye Commercial Plant + 40kWh Storage',
    verified: true
  }
];

export const FAQS = [
  {
    q: 'Why is an Electrical Certificate of Compliance (CoC) compulsory in South Africa?',
    a: 'According to SANS 10142-1 and Department of Labour regulations, any solar or battery system connected to your home’s wiring requires a registered Master Electrician CoC. Without it, your homeowner insurance can reject claims in the event of a fire or lightning surge, and municipalities can fine or disconnect non-compliant installations.'
  },
  {
    q: 'How does EKM ensure zero reboot of computers and televisions during load-shedding?',
    a: 'We install premium hybrid inverters (Sunsynk / Deye) equipped with high-speed automated transfer relays operating at sub-20 milliseconds. This transfer speed is faster than the internal power supply capacitors of PCs, TVs, Wi-Fi routers, and medical machines, so you experience zero interruption.'
  },
  {
    q: 'What is the lifespan of Tier-1 solar panels and LiFePO4 batteries?',
    a: 'Our Tier-1 N-Type TOPCon solar panels carry a 25-year linear performance warranty (guaranteeing >84% production after a quarter century). The LiFePO4 (Lithium Iron Phosphate) battery banks are rated for 6,000+ daily charge cycles at 90% Depth of Discharge, which translates to 15+ years of daily defense against load-shedding.'
  },
  {
    q: 'Can EKM service or upgrade an existing solar system installed by another company?',
    a: 'Yes. A substantial portion of our maintenance division specializes in troubleshooting underperforming third-party setups, rectifying illegal wiring, upgrading lead-acid batteries to lithium, tightening loose DC isolators, and providing certified CoC sign-offs.'
  },
  {
    q: 'How fast can EKM install a residential solar backup system?',
    a: 'Standard residential installations (5kW to 10kW) are typically completed in 2 to 3 business days, including panel mounting, inverter cabling, DB board segregation, testing, and full homeowner app setup.'
  }
];
