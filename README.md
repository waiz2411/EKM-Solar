# EKM INSTALLATION AND MAINTENANCE — Official Modern 3D Web Application

> **Precision Solar Generation, Certified Electrical Compliance & Turnkey Infrastructure**  
> Serving Residential, Commercial, Agricultural, and Industrial clients across South Africa.

---

## ⚡ Client & Project Overview

- **Business Name**: EKM INSTALLATION AND MAINTENANCE
- **Direct Phone / WhatsApp**: `+27 84 951 5177` (Local: `084 951 5177`)
- **Verified Google Business Place**: [Google Maps Place ID: `ChIJZQRyqkGr9x4RkXnQda8Gd0I`](https://www.google.com/maps/search/?api=1&query=EKM%20INSTALLATION%20AND%20MAINTENANCE&query_place_id=ChIJZQRyqkGr9x4RkXnQda8Gd0I)
- **Primary Specializations**:
  1. Turnkey Tier-1 Solar PV Installations (5kW to 250kW+)
  2. LiFePO4 Lithium Storage Walls (Sub-20ms UPS Transfer)
  3. Official SANS 10142-1 Electrical Certificate of Compliance (CoC) Audits
  4. Thermal Infrared Drone Scans & De-ionized PV Cleaning
  5. Structural Solar Carports & Heavy-Duty Civil Works
  6. Automatic Generator Transfer Switching (ATS)

---

## 🎨 Design System: Ultra-Modern Light Theme

- **Background Canvas**: Architectural daylight whites (`#FAFBFC`, `#FFFFFF`)
- **Primary Energy Accents**: Radiant Solar Gold (`#F59E0B`, `#D97706`) & Clean Sky Blue (`#0284C7`)
- **Eco / Battery Status**: Emerald Green (`#10B981`)
- **High-Contrast Typography**: Slate Charcoal (`#0F172A`, `#334155`)
- **Elevation**: Frosted glassmorphism (`glass-card-light`) with ambient soft shadows

---

## 🌐 3D Interactive WebGL Modules (Three.js)

1. **`Solar3DCanvas.tsx`**:
   - Real-time 3D solar array with anti-PID tempered crystalline cells and aluminum extrusion racking.
   - Interactive Daylight Arc Controller (Morning, Midday Highveld Peak, Afternoon, Load-Shedding Night).
   - Real-time calculated simulated wattage generator.
   - Interactive 3D component hotspots with smooth camera tweening.
2. **`SystemViewer3D.tsx`**:
   - 3D exploded view of complete hybrid solar system.
   - Real-time mode switching: **Normal Grid**, **Eskom Load Shedding Active**, and **100% Off-Grid Island**.
   - Dynamic particle streams and telemetry indicators.

---

## 📄 Multipage Architecture

| Route | Page | Key Features |
|---|---|---|
| `/` | **Home** | 3D Hero, Dual-Capability Solar/Civil intro, SystemViewer3D, Load-Shedding Defense Matrix, Brands, Testimonials, FAQs |
| `/services` | **Services** | 6 in-depth services, technical spec tables, 5-stage installation & compliance protocol |
| `/calculator` | **Solar Calculator** | South African Rand (ZAR) sizing tool, Eskom bill slider, appliance checklist, 1-click WhatsApp quote |
| `/projects` | **Projects** | Filterable portfolio (Residential, Commercial, Agricultural, Maintenance) with ZAR savings |
| `/about` | **About Us** | Story, Department of Labour accreditation, Master Electricians, 5-Point Quality Guarantee |
| `/contact` | **Contact & Quote** | Interactive questionnaire, direct WhatsApp link, Google Maps card, emergency phone |

---

## 🛠️ Local Development & Build

```bash
# Start development server
npm run dev

# Run TypeScript check and production build
npm run build

# Preview production build locally
npm run preview
```
