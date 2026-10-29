import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, Battery, Home, Zap, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';

type GridMode = 'grid_tied' | 'load_shedding' | 'off_grid';

interface ModeInfo {
  id: GridMode;
  name: string;
  badge: string;
  color: string;
  eskomStatus: string;
  solarStatus: string;
  batteryStatus: string;
  homeStatus: string;
  description: string;
}

const MODES: Record<GridMode, ModeInfo> = {
  grid_tied: {
    id: 'grid_tied',
    name: 'Standard Daytime Generation',
    badge: 'Grid Online',
    color: '#0284c7',
    eskomStatus: 'Online (Synchronized)',
    solarStatus: 'Generating 5.8 kW Peak',
    batteryStatus: 'Float Charging (98% SOC)',
    homeStatus: '100% Powered by Free Solar',
    description: 'Solar panels directly power your household appliances while simultaneously keeping your LiFePO4 batteries fully topped up.'
  },
  load_shedding: {
    id: 'load_shedding',
    name: 'Eskom Load-Shedding Active',
    badge: 'Stage 6 Active',
    color: '#d97706',
    eskomStatus: 'Disconnected (0V Grid Blackout)',
    solarStatus: 'Self-Sustaining Array Active',
    batteryStatus: 'Discharging Sub-20ms UPS (88%)',
    homeStatus: 'Zero-Flicker Continuous Power',
    description: 'Eskom grid trips, but the Sunsynk/Deye hybrid inverter executes a sub-20ms island transfer. Your lights, Wi-Fi, refrigeration, and security never shut down.'
  },
  off_grid: {
    id: 'off_grid',
    name: '100% Off-Grid Island Mode',
    badge: 'Zero Eskom Dependence',
    color: '#10b981',
    eskomStatus: 'Permanently Bypassed / None',
    solarStatus: 'High Yield MPPT Solar Direct',
    batteryStatus: 'Deep Cycle Autonomous Bank',
    homeStatus: '100% Self-Sufficient',
    description: 'Complete energy freedom. Ideal for agricultural boreholes, eco-estates, and remote lodges with zero connection to municipal infrastructure.'
  }
};

