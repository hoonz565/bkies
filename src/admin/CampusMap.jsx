import { useState, useEffect, useCallback, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize2, X, Lock, Unlock, Wrench } from 'lucide-react';
import './admin.css';

// ─── MOCK DATA ─────────────────────────────────────────────
const STATIONS = [
  { id: 'S1', name: 'Main Gate (A1)', x: 410, y: 530, capacity: 8 },
  { id: 'S2', name: 'Library (A2)', x: 440, y: 460, capacity: 6 },
  { id: 'S3', name: 'CS Faculty (A3)', x: 640, y: 470, capacity: 8 },
  { id: 'S4', name: 'Auditorium (B4)', x: 270, y: 295, capacity: 6 },
  { id: 'S5', name: 'Canteen 2', x: 240, y: 230, capacity: 6 },
  { id: 'S6', name: 'Environment (B9)', x: 630, y: 345, capacity: 6 },
];

const BIKE_PATHS = [
  [
    { x: 410, y: 530 }, { x: 420, y: 500 }, { x: 430, y: 475 },
    { x: 440, y: 460 }, { x: 480, y: 440 }, { x: 530, y: 440 },
    { x: 580, y: 450 }, { x: 640, y: 470 },
  ],
  [
    { x: 240, y: 230 }, { x: 255, y: 260 }, { x: 270, y: 295 },
    { x: 255, y: 340 }, { x: 235, y: 400 }, { x: 215, y: 460 },
    { x: 200, y: 510 }, { x: 190, y: 545 },
  ],
  [
    { x: 630, y: 345 }, { x: 570, y: 325 }, { x: 500, y: 300 },
    { x: 420, y: 275 }, { x: 360, y: 255 }, { x: 310, y: 240 },
    { x: 270, y: 235 }, { x: 240, y: 230 },
  ],
];

const generateInitialBikes = () => {
  const riders = [
    'Nguyen Van A', 'Tran Thi B', 'Le Van C', 'Pham Thi D',
    'Hoang Van E', 'Vo Thi F', 'Bui Van G', 'Dang Thi H',
  ];
  const bikes = [];
  let bikeIdx = 1;

  STATIONS.forEach((station) => {
    const count = 4 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let status = 'available';
      if (rand > 0.85) status = 'maintenance';
      else if (rand > 0.7) status = 'low-battery';

      bikes.push({
        id: `BK-${String(bikeIdx).padStart(3, '0')}`,
        status,
        battery: status === 'low-battery' ? 5 + Math.floor(Math.random() * 15) : status === 'maintenance' ? 0 : 40 + Math.floor(Math.random() * 60),
        x: station.x + (Math.random() - 0.5) * 20,
        y: station.y + (Math.random() - 0.5) * 20,
        station: station.id,
        rider: null,
        lastMaintenance: '2026-04-' + String(1 + Math.floor(Math.random() * 20)).padStart(2, '0'),
      });
      bikeIdx++;
    }
  });

  const movingCount = 4 + Math.floor(Math.random() * 2);
  for (let i = 0; i < movingCount; i++) {
    const pathIdx = i % BIKE_PATHS.length;
    const path = BIKE_PATHS[pathIdx];
    const startPoint = Math.floor(Math.random() * (path.length - 1));
    bikes.push({
      id: `BK-${String(bikeIdx).padStart(3, '0')}`,
      status: 'in-use',
      battery: 30 + Math.floor(Math.random() * 50),
      x: path[startPoint].x,
      y: path[startPoint].y,
      station: null,
      rider: riders[i % riders.length],
      lastMaintenance: '2026-04-' + String(1 + Math.floor(Math.random() * 15)).padStart(2, '0'),
      pathIdx,
      pathStep: startPoint,
      pathDirection: 1,
    });
    bikeIdx++;
  }
  return bikes;
};

