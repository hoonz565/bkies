import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bike, Users, MapPin, DollarSign, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Zap, Clock, ChevronRight } from 'lucide-react';
import './admin.css';

const KPI_DATA = [
  { label: 'Total Bikes', value: 30, icon: Bike, color: '#3b82f6', bg: 'rgba(59,130,246,0.12)', change: '+2', positive: true, suffix: '' },
  { label: 'Active Users', value: 1247, icon: Users, color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', change: '+38', positive: true, suffix: '' },
  { label: 'Trips Today', value: 156, icon: MapPin, color: '#22c55e', bg: 'rgba(34,197,94,0.12)', change: '+12%', positive: true, suffix: '' },
  { label: 'Revenue Today', value: 780, icon: DollarSign, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', change: '-3%', positive: false, suffix: 'K VND' },
];

const FLEET_STATUS = [
  { label: 'Available', count: 18, color: '#22c55e' },
  { label: 'In Use', count: 5, color: '#3b82f6' },
  { label: 'Low Battery', count: 4, color: '#f59e0b' },
  { label: 'Maintenance', count: 3, color: '#ef4444' },
];

const HOURLY_DATA = [
  { hour: '6AM', value: 8 }, { hour: '7AM', value: 25 }, { hour: '8AM', value: 45 },
  { hour: '9AM', value: 38 }, { hour: '10AM', value: 22 }, { hour: '11AM', value: 30 },
  { hour: '12PM', value: 42 }, { hour: '1PM', value: 35 }, { hour: '2PM', value: 28 },
  { hour: '3PM', value: 33 }, { hour: '4PM', value: 48 }, { hour: '5PM', value: 52 },
  { hour: '6PM', value: 40 }, { hour: '7PM', value: 15 },
];

const RECENT_ACTIVITY = [
  { text: 'Bike BK-012 unlocked at Library (A2)', time: '2 min ago', color: '#3b82f6', icon: '🔓' },
  { text: 'New user Vo Thi F registered', time: '5 min ago', color: '#22c55e', icon: '👤' },
  { text: 'Bike BK-003 flagged for maintenance', time: '12 min ago', color: '#ef4444', icon: '🔧' },
  { text: 'Trip completed: B4 → A3 (1.2km)', time: '18 min ago', color: '#8b5cf6', icon: '🏁' },
  { text: 'Bike BK-025 battery low (8%)', time: '25 min ago', color: '#f59e0b', icon: '🔋' },
  { text: 'User Le Van C topped up 50,000 VND', time: '30 min ago', color: '#22c55e', icon: '💰' },
  { text: 'Bike BK-007 returned to Main Gate', time: '35 min ago', color: '#3b82f6', icon: '📍' },
];

const TOP_ROUTES = [
  { from: 'Library (A2)', to: 'CS Faculty (A3)', trips: 34, trend: '+12%' },
  { from: 'Main Gate (A1)', to: 'Auditorium (B4)', trips: 28, trend: '+8%' },
  { from: 'Canteen 2', to: 'B9 (Environment)', trips: 22, trend: '+5%' },
  { from: 'B4 (Auditorium)', to: 'Library (A2)', trips: 18, trend: '-2%' },
];

// Animated counter hook
function useAnimatedCounter(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

function KpiCard({ kpi, delay }) {
  const [visible, setVisible] = useState(false);
  const animatedValue = useAnimatedCounter(typeof kpi.value === 'number' ? kpi.value : 0, 1500);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="kpi-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="kpi-icon" style={{ background: kpi.bg }}>
        <kpi.icon size={24} color={kpi.color} />
      </div>
      <div className="kpi-info">
        <h3>{kpi.label}</h3>
        <p className="kpi-value">
          {typeof kpi.value === 'number' ? animatedValue.toLocaleString() : kpi.value}
          {kpi.suffix && <span style={{ fontSize: '13px', color: '#94a3b8', marginLeft: '4px', fontWeight: 600 }}>{kpi.suffix}</span>}
        </p>
        <p className={`kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
          {kpi.positive ? <ArrowUpRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> : <ArrowDownRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />}
          {' '}{kpi.change} vs yesterday
        </p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const maxHourly = Math.max(...HOURLY_DATA.map((d) => d.value));
  const totalFleet = FLEET_STATUS.reduce((a, b) => a + b.count, 0);
  const [hoveredBar, setHoveredBar] = useState(null);

  let cumulative = 0;
  const donutSegments = FLEET_STATUS.map((item) => {
    const pct = (item.count / totalFleet) * 100;
    const offset = cumulative;
    cumulative += pct;
    return { ...item, pct, offset };
  });

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: '0 0 4px' }}>Dashboard</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} /> Welcome back, Admin. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Link to="/admin/map" className="admin-btn primary" style={{ textDecoration: 'none' }}>
          <MapPin size={16} /> Open Live Map
        </Link>
      </div>

      {/* KPI Cards with staggered animation */}
      <div className="kpi-grid">
        {KPI_DATA.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} delay={i * 100} />
        ))}
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Peak Hours Chart */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TrendingUp size={16} color="#3b82f6" />
              </div>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'white', margin: 0 }}>Trip Volume by Hour</h2>
            </div>
            <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700, padding: '3px 10px', background: 'rgba(59,130,246,0.1)', borderRadius: '6px' }}>Today</span>
          </div>
          <div className="bar-chart">
            {HOURLY_DATA.map((d, i) => (
              <div
                className="bar-item"
                key={d.hour}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                style={{ position: 'relative' }}
              >
                {hoveredBar === i && (
                  <div style={{
                    position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)',
                    background: '#1e293b', padding: '3px 8px', borderRadius: '6px', fontSize: '10px',
                    fontWeight: 700, color: 'white', whiteSpace: 'nowrap', border: '1px solid #334155',
                    zIndex: 5, pointerEvents: 'none',
                  }}>
                    {d.value} trips
                  </div>
                )}
                <div
                  className="bar-fill"
                  style={{
                    height: `${(d.value / maxHourly) * 100}%`,
                    background: hoveredBar === i
                      ? 'linear-gradient(180deg, #60a5fa, #3b82f6)'
                      : d.value === maxHourly
                        ? 'linear-gradient(180deg, #60a5fa, #3b82f6)'
                        : 'rgba(59,130,246,0.3)',
                    opacity: hoveredBar === i ? 1 : undefined,
                    transition: 'all 0.2s ease',
                    borderRadius: '4px 4px 0 0',
                  }}
                />
                <span className="bar-label" style={{ color: hoveredBar === i ? 'white' : undefined }}>{d.hour.replace('AM', '').replace('PM', 'p')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fleet Status */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(139,92,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={16} color="#8b5cf6" />
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'white', margin: 0 }}>Fleet Status</h2>
          </div>

          <div className="donut-chart">
            <svg viewBox="0 0 42 42" style={{ width: '100%', height: '100%' }}>
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#1f2937" strokeWidth="3.5" />
              {donutSegments.map((seg) => (
                <circle
                  key={seg.label} cx="21" cy="21" r="15.915" fill="transparent"
                  stroke={seg.color} strokeWidth="3.5"
                  strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                  strokeDashoffset={-seg.offset + 25}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 1s ease' }}
                />
              ))}
              <text x="21" y="19" fill="white" fontSize="7" fontWeight="800" textAnchor="middle">{totalFleet}</text>
              <text x="21" y="24.5" fill="#64748b" fontSize="3" fontWeight="600" textAnchor="middle">BIKES</text>
            </svg>
          </div>

          <div className="chart-legend">
            {FLEET_STATUS.map((item) => (
              <div className="legend-item" key={item.label}>
                <div className="legend-dot" style={{ background: item.color, borderRadius: '4px' }} />
                {item.label}
                <span className="legend-value">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Routes */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="#22c55e" />
            </div>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'white', margin: 0 }}>Top Routes</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {TOP_ROUTES.map((route, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px', borderRadius: '10px',
                  background: 'rgba(15,23,42,0.5)', border: '1px solid #1f2937',
                  transition: 'all 0.2s', cursor: 'pointer',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.background = 'rgba(30,41,59,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1f2937'; e.currentTarget.style.background = 'rgba(15,23,42,0.5)'; }}
              >
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, color: '#60a5fa', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', color: '#e2e8f0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {route.from} <ChevronRight size={12} color="#64748b" /> {route.to}
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'white' }}>{route.trips}</div>
                  <div style={{ fontSize: '10px', color: route.trend.startsWith('+') ? '#22c55e' : '#ef4444', fontWeight: 600 }}>{route.trend}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'white', margin: 0 }}>Recent Activity</h2>
            <span style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 600, cursor: 'pointer' }}>View All →</span>
          </div>
          <div className="activity-feed">
            {RECENT_ACTIVITY.map((a, i) => (
              <div className="activity-item" key={i} style={{ opacity: 0, animation: `fadeSlideIn 0.4s ease ${i * 0.08}s forwards` }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: `${a.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', flexShrink: 0, marginTop: '0',
                }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="activity-text">{a.text}</div>
                  <div className="activity-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
