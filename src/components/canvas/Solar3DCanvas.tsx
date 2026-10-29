import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, Compass, Zap, RotateCcw, Activity, ShieldCheck, BatteryCharging } from 'lucide-react';

interface SunPreset {
  name: string;
  time: string;
  azimuth: number; // angle in radians
  elevation: number; // elevation angle in radians
  intensity: number;
  color: number;
  watts: number;
  efficiency: number;
}

const SUN_PRESETS: SunPreset[] = [
  {
    name: 'Morning Sun',
    time: '08:00 AM',
    azimuth: -Math.PI / 3,
    elevation: Math.PI / 6,
    intensity: 1.8,
    color: 0xffeedd,
    watts: 3850,
    efficiency: 74,
  },
  {
    name: 'Midday Highveld Peak',
    time: '12:30 PM',
    azimuth: 0,
    elevation: Math.PI / 2.2,
    intensity: 2.6,
    color: 0xffffff,
    watts: 6480,
    efficiency: 100,
  },
  {
    name: 'Late Afternoon',
    time: '04:15 PM',
    azimuth: Math.PI / 3.4,
    elevation: Math.PI / 4.2,
    intensity: 1.9,
    color: 0xfff0dd,
    watts: 4620,
    efficiency: 82,
  },
  {
    name: 'Eskom Load-Shedding Night',
    time: '08:00 PM',
    azimuth: Math.PI / 1.8,
    elevation: 0.1,
    intensity: 0.35,
    color: 0x93c5fd,
    watts: 0,
    efficiency: 0,
  },
];

interface Hotspot {
  id: string;
  label: string;
  sub: string;
  position: [number, number, number];
  color: string;
  detail: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'panels',
    label: 'Tier-1 Bifacial Solar Array',
    sub: '550W+ Monocrystalline N-Type TOPCon',
    position: [0, 1.4, 0.4],
    color: '#f59e0b',
    detail: 'High-temperature coefficient engineered for South African UV irradiance. 25-year linear performance warranty.'
  },
  {
    id: 'inverter',
    label: 'Sunsynk / Deye Hybrid Inverter',
    sub: 'Sub-20ms Transfer UPS Changeover',
    position: [-2.1, 0.5, -0.6],
    color: '#0284c7',
    detail: 'Seamlessly blends solar, battery, and Eskom power. Instant zero-flicker changeover during load-shedding.'
  },
  {
    id: 'battery',
    label: 'LiFePO4 Lithium Storage Wall',
    sub: '6,000+ Cycles @ 90% DoD',
    position: [-2.1, -0.4, -0.6],
    color: '#10b981',
    detail: 'Non-combustible lithium iron phosphate chemistry. 10-year full manufacturer warranty protecting your home 24/7.'
  },
  {
    id: 'db',
    label: 'SANS 10142-1 Certified DB',
    sub: 'Class I+II Lightning Surge Protection',
    position: [-1.4, 0.4, -1.2],
    color: '#6366f1',
    detail: 'Segregated essential and non-essential circuits with Department of Labour accredited Master Electrician CoC.'
  }
];