// ─── BUILDING DATA ─────────────────────────────────────────
const BUILDINGS = [
  // A buildings (Orange tones - Administrative/Academic)
  { id: 'A1', label: 'A1', subtitle: 'Rectorate', x: 395, y: 520, w: 60, h: 42, color: '#fb923c', group: 'A' },
  { id: 'A2', label: 'A2', subtitle: 'Library', x: 430, y: 450, w: 50, h: 38, color: '#fb923c', group: 'A' },
  { id: 'A3', label: 'A3', subtitle: 'CS & Eng.', x: 610, y: 455, w: 75, h: 52, color: '#fb923c', group: 'A' },
  { id: 'A4', label: 'A4', subtitle: 'R&D Office', x: 440, y: 360, w: 48, h: 36, color: '#fb923c', group: 'A' },
  { id: 'A5', label: 'A5', subtitle: 'Ext. Relations', x: 388, y: 360, w: 44, h: 36, color: '#fb923c', group: 'A' },

  // B buildings (Blue tones - Faculties)
  { id: 'B1', label: 'B1', subtitle: 'EEE Faculty', x: 185, y: 530, w: 65, h: 42, color: '#60a5fa', group: 'B' },
  { id: 'B2', label: 'B2', subtitle: 'Chemical Eng.', x: 295, y: 530, w: 70, h: 42, color: '#60a5fa', group: 'B' },
  { id: 'B3', label: 'B3', subtitle: 'Post Graduate', x: 195, y: 370, w: 75, h: 48, color: '#60a5fa', group: 'B' },
  { id: 'B4', label: 'B4', subtitle: 'Auditorium', x: 250, y: 285, w: 90, h: 44, color: '#60a5fa', group: 'B' },
  { id: 'B6', label: 'B6', subtitle: 'Civil Eng.', x: 350, y: 235, w: 80, h: 38, color: '#60a5fa', group: 'B' },
  { id: 'B9', label: 'B9', subtitle: 'Environment', x: 610, y: 335, w: 75, h: 50, color: '#60a5fa', group: 'B' },
  { id: 'B11', label: 'B11', subtitle: 'Mech. Eng.', x: 700, y: 265, w: 32, h: 75, color: '#60a5fa', group: 'B' },

  // C buildings (Purple tones)
  { id: 'C1', label: 'C1', subtitle: '', x: 475, y: 170, w: 110, h: 42, color: '#a78bfa', group: 'C' },
  { id: 'C3', label: 'C3', subtitle: 'VNU Lab', x: 680, y: 210, w: 58, h: 38, color: '#a78bfa', group: 'C' },
];

const FACILITIES = [
  { id: 'CAN1', label: 'Canteen 1', shortLabel: '2', x: 237, y: 225, w: 28, h: 22, color: '#fbbf24' },
  { id: 'CAN3', label: 'Canteen 3', shortLabel: '3', x: 672, y: 152, w: 28, h: 22, color: '#fbbf24' },
  { id: 'FAC1', label: 'Refinery', shortLabel: '1', x: 445, y: 165, w: 28, h: 28, color: '#f472b6' },
  { id: 'FAC4', label: 'Food Lab', shortLabel: '4', x: 760, y: 340, w: 28, h: 28, color: '#f472b6' },
];

// Tree positions for realistic greenery
const TREES = [
  // Garden areas
  { x: 170, y: 445, s: 1.2 }, { x: 185, y: 460, s: 1.0 }, { x: 158, y: 458, s: 0.8 },
  { x: 310, y: 465, s: 1.1 }, { x: 325, y: 475, s: 0.9 },
  { x: 350, y: 490, s: 1.0 }, { x: 365, y: 500, s: 0.8 },
  { x: 515, y: 495, s: 1.1 }, { x: 530, y: 505, s: 0.9 },
  { x: 690, y: 500, s: 1.2 }, { x: 705, y: 510, s: 1.0 }, { x: 675, y: 515, s: 0.8 },
  { x: 745, y: 385, s: 0.9 }, { x: 755, y: 400, s: 0.7 },
  { x: 155, y: 490, s: 0.7 },
  // Sports area trees
  { x: 320, y: 430, s: 1.3 }, { x: 345, y: 445, s: 1.1 },
  { x: 155, y: 520, s: 0.8 },
];