export const SystemViewer3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<GridMode>('grid_tied');
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const energyRingsRef = useRef<THREE.Group[]>([]);
  const rotationAngleRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfafbfc);

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 3.8, 5.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 8, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const goldPoint = new THREE.PointLight(0xf59e0b, 2.5, 8);
    goldPoint.position.set(0, 1.5, 0);
    scene.add(goldPoint);

    // Root Assembly Group
    const assemblyGroup = new THREE.Group();
    scene.add(assemblyGroup);

    // Centerpiece: Hybrid Inverter Station (The Brain)
    const invGeo = new THREE.BoxGeometry(0.9, 1.2, 0.5);
    const invMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.4,
      roughness: 0.2,
    });
    const inverterMesh = new THREE.Mesh(invGeo, invMat);
    inverterMesh.position.set(0, 0.2, 0);
    inverterMesh.castShadow = true;
    inverterMesh.receiveShadow = true;
    assemblyGroup.add(inverterMesh);

    // Inverter Front Glowing Screen
    const screenGeo = new THREE.PlaneGeometry(0.45, 0.28);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0.35, 0.255);
    assemblyGroup.add(screenMesh);

    // Station Pedestal Floor Disc
    const discGeo = new THREE.CylinderGeometry(2.6, 2.8, 0.15, 48);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.5,
      metalness: 0.1,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.set(0, -0.65, 0);
    disc.receiveShadow = true;
    assemblyGroup.add(disc);

    // Outer Node 1: Solar PV Module Array (Top-Left)
    const solarNodeGroup = new THREE.Group();
    solarNodeGroup.position.set(-1.8, 0.4, -0.8);
    assemblyGroup.add(solarNodeGroup);

    const pvGeo = new THREE.BoxGeometry(0.9, 0.04, 1.2);
    const pvMat = new THREE.MeshStandardMaterial({ color: 0x0f2b48, metalness: 0.7, roughness: 0.2 });
    const pvMesh = new THREE.Mesh(pvGeo, pvMat);
    pvMesh.rotation.x = 0.3;
    pvMesh.rotation.y = 0.2;
    pvMesh.castShadow = true;
    solarNodeGroup.add(pvMesh);

    // Outer Node 2: LiFePO4 Energy Wall (Bottom-Left)
    const battNodeGroup = new THREE.Group();
    battNodeGroup.position.set(-1.7, -0.1, 1.1);
    assemblyGroup.add(battNodeGroup);

    const battGeo = new THREE.BoxGeometry(0.5, 0.9, 0.35);
    const battMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6, roughness: 0.3 });
    const battMesh = new THREE.Mesh(battGeo, battMat);
    battMesh.castShadow = true;
    battNodeGroup.add(battMesh);

    // Outer Node 3: Protected Household (Top-Right)
    const homeNodeGroup = new THREE.Group();
    homeNodeGroup.position.set(1.8, 0.5, -0.7);
    assemblyGroup.add(homeNodeGroup);

    const houseGeo = new THREE.ConeGeometry(0.7, 0.6, 4);
    const houseMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
    const houseRoof = new THREE.Mesh(houseGeo, houseMat);
    houseRoof.rotation.y = Math.PI / 4;
    houseRoof.position.y = 0.4;
    houseRoof.castShadow = true;
    homeNodeGroup.add(houseRoof);

    const houseBaseGeo = new THREE.BoxGeometry(0.75, 0.5, 0.75);
    const houseBase = new THREE.Mesh(houseBaseGeo, houseMat);
    houseBase.castShadow = true;
    homeNodeGroup.add(houseBase);

    // Outer Node 4: Eskom Utility Grid Pylon (Bottom-Right)
    const gridNodeGroup = new THREE.Group();
    gridNodeGroup.position.set(1.8, 0.1, 1.1);
    assemblyGroup.add(gridNodeGroup);

    const pylonGeo = new THREE.CylinderGeometry(0.04, 0.12, 1.1, 8);
    const pylonMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
    const pylon = new THREE.Mesh(pylonGeo, pylonMat);
    pylon.castShadow = true;
    gridNodeGroup.add(pylon);

    // Energy Particle Stream System
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 4;
      particlePos[i * 3 + 1] = Math.random() * 1.5;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 3;

      // Default amber / gold energy
      particleColors[i * 3] = 0.96;
      particleColors[i * 3 + 1] = 0.62;
      particleColors[i * 3 + 2] = 0.04;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    assemblyGroup.add(particles);
    particlesRef.current = particles;

    // Glowing energy rings on connection paths
    const ringGeo = new THREE.TorusGeometry(0.12, 0.02, 16, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    for (let r = 0; r < 4; r++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      assemblyGroup.add(ring);
      energyRingsRef.current.push(assemblyGroup);
    }

    // Resize
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (isRotating) {
        rotationAngleRef.current += 0.005;
        assemblyGroup.rotation.y = Math.sin(rotationAngleRef.current) * 0.4;
      }

      // Animate particles in orbital flows
      const posAttr = particleGeo.attributes.position;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3 + 1] += Math.sin(time * 2 + i) * 0.003;
        posArray[i * 3] += Math.cos(time + i) * 0.002;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const currentMode = MODES[activeMode];

  return (
    <div className="w-full rounded-3xl overflow-hidden glass-card-light border border-slate-200/90 shadow-xl shadow-slate-200/50 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200 mb-2">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            Interactive 3D Power Flow
          </span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            EKM Hybrid Resilience Simulation
          </h3>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            See how our certified hybrid inverters automatically arbitrate solar generation, LiFePO4 battery storage, and municipal power.
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200">
          <button
            onClick={() => setActiveMode('grid_tied')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'grid_tied'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            Normal Grid
          </button>
          <button
            onClick={() => setActiveMode('load_shedding')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeMode === 'load_shedding'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            Load-Shedding Active
          </button>
          <button
            onClick={() => setActiveMode('off_grid')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeMode === 'off_grid'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
            }`}
          >
            100% Off-Grid
          </button>
        </div>
      </div>

      {/* Grid: 3D Scene + Live Telemetry Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* 3D Visualizer Canvas */}
        <div className="lg:col-span-7 relative h-[380px] md:h-[440px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-white border border-slate-200/80">
          <div ref={containerRef} className="w-full h-full" />

          {/* Interactive Badge on Canvas */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shadow-sm text-white"
              style={{ backgroundColor: currentMode.color }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {currentMode.badge}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 text-[11px] font-semibold text-slate-400 bg-white/80 px-2 py-1 rounded-lg">
            Sunsynk / Deye Sub-20ms Core
          </div>
        </div>

        {/* Live System State Indicators */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Sun className="w-4 h-4 text-amber-500" />
                Solar PV Array
              </span>
              <span className="text-xs font-black text-amber-600">N-Type TOPCon</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">{currentMode.solarStatus}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Battery className="w-4 h-4 text-emerald-500" />
                LiFePO4 Storage Vault
              </span>
              <span className="text-xs font-black text-emerald-600">6,000+ Cycles</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">{currentMode.batteryStatus}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Home className="w-4 h-4 text-sky-500" />
                Protected Home Loads
              </span>
              <span className="text-xs font-black text-sky-600">Sub-20ms UPS</span>
            </div>
            <p className="text-sm font-extrabold text-slate-900">{currentMode.homeStatus}</p>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            activeMode === 'load_shedding'
              ? 'bg-amber-50/70 border-amber-300 text-amber-900'
              : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-slate-400" />
                Municipal / Eskom Grid
              </span>
              <span className={`text-xs font-black ${activeMode === 'load_shedding' ? 'text-amber-700' : 'text-slate-600'}`}>
                {activeMode === 'load_shedding' ? 'Load Shedding' : 'National Grid'}
              </span>
            </div>
            <p className="text-sm font-extrabold">{currentMode.eskomStatus}</p>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed px-1">
            {currentMode.description}
          </p>
        </div>
      </div>
    </div>
  );
};