export const Solar3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(1);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [liveWatts, setLiveWatts] = useState<number>(SUN_PRESETS[1].watts);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const sunSphereRef = useRef<THREE.Mesh | null>(null);
  const solarGroupRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.45 });
  const targetCameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(3.8, 2.8, 4.4));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf8fafc); // Crisp light theme background
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.045);

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(3.8, 2.8, 4.4);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.7);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 25;
    sunLight.shadow.camera.left = -6;
    sunLight.shadow.camera.right = 6;
    sunLight.shadow.camera.top = 6;
    sunLight.shadow.camera.bottom = -6;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);
    sunLightRef.current = sunLight;

    // Sun Visual Sphere
    const sunGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const sunSphere = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunSphere);
    sunSphereRef.current = sunSphere;

    // Architectural Ground Grid / Deck
    const groundGeo = new THREE.PlaneGeometry(30, 30);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle architectural grid on ground
    const gridHelper = new THREE.GridHelper(24, 24, 0xd97706, 0xe2e8f0);
    gridHelper.position.y = -1.19;
    scene.add(gridHelper);

    // Main Solar Array & Structure Group
    const rootGroup = new THREE.Group();
    solarGroupRef.current = rootGroup;
    scene.add(rootGroup);

    // Modern Architectural Roof Platform
    const roofBaseGeo = new THREE.BoxGeometry(4.6, 0.3, 3.4);
    const roofBaseMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
      metalness: 0.1,
    });
    const roofBase = new THREE.Mesh(roofBaseGeo, roofBaseMat);
    roofBase.position.set(0, -0.65, 0);
    roofBase.receiveShadow = true;
    roofBase.castShadow = true;
    rootGroup.add(roofBase);

    // Structural Aluminum Support Racking (Pitched at ~25 degrees for South African solar optimum)
    const rackTilt = THREE.MathUtils.degToRad(24);
    const rackGroup = new THREE.Group();
    rackGroup.rotation.x = -rackTilt;
    rackGroup.position.set(0, 0.1, 0);
    rootGroup.add(rackGroup);

    // Mounting Strut Rails (Silver Anodized Aluminum)
    const railMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.85,
      roughness: 0.25,
    });
    for (let r = -1.8; r <= 1.8; r += 1.2) {
      const railGeo = new THREE.BoxGeometry(0.06, 0.08, 2.8);
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(r, -0.06, 0);
      rail.castShadow = true;
      rackGroup.add(rail);
    }

    // Solar PV Panels (4x2 Matrix of High-Efficiency Bifacial Modules)
    const panelWidth = 0.95;
    const panelLength = 1.35;
    const panelThickness = 0.04;
    const frameThickness = 0.025;

    // Photovoltaic Silicon Material (Deep crystalline navy with subtle iridescence)
    const cellMat = new THREE.MeshStandardMaterial({
      color: 0x0f2b48,
      roughness: 0.15,
      metalness: 0.7,
    });

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });

    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        const panelGroup = new THREE.Group();
        const posX = (col - 1.5) * (panelWidth + 0.06);
        const posZ = (row - 0.5) * (panelLength + 0.06);

        // Frame
        const frameGeo = new THREE.BoxGeometry(panelWidth, panelThickness, panelLength);
        const frame = new THREE.Mesh(frameGeo, frameMat);
        frame.castShadow = true;
        frame.receiveShadow = true;
        panelGroup.add(frame);

        // Active PV Cell Face
        const cellGeo = new THREE.PlaneGeometry(panelWidth - frameThickness * 2, panelLength - frameThickness * 2);
        const cell = new THREE.Mesh(cellGeo, cellMat);
        cell.rotation.x = -Math.PI / 2;
        cell.position.y = panelThickness / 2 + 0.002;
        cell.receiveShadow = true;
        panelGroup.add(cell);

        // Silver Busbar lines across cell
        const busbarMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8 });
        for (let b = -0.35; b <= 0.35; b += 0.23) {
          const busGeo = new THREE.PlaneGeometry(0.008, panelLength - frameThickness * 2.2);
          const bus = new THREE.Mesh(busGeo, busbarMat);
          bus.rotation.x = -Math.PI / 2;
          bus.position.set(b, panelThickness / 2 + 0.003, 0);
          panelGroup.add(bus);
        }

        panelGroup.position.set(posX, 0, posZ);
        rackGroup.add(panelGroup);
      }
    }

    // Modern Equipment Enclosure (Hybrid Inverter + LiFePO4 Wall + SANS DB Board)
    const equipWallGeo = new THREE.BoxGeometry(0.15, 1.8, 1.4);
    const equipWallMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
    const equipWall = new THREE.Mesh(equipWallGeo, equipWallMat);
    equipWall.position.set(-2.1, 0, -0.6);
    equipWall.castShadow = true;
    equipWall.receiveShadow = true;
    rootGroup.add(equipWall);

    // Hybrid Inverter (Sunsynk / Deye design: crisp white body, digital screen, amber LED indicator)
    const inverterGeo = new THREE.BoxGeometry(0.18, 0.65, 0.45);
    const inverterMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.3, roughness: 0.2 });
    const inverter = new THREE.Mesh(inverterGeo, inverterMat);
    inverter.position.set(-2.0, 0.45, -0.6);
    inverter.castShadow = true;
    rootGroup.add(inverter);

    // Inverter LCD Screen
    const screenGeo = new THREE.PlaneGeometry(0.2, 0.12);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.rotation.y = Math.PI / 2;
    screen.position.set(-1.905, 0.52, -0.6);
    rootGroup.add(screen);

    // LiFePO4 Lithium Battery Wall (Sleek rack battery with green power LEDs)
    const batteryGeo = new THREE.BoxGeometry(0.2, 0.6, 0.48);
    const batteryMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5, roughness: 0.3 });
    const battery = new THREE.Mesh(batteryGeo, batteryMat);
    battery.position.set(-2.0, -0.35, -0.6);
    battery.castShadow = true;
    rootGroup.add(battery);

    // Battery LED State of Charge Bar
    const ledBarGeo = new THREE.PlaneGeometry(0.015, 0.35);
    const ledBarMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const ledBar = new THREE.Mesh(ledBarGeo, ledBarMat);
    ledBar.rotation.y = Math.PI / 2;
    ledBar.position.set(-1.895, -0.35, -0.6);
    rootGroup.add(ledBar);

    // SANS 10142-1 Compliant Distribution Board
    const dbGeo = new THREE.BoxGeometry(0.14, 0.45, 0.35);
    const dbMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.6, roughness: 0.3 });
    const db = new THREE.Mesh(dbGeo, dbMat);
    db.position.set(-1.4, 0.35, -1.2);
    db.castShadow = true;
    rootGroup.add(db);

    // Interactive mouse controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      setIsInteracting(true);
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(
        0.05,
        Math.min(Math.PI / 2.3, targetRotationRef.current.x + deltaY * 0.008)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    // Touch controls
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        setIsInteracting(true);
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x = Math.max(
        0.05,
        Math.min(Math.PI / 2.3, targetRotationRef.current.x + deltaY * 0.008)
      );

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      setTimeout(() => setIsInteracting(false), 2000);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const onResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Slow auto rotate when not interacting
      if (autoRotate && !isDraggingRef.current && !activeHotspot) {
        targetRotationRef.current.y += delta * 0.12;
      }

      // Smooth camera orbit
      const radius = 5.8;
      const camX = radius * Math.sin(targetRotationRef.current.y) * Math.cos(targetRotationRef.current.x);
      const camY = radius * Math.sin(targetRotationRef.current.x) + 0.8;
      const camZ = radius * Math.cos(targetRotationRef.current.y) * Math.cos(targetRotationRef.current.x);

      camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.08);
      camera.lookAt(0, 0.2, 0);

      // Subtle float on solar panels
      if (rackGroup) {
        rackGroup.position.y = 0.1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Sun Preset Lighting
  useEffect(() => {
    const preset = SUN_PRESETS[selectedPresetIndex];
    if (!sunLightRef.current || !sunSphereRef.current) return;

    setLiveWatts(preset.watts);

    const distance = 8.5;
    const x = distance * Math.cos(preset.elevation) * Math.sin(preset.azimuth);
    const y = Math.max(0.4, distance * Math.sin(preset.elevation));
    const z = distance * Math.cos(preset.elevation) * Math.cos(preset.azimuth);

    sunLightRef.current.position.set(x, y, z);
    sunLightRef.current.intensity = preset.intensity;
    sunLightRef.current.color.setHex(preset.color);

    sunSphereRef.current.position.set(x * 0.85, y * 0.85, z * 0.85);
    (sunSphereRef.current.material as THREE.MeshBasicMaterial).color.setHex(preset.color);
  }, [selectedPresetIndex]);

  const handleHotspotClick = (hotspot: Hotspot) => {
    setActiveHotspot(hotspot);
    setAutoRotate(false);

    // Look at hotspot angle
    const [hx, hy, hz] = hotspot.position;
    const targetAngle = Math.atan2(hx, hz);
    targetRotationRef.current.y = targetAngle + 0.3;
    targetRotationRef.current.x = 0.3;
  };

  const resetCamera = () => {
    setActiveHotspot(null);
    targetRotationRef.current = { x: 0.35, y: -0.45 };
    setAutoRotate(true);
  };

  const currentPreset = SUN_PRESETS[selectedPresetIndex];

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-50/60 via-amber-50/30 to-white border border-slate-200/80 shadow-xl shadow-slate-200/40">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD: South Africa Sun Arc Controller */}
      <div className="absolute top-4 left-4 right-4 md:right-auto md:max-w-md z-10">
        <div className="glass-card-light rounded-2xl p-4 border border-slate-200/90 shadow-lg backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <Sun className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">3D Irradiance Simulator</h4>
                <p className="text-sm font-extrabold text-slate-900">{currentPreset.name}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 border border-amber-200">
                <Activity className="w-3 h-3 animate-pulse" />
                {currentPreset.time}
              </span>
            </div>
          </div>

          {/* Time Selector Pills */}
          <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-slate-100">
            {SUN_PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => setSelectedPresetIndex(idx)}
                className={`py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-all text-center ${
                  selectedPresetIndex === idx
                    ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {preset.time.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Telemetry Card: Watts & Efficiency */}
      <div className="absolute bottom-4 left-4 z-10 hidden sm:block">
        <div className="glass-card-light rounded-2xl p-4 border border-slate-200/90 shadow-lg backdrop-blur-md flex items-center gap-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Simulated Generation
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {liveWatts.toLocaleString()} <span className="text-xs font-bold text-slate-500">Watts</span>
            </div>
          </div>

          <div className="h-9 w-px bg-slate-200" />

          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
              Array Efficiency
            </div>
            <div className="text-2xl font-black text-emerald-600 tracking-tight">
              {currentPreset.efficiency}%
            </div>
          </div>
        </div>
      </div>

      {/* View Controls & Reset Button */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
            autoRotate
              ? 'bg-slate-900 text-white'
              : 'glass-card-light text-slate-700 hover:bg-white'
          }`}
          title="Toggle Auto-Rotate"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{autoRotate ? 'Auto Orbiting' : 'Orbit Paused'}</span>
        </button>

        <button
          onClick={resetCamera}
          className="p-2 rounded-xl glass-card-light text-slate-700 hover:text-amber-600 hover:bg-white transition-all shadow-sm"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive 3D Hotspot Buttons on Canvas */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-wrap justify-end gap-1.5 max-w-xs sm:max-w-md">
        {HOTSPOTS.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => handleHotspotClick(hotspot)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
              activeHotspot?.id === hotspot.id
                ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                : 'glass-card-light text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hotspot.color }}
            />
            {hotspot.label.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Active Hotspot Modal Detail Card */}
      {activeHotspot && (
        <div className="absolute inset-x-4 bottom-20 sm:bottom-24 sm:left-auto sm:right-4 sm:max-w-sm z-20 animate-float">
          <div className="glass-card-light p-4 rounded-2xl border-2 border-amber-400 shadow-xl bg-white/95 backdrop-blur-lg">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full ring-4 ring-amber-100"
                  style={{ backgroundColor: activeHotspot.color }}
                />
                <h5 className="font-extrabold text-sm text-slate-900">{activeHotspot.label}</h5>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <p className="text-xs font-semibold text-amber-600 mb-2">{activeHotspot.sub}</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">{activeHotspot.detail}</p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                SANS 10142-1 Certified
              </span>
              <span>EKM Engineering</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Interaction Hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] font-medium text-slate-400/80 sm:hidden">
        Drag to inspect 3D system
      </div>
    </div>
  );
};