// ─── Component ────────────────────────────────────────────
export default function CampusMap() {
  const [bikes, setBikes] = useState(generateInitialBikes);
  const [selectedBike, setSelectedBike] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [filter, setFilter] = useState('all');
  const [searchId, setSearchId] = useState('');
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Animate moving bikes
  useEffect(() => {
    const interval = setInterval(() => {
      setBikes((prev) =>
        prev.map((bike) => {
          if (bike.status !== 'in-use' || bike.pathIdx === undefined) return bike;
          const path = BIKE_PATHS[bike.pathIdx];
          let nextStep = bike.pathStep + bike.pathDirection;
          let newDirection = bike.pathDirection;
          if (nextStep >= path.length) { nextStep = path.length - 2; newDirection = -1; }
          else if (nextStep < 0) { nextStep = 1; newDirection = 1; }
          const target = path[nextStep];
          return { ...bike, x: target.x + (Math.random() - 0.5) * 3, y: target.y + (Math.random() - 0.5) * 3, pathStep: nextStep, pathDirection: newDirection };
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Pan handlers
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest('.bike-marker, .station-marker, .bike-popup')) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  }, [panOffset]);

  const handleMouseMove = useCallback((e) => {
    if (!isPanning) return;
    setPanOffset({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
  }, [isPanning, panStart]);

  const handleMouseUp = useCallback(() => setIsPanning(false), []);

  const statusCounts = bikes.reduce((acc, b) => { acc[b.status] = (acc[b.status] || 0) + 1; acc.total++; return acc; }, { total: 0 });
  const filteredBikes = bikes.filter((b) => {
    if (filter !== 'all' && b.status !== filter) return false;
    if (searchId && !b.id.toLowerCase().includes(searchId.toLowerCase())) return false;
    return true;
  });

  const handleBikeClick = useCallback((bike, e) => { e.stopPropagation(); setSelectedStation(null); setSelectedBike(bike); }, []);
  const handleStationClick = useCallback((station, e) => { e.stopPropagation(); setSelectedBike(null); setSelectedStation(station); }, []);
  const closePanels = useCallback(() => { if (!isPanning) { setSelectedBike(null); setSelectedStation(null); } }, [isPanning]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'in-use': return '#3b82f6';
      case 'low-battery': return '#f59e0b';
      case 'maintenance': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  const bikesAtStation = (stationId) => bikes.filter((b) => b.station === stationId);

  const resetView = () => { setZoom(1); setPanOffset({ x: 0, y: 0 }); };

  // Tree SVG component
  const Tree = ({ x, y, s = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      <circle cx="0" cy="0" r="10" fill="#15803d" opacity="0.4" />
      <circle cx="0" cy="-2" r="7" fill="#16a34a" opacity="0.6" />
      <circle cx="-3" cy="-1" r="5" fill="#22c55e" opacity="0.4" />
      <circle cx="3" cy="-3" r="4" fill="#4ade80" opacity="0.3" />
    </g>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 130px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', flexShrink: 0 }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'white', margin: 0 }}>
          🗺️ Campus Map — Live Tracking
        </h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input className="admin-search-input" placeholder="Search bike ID..." value={searchId} onChange={(e) => setSearchId(e.target.value)} style={{ width: '150px' }} />
          <div className="filter-tabs">
            {['all', 'available', 'in-use', 'low-battery', 'maintenance'].map((f) => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div
        className="campus-map-container"
        ref={containerRef}
        onClick={closePanels}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isPanning ? 'grabbing' : 'grab', overflow: 'hidden', borderRadius: '16px', position: 'relative', background: '#0c1a2e', flex: 1, minHeight: 0 }}
      >
        {/* Stats overlay */}
        <div className="campus-map-stats">
          {[
            { label: 'Total', count: statusCounts.total, color: '#94a3b8' },
            { label: 'Available', count: statusCounts.available || 0, color: '#22c55e' },
            { label: 'In Use', count: statusCounts['in-use'] || 0, color: '#3b82f6' },
            { label: 'Low Battery', count: statusCounts['low-battery'] || 0, color: '#f59e0b' },
            { label: 'Maintenance', count: statusCounts.maintenance || 0, color: '#ef4444' },
          ].map((s) => (
            <div className="map-stat-badge" key={s.label}>
              <div className="map-stat-dot" style={{ background: s.color }} />
              {s.label}: {s.count}
            </div>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="campus-map-controls">
          <button onClick={() => setZoom((z) => Math.min(z + 0.25, 3))} title="Zoom In"><ZoomIn size={16} /></button>
          <button onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))} title="Zoom Out"><ZoomOut size={16} /></button>
          <button onClick={resetView} title="Reset View"><Maximize2 size={16} /></button>
        </div>

        {/* SVG Campus Map */}
        <svg
          viewBox="0 0 900 660"
          className="campus-map-svg"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          style={{
            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.3s ease',
            userSelect: 'none',
            display: 'block',
          }}
        >
          {/* ─── Defs (gradients, filters, patterns) ─── */}
          <defs>
            {/* Campus ground gradient */}
            <linearGradient id="campusGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a3a5c" />
              <stop offset="100%" stopColor="#132d4a" />
            </linearGradient>

            {/* Road gradient */}
            <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
            <linearGradient id="roadGradV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="50%" stopColor="#4b5563" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>

            {/* Street gradients */}
            <linearGradient id="streetGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>

            {/* Building shadow */}
            <filter id="buildingShadow">
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
            </filter>

            {/* Glow effect for stations */}
            <filter id="stationGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Bike glow */}
            <filter id="bikeGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Grass pattern */}
            <pattern id="grassPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#1a3a2a" />
              <circle cx="5" cy="5" r="1" fill="#22543d" opacity="0.3" />
              <circle cx="15" cy="12" r="1" fill="#22543d" opacity="0.3" />
              <circle cx="8" cy="18" r="0.8" fill="#22543d" opacity="0.2" />
            </pattern>

            {/* Sports field pattern */}
            <pattern id="fieldPattern" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect width="16" height="16" fill="#14532d" opacity="0.3" />
              <line x1="0" y1="8" x2="16" y2="8" stroke="#166534" strokeWidth="0.5" opacity="0.2" />
            </pattern>

            {/* Building gradient generators */}
            <linearGradient id="bldgGradOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="bldgGradBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="bldgGradPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* ─── Background ─── */}
          <rect x="0" y="0" width="900" height="660" fill="#0c1a2e" />

          {/* ─── Streets (outside campus) ─── */}
          {/* Ly Thuong Kiet (West) */}
          <rect x="80" y="120" width="40" height="490" rx="2" fill="url(#streetGrad)" />
          <line x1="100" y1="125" x2="100" y2="605" stroke="#4b5563" strokeWidth="1" strokeDasharray="12,8" opacity="0.5" />
          <text x="92" y="410" fill="#9ca3af" fontSize="8" fontWeight="700" letterSpacing="2" transform="rotate(-90, 92, 410)" textAnchor="middle" fontFamily="Inter, sans-serif">
            LÝ THƯỜNG KIỆT
          </text>

          {/* To Hien Thanh (South) */}
          <rect x="120" y="600" width="690" height="40" rx="2" fill="url(#streetGrad)" />
          <line x1="125" y1="620" x2="805" y2="620" stroke="#4b5563" strokeWidth="1" strokeDasharray="12,8" opacity="0.5" />
          <text x="470" y="625" fill="#9ca3af" fontSize="8" fontWeight="700" letterSpacing="2" textAnchor="middle" fontFamily="Inter, sans-serif">
            TÔ HIẾN THÀNH
          </text>

          {/* ─── Campus Boundary ─── */}
          <rect x="120" y="120" width="690" height="480" rx="10" fill="url(#campusGround)" stroke="#2d5a8e" strokeWidth="1.5" />

          {/* Subtle inner glow on campus */}
          <rect x="122" y="122" width="686" height="476" rx="9" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.15" />

          {/* ─── Internal Roads (subtle, realistic) ─── */}
          {/* Main horizontal roads */}
          <rect x="125" y="408" width="680" height="6" rx="3" fill="#263548" opacity="0.7" />
          <rect x="125" y="320" width="680" height="5" rx="2.5" fill="#263548" opacity="0.5" />
          <rect x="125" y="200" width="680" height="4" rx="2" fill="#263548" opacity="0.4" />

          {/* Main vertical roads */}
          <rect x="375" y="125" width="5" height="470" rx="2.5" fill="#263548" opacity="0.5" />
          <rect x="545" y="125" width="5" height="470" rx="2.5" fill="#263548" opacity="0.5" />

          {/* Road center line markings */}
          <line x1="130" y1="411" x2="800" y2="411" stroke="#4b5563" strokeWidth="0.8" strokeDasharray="6,8" opacity="0.3" />
          <line x1="377.5" y1="130" x2="377.5" y2="590" stroke="#4b5563" strokeWidth="0.6" strokeDasharray="6,8" opacity="0.25" />
          <line x1="547.5" y1="130" x2="547.5" y2="590" stroke="#4b5563" strokeWidth="0.6" strokeDasharray="6,8" opacity="0.25" />

          {/* ─── Entrance Markers ─── */}
          {/* West entrance */}
          <g>
            <polygon points="82,430 118,420 118,440" fill="#3b82f6" opacity="0.8" />
            <rect x="85" y="445" width="30" height="12" rx="3" fill="#1e3a5f" />
            <text x="100" y="454" fill="#60a5fa" fontSize="6" fontWeight="700" textAnchor="middle">GATE</text>
          </g>

          {/* South entrances */}
          <g>
            <polygon points="420,638 410,602 430,602" fill="#3b82f6" opacity="0.7" />
            <polygon points="620,638 610,602 630,602" fill="#3b82f6" opacity="0.7" />
          </g>

          {/* ─── Sports Field ─── */}
          <rect x="295" y="430" width="70" height="55" rx="4" fill="url(#fieldPattern)" stroke="#16a34a" strokeWidth="1" opacity="0.5" />
          <line x1="330" y1="432" x2="330" y2="483" stroke="#22c55e" strokeWidth="0.5" opacity="0.3" />
          <circle cx="330" cy="457" r="10" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.3" />

          {/* ─── Trees ─── */}
          {TREES.map((t, i) => <Tree key={`tree-${i}`} x={t.x} y={t.y} s={t.s} />)}

          {/* ─── Buildings ─── */}
          {BUILDINGS.map((bldg) => {
            const gradId = bldg.group === 'A' ? 'bldgGradOrange' : bldg.group === 'B' ? 'bldgGradBlue' : 'bldgGradPurple';
            return (
              <g key={bldg.id} filter="url(#buildingShadow)">
                {/* Building body */}
                <rect
                  x={bldg.x} y={bldg.y} width={bldg.w} height={bldg.h}
                  rx="5" fill={`url(#${gradId})`}
                  stroke={bldg.color} strokeWidth="1.2" opacity="0.95"
                />
                {/* Inner highlight */}
                <rect
                  x={bldg.x + 2} y={bldg.y + 2}
                  width={bldg.w - 4} height={bldg.h * 0.4}
                  rx="3" fill="white" fillOpacity="0.05"
                />
                {/* Building ID */}
                <text
                  x={bldg.x + bldg.w / 2} y={bldg.y + bldg.h / 2 + (bldg.subtitle ? 0 : 4)}
                  fill="white" fontSize="13" fontWeight="800"
                  textAnchor="middle" fontFamily="Inter, sans-serif"
                  style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                >
                  {bldg.label}
                </text>
                {/* Subtitle */}
                {bldg.subtitle && (
                  <text
                    x={bldg.x + bldg.w / 2} y={bldg.y + bldg.h / 2 + 13}
                    fill={bldg.color} fontSize="7" fontWeight="600"
                    textAnchor="middle" fontFamily="Inter, sans-serif"
                    opacity="0.9"
                    style={{ pointerEvents: 'none' }}
                  >
                    {bldg.subtitle}
                  </text>
                )}
              </g>
            );
          })}

          {/* ─── Facilities (Canteens, Labs) ─── */}
          {FACILITIES.map((fac) => (
            <g key={fac.id} filter="url(#buildingShadow)">
              <rect
                x={fac.x} y={fac.y} width={fac.w} height={fac.h}
                rx="4" fill={fac.color} fillOpacity="0.25"
                stroke={fac.color} strokeWidth="1"
              />
              <text
                x={fac.x + fac.w / 2} y={fac.y + fac.h / 2 + 4}
                fill={fac.color} fontSize="11" fontWeight="800"
                textAnchor="middle" fontFamily="Inter, sans-serif"
                style={{ pointerEvents: 'none' }}
              >
                {fac.shortLabel}
              </text>
            </g>
          ))}

          {/* ─── Stations ─── */}
          {STATIONS.map((station) => {
            const stationBikes = bikesAtStation(station.id);
            const available = stationBikes.filter((b) => b.status === 'available').length;
            const isSelected = selectedStation?.id === station.id;
            return (
              <g key={station.id} className="station-marker" onClick={(e) => handleStationClick(station, e)} style={{ cursor: 'pointer' }}>
                {/* Glow ring */}
                <circle cx={station.x} cy={station.y} r="22" fill="none" stroke="#3b82f6" strokeWidth="1" opacity={isSelected ? 0.6 : 0.2}>
                  <animate attributeName="r" values="20;24;20" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values={isSelected ? "0.6;0.2;0.6" : "0.2;0.08;0.2"} dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Station background */}
                <rect
                  x={station.x - 16} y={station.y - 16}
                  width="32" height="32" rx="8"
                  fill="#0f172a" fillOpacity="0.9"
                  stroke={isSelected ? '#60a5fa' : '#3b82f6'}
                  strokeWidth={isSelected ? 2 : 1.2}
                  filter="url(#stationGlow)"
                />

                {/* Station icon (P for parking) */}
                <text x={station.x} y={station.y + 1} fill="#60a5fa" fontSize="16" fontWeight="900" textAnchor="middle" dominantBaseline="middle" fontFamily="Inter, sans-serif">
                  P
                </text>

                {/* Count badge */}
                <rect x={station.x + 10} y={station.y - 22} width="22" height="14" rx="7" fill="#0f172a" stroke="#22c55e" strokeWidth="1" />
                <text x={station.x + 21} y={station.y - 12} fill="#22c55e" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="Inter, sans-serif">
                  {available}
                </text>

                {/* Station name label */}
                <rect x={station.x - 30} y={station.y + 20} width="60" height="13" rx="3" fill="#0f172a" fillOpacity="0.7" />
                <text x={station.x} y={station.y + 29} fill="#94a3b8" fontSize="6.5" fontWeight="600" textAnchor="middle" fontFamily="Inter, sans-serif">
                  {station.name.split('(')[0].trim()}
                </text>
              </g>
            );
          })}

          {/* ─── Bike Markers ─── */}
          {filteredBikes.map((bike) => {
            const color = getStatusColor(bike.status);
            const isSelected = selectedBike?.id === bike.id;
            return (
              <g
                key={bike.id}
                className={`bike-marker ${bike.status}`}
                onClick={(e) => handleBikeClick(bike, e)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer glow for moving bikes */}
                {bike.status === 'in-use' && (
                  <circle cx={bike.x} cy={bike.y} r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3">
                    <animate attributeName="r" values="8;15;8" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Selection ring */}
                {isSelected && (
                  <circle cx={bike.x} cy={bike.y} r="11" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
                )}

                {/* Bike dot with glow */}
                <circle
                  cx={bike.x} cy={bike.y} r="5.5"
                  fill={color}
                  stroke="#0c1a2e" strokeWidth="2"
                  filter="url(#bikeGlow)"
                  style={{ transition: 'cx 2s ease-in-out, cy 2s ease-in-out' }}
                />

                {/* Tiny bike icon inside */}
                <text
                  x={bike.x} y={bike.y + 0.5}
                  fill="white" fontSize="5" fontWeight="900"
                  textAnchor="middle" dominantBaseline="middle"
                  style={{ pointerEvents: 'none' }}
                >
                  🚲
                </text>
              </g>
            );
          })}

          {/* ─── Legend ─── */}
          <g transform="translate(130, 132)">
            <rect x="0" y="0" width="130" height="95" rx="8" fill="#0c1a2e" fillOpacity="0.92" stroke="#1e3a5f" strokeWidth="1" />
            <text x="12" y="17" fill="white" fontSize="9" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="0.5">LEGEND</text>
            <line x1="12" y1="23" x2="118" y2="23" stroke="#1e3a5f" strokeWidth="0.5" />

            {[
              { label: 'Available', color: '#22c55e', y: 35 },
              { label: 'In Use (Moving)', color: '#3b82f6', y: 49 },
              { label: 'Low Battery', color: '#f59e0b', y: 63 },
              { label: 'Maintenance', color: '#ef4444', y: 77 },
            ].map((item) => (
              <g key={item.label}>
                <circle cx="20" cy={item.y} r="4" fill={item.color} filter="url(#bikeGlow)" />
                <text x="30" y={item.y + 3} fill="#cbd5e1" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif">{item.label}</text>
              </g>
            ))}

            {/* Station icon in legend */}
            <rect x="88" y="30" width="16" height="16" rx="4" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
            <text x="96" y="42" fill="#60a5fa" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Inter, sans-serif">P</text>
            <text x="96" y="55" fill="#cbd5e1" fontSize="7" fontWeight="500" textAnchor="middle" fontFamily="Inter, sans-serif">Station</text>
          </g>
        </svg>

        {/* ─── Bike Detail Popup ─── */}
        {selectedBike && (
          <div className="bike-popup" style={{ top: '60px', right: '60px' }} onClick={(e) => e.stopPropagation()}>
            <div className="bike-popup-header">
              <span className="bike-popup-id">🚲 {selectedBike.id}</span>
              <span className="bike-popup-status" style={{ background: `${getStatusColor(selectedBike.status)}22`, color: getStatusColor(selectedBike.status) }}>
                {selectedBike.status.replace('-', ' ')}
              </span>
            </div>
            <div className="bike-popup-row">
              <span className="label">Battery</span>
              <span className="value">
                <span className="battery-bar" style={{ marginRight: '8px' }}>
                  <span className="battery-bar-fill" style={{ width: `${selectedBike.battery}%`, background: selectedBike.battery > 50 ? '#22c55e' : selectedBike.battery > 20 ? '#f59e0b' : '#ef4444' }} />
                </span>
                {selectedBike.battery}%
              </span>
            </div>
            {selectedBike.rider && (
              <div className="bike-popup-row"><span className="label">Rider</span><span className="value">{selectedBike.rider}</span></div>
            )}
            {selectedBike.station && (
              <div className="bike-popup-row"><span className="label">Station</span><span className="value">{STATIONS.find((s) => s.id === selectedBike.station)?.name || selectedBike.station}</span></div>
            )}
            <div className="bike-popup-row"><span className="label">Last Maintenance</span><span className="value">{selectedBike.lastMaintenance}</span></div>
            <div className="bike-popup-actions">
              <button>{selectedBike.status === 'available' ? <><Lock size={12} /> Lock</> : <><Unlock size={12} /> Unlock</>}</button>
              <button className="danger"><Wrench size={12} /> Maintenance</button>
            </div>
            <button onClick={() => setSelectedBike(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={16} /></button>
          </div>
        )}

        {/* ─── Station Detail Popup ─── */}
        {selectedStation && (
          <div className="bike-popup" style={{ top: '60px', right: '60px' }} onClick={(e) => e.stopPropagation()}>
            <div className="bike-popup-header"><span className="bike-popup-id">🅿️ {selectedStation.name}</span></div>
            <div className="bike-popup-row"><span className="label">Capacity</span><span className="value">{selectedStation.capacity} bikes</span></div>
            <div className="bike-popup-row"><span className="label">Current Bikes</span><span className="value">{bikesAtStation(selectedStation.id).length}</span></div>
            <div className="bike-popup-row"><span className="label">Available</span><span className="value" style={{ color: '#22c55e' }}>{bikesAtStation(selectedStation.id).filter((b) => b.status === 'available').length}</span></div>
            <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {bikesAtStation(selectedStation.id).map((b) => (
                <span key={b.id} style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: `${getStatusColor(b.status)}22`, color: getStatusColor(b.status), cursor: 'pointer' }}
                  onClick={(e) => { e.stopPropagation(); setSelectedStation(null); setSelectedBike(b); }}
                >{b.id}</span>
              ))}
            </div>
            <button onClick={() => setSelectedStation(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
