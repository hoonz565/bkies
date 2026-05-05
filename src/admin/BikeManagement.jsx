import { useState, useMemo } from 'react';
import { Search, Plus, Download, ChevronLeft, ChevronRight, X, MapPin, Battery, Clock, Wrench, ArrowUpDown } from 'lucide-react';
import './admin.css';

const MOCK_BIKES = [
  { id: 'BK-001', status: 'available', location: 'Main Gate (A1)', battery: 92, lastRide: '21 Apr, 14:23', maintenance: '15 Apr 2026', totalTrips: 124 },
  { id: 'BK-002', status: 'available', location: 'Main Gate (A1)', battery: 78, lastRide: '21 Apr, 13:45', maintenance: '18 Apr 2026', totalTrips: 98 },
  { id: 'BK-003', status: 'maintenance', location: 'Workshop', battery: 0, lastRide: '19 Apr, 09:12', maintenance: '21 Apr 2026', totalTrips: 156 },
  { id: 'BK-004', status: 'in-use', location: 'Moving (B4 → A3)', battery: 65, lastRide: 'Now', maintenance: '10 Apr 2026', totalTrips: 201, rider: 'Nguyen Van A' },
  { id: 'BK-005', status: 'available', location: 'Library (A2)', battery: 85, lastRide: '21 Apr, 11:30', maintenance: '12 Apr 2026', totalTrips: 87 },
  { id: 'BK-006', status: 'low-battery', location: 'CS Faculty (A3)', battery: 12, lastRide: '21 Apr, 10:05', maintenance: '14 Apr 2026', totalTrips: 145 },
  { id: 'BK-007', status: 'available', location: 'Auditorium (B4)', battery: 95, lastRide: '20 Apr, 16:40', maintenance: '17 Apr 2026', totalTrips: 67 },
  { id: 'BK-008', status: 'in-use', location: 'Moving (A2 → B9)', battery: 54, lastRide: 'Now', maintenance: '16 Apr 2026', totalTrips: 189, rider: 'Tran Thi B' },
  { id: 'BK-009', status: 'available', location: 'Canteen 2', battery: 73, lastRide: '21 Apr, 09:15', maintenance: '13 Apr 2026', totalTrips: 112 },
  { id: 'BK-010', status: 'available', location: 'Environment (B9)', battery: 88, lastRide: '20 Apr, 18:20', maintenance: '11 Apr 2026', totalTrips: 76 },
  { id: 'BK-011', status: 'low-battery', location: 'Main Gate (A1)', battery: 8, lastRide: '21 Apr, 15:10', maintenance: '09 Apr 2026', totalTrips: 203 },
  { id: 'BK-012', status: 'in-use', location: 'Moving (Canteen → B6)', battery: 42, lastRide: 'Now', maintenance: '19 Apr 2026', totalTrips: 134, rider: 'Le Van C' },
  { id: 'BK-013', status: 'available', location: 'Library (A2)', battery: 67, lastRide: '21 Apr, 08:45', maintenance: '20 Apr 2026', totalTrips: 55 },
  { id: 'BK-014', status: 'maintenance', location: 'Workshop', battery: 0, lastRide: '18 Apr, 14:00', maintenance: '21 Apr 2026', totalTrips: 178 },
  { id: 'BK-015', status: 'available', location: 'CS Faculty (A3)', battery: 91, lastRide: '21 Apr, 12:30', maintenance: '15 Apr 2026', totalTrips: 93 },
  { id: 'BK-016', status: 'in-use', location: 'Moving (A1 → A2)', battery: 38, lastRide: 'Now', maintenance: '17 Apr 2026', totalTrips: 167, rider: 'Pham Thi D' },
  { id: 'BK-017', status: 'available', location: 'Auditorium (B4)', battery: 82, lastRide: '20 Apr, 15:55', maintenance: '14 Apr 2026', totalTrips: 44 },
  { id: 'BK-018', status: 'low-battery', location: 'Environment (B9)', battery: 15, lastRide: '21 Apr, 07:20', maintenance: '12 Apr 2026', totalTrips: 198 },
  { id: 'BK-019', status: 'available', location: 'Canteen 2', battery: 76, lastRide: '21 Apr, 10:50', maintenance: '18 Apr 2026', totalTrips: 81 },
  { id: 'BK-020', status: 'available', location: 'Main Gate (A1)', battery: 94, lastRide: '21 Apr, 14:05', maintenance: '16 Apr 2026', totalTrips: 62 },
  { id: 'BK-021', status: 'maintenance', location: 'Workshop', battery: 0, lastRide: '17 Apr, 11:00', maintenance: '21 Apr 2026', totalTrips: 211 },
  { id: 'BK-022', status: 'available', location: 'Library (A2)', battery: 60, lastRide: '21 Apr, 13:20', maintenance: '19 Apr 2026', totalTrips: 73 },
  { id: 'BK-023', status: 'available', location: 'CS Faculty (A3)', battery: 87, lastRide: '20 Apr, 17:15', maintenance: '13 Apr 2026', totalTrips: 109 },
  { id: 'BK-024', status: 'in-use', location: 'Moving (B9 → Canteen)', battery: 45, lastRide: 'Now', maintenance: '11 Apr 2026', totalTrips: 182, rider: 'Hoang Van E' },
  { id: 'BK-025', status: 'low-battery', location: 'Auditorium (B4)', battery: 5, lastRide: '21 Apr, 06:50', maintenance: '10 Apr 2026', totalTrips: 220 },
  { id: 'BK-026', status: 'available', location: 'Canteen 2', battery: 71, lastRide: '21 Apr, 11:45', maintenance: '20 Apr 2026', totalTrips: 39 },
  { id: 'BK-027', status: 'available', location: 'Environment (B9)', battery: 83, lastRide: '21 Apr, 09:30', maintenance: '15 Apr 2026', totalTrips: 96 },
  { id: 'BK-028', status: 'available', location: 'Main Gate (A1)', battery: 89, lastRide: '20 Apr, 16:30', maintenance: '18 Apr 2026', totalTrips: 58 },
  { id: 'BK-029', status: 'available', location: 'Library (A2)', battery: 96, lastRide: '21 Apr, 14:50', maintenance: '17 Apr 2026', totalTrips: 48 },
  { id: 'BK-030', status: 'available', location: 'CS Faculty (A3)', battery: 74, lastRide: '21 Apr, 12:10', maintenance: '14 Apr 2026', totalTrips: 115 },
];

const PAGE_SIZE = 10;

function BikeDetailModal({ bike, onClose, onToggle }) {
  if (!bike) return null;
  const getBatteryColor = (pct) => pct > 50 ? '#22c55e' : pct > 20 ? '#f59e0b' : '#ef4444';

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        <div className="admin-modal-header">
          <h2>🚲 {bike.id}</h2>
          <button className="admin-modal-close" onClick={onClose}><X size={16} /></button>
        </div>
        <div className="admin-modal-body">
          {/* Status badge */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span className={`status-badge ${bike.status}`} style={{ fontSize: '14px', padding: '6px 20px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: bike.status === 'available' ? '#22c55e' : bike.status === 'in-use' ? '#3b82f6' : bike.status === 'low-battery' ? '#f59e0b' : '#ef4444' }} />
              {bike.status.charAt(0).toUpperCase() + bike.status.slice(1).replace('-', ' ')}
            </span>
          </div>

          {/* Battery visual */}
          <div style={{ background: '#0b1121', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>Battery Level</span>
              <span style={{ fontSize: '14px', color: 'white', fontWeight: 800 }}>{bike.battery}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#1f2937', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${bike.battery}%`, height: '100%', borderRadius: '5px', background: `linear-gradient(90deg, ${getBatteryColor(bike.battery)}, ${getBatteryColor(bike.battery)}88)`, transition: 'width 0.5s ease' }} />
            </div>
          </div>

          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { icon: <MapPin size={14} />, label: 'Location', value: bike.location },
              { icon: <Clock size={14} />, label: 'Last Ride', value: bike.lastRide },
              { icon: <Wrench size={14} />, label: 'Last Maintenance', value: bike.maintenance },
              { icon: <ArrowUpDown size={14} />, label: 'Total Trips', value: bike.totalTrips },
            ].map((item) => (
              <div key={item.label} style={{ padding: '12px', background: '#0b1121', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.icon} {item.label}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>{item.value}</div>
              </div>
            ))}
          </div>

          {bike.rider && (
            <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(59,130,246,0.08)', borderRadius: '10px', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Current Rider</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#60a5fa' }}>{bike.rider}</div>
            </div>
          )}
        </div>
        <div className="admin-modal-footer">
          <button className="admin-btn" onClick={onClose}>Close</button>
          {(bike.status === 'available' || bike.status === 'maintenance') && (
            <button className={`admin-btn ${bike.status === 'available' ? 'danger' : 'success'}`} onClick={() => onToggle(bike.id)}>
              {bike.status === 'available' ? '🔧 Flag Maintenance' : '✅ Mark Available'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BikeManagement() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [bikes, setBikes] = useState(MOCK_BIKES);
  const [selectedBike, setSelectedBike] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortDir, setSortDir] = useState('asc');

  const filtered = useMemo(() => {
    let result = bikes.filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (search && !b.id.toLowerCase().includes(search.toLowerCase()) && !b.location.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    if (sortBy) {
      result = [...result].sort((a, b) => {
        let va = a[sortBy], vb = b[sortBy];
        if (typeof va === 'string') va = va.toLowerCase();
        if (typeof vb === 'string') vb = vb.toLowerCase();
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [bikes, statusFilter, search, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = (id) => {
    setBikes((prev) => prev.map((b) => {
      if (b.id !== id) return b;
      if (b.status === 'available') return { ...b, status: 'maintenance', battery: 0, location: 'Workshop' };
      if (b.status === 'maintenance') return { ...b, status: 'available', battery: 100, location: 'Main Gate (A1)' };
      return b;
    }));
    setSelectedBike((prev) => {
      if (!prev || prev.id !== id) return prev;
      const updated = bikes.find(b => b.id === id);
      if (!updated) return prev;
      return updated.status === 'available'
        ? { ...updated, status: 'maintenance', battery: 0, location: 'Workshop' }
        : { ...updated, status: 'available', battery: 100, location: 'Main Gate (A1)' };
    });
  };

  const handleSort = (field) => {
    if (sortBy === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortDir('asc'); }
  };

  const getBatteryColor = (pct) => pct > 50 ? '#22c55e' : pct > 20 ? '#f59e0b' : '#ef4444';

  const statusCounts = {
    all: bikes.length,
    available: bikes.filter(b => b.status === 'available').length,
    'in-use': bikes.filter(b => b.status === 'in-use').length,
    'low-battery': bikes.filter(b => b.status === 'low-battery').length,
    maintenance: bikes.filter(b => b.status === 'maintenance').length,
  };

  return (
    <div>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: '0 0 4px' }}>🚲 Bike Management</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            Manage fleet of {bikes.length} bikes • <span style={{ color: '#22c55e' }}>{statusCounts.available} available</span> • <span style={{ color: '#3b82f6' }}>{statusCounts['in-use']} in use</span>
          </p>
        </div>
        <div className="admin-table-actions">
          <button className="admin-btn"><Download size={14} /> Export CSV</button>
          <button className="admin-btn primary"><Plus size={14} /> Add Bike</button>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input className="admin-search-input" placeholder="Search bike or location..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ paddingLeft: '34px', width: '220px' }} />
            </div>
            <div className="filter-tabs">
              {['all', 'available', 'in-use', 'low-battery', 'maintenance'].map((f) => (
                <button key={f} className={`filter-tab ${statusFilter === f ? 'active' : ''}`} onClick={() => { setStatusFilter(f); setPage(1); }}>
                  {f === 'all' ? `All (${statusCounts.all})` : `${f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')} (${statusCounts[f]})`}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('id')}>
                  Bike ID {sortBy === 'id' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th>Status</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('location')}>
                  Location {sortBy === 'location' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('battery')}>
                  Battery {sortBy === 'battery' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th>Last Ride</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleSort('totalTrips')}>
                  Trips {sortBy === 'totalTrips' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((bike) => (
                <tr key={bike.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedBike(bike)}>
                  <td style={{ fontWeight: 700, color: 'white', fontFamily: 'monospace', fontSize: '13px' }}>{bike.id}</td>
                  <td>
                    <span className={`status-badge ${bike.status}`}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: bike.status === 'available' ? '#22c55e' : bike.status === 'in-use' ? '#3b82f6' : bike.status === 'low-battery' ? '#f59e0b' : '#ef4444' }} />
                      {bike.status.charAt(0).toUpperCase() + bike.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} color="#64748b" />
                      <span style={{ fontSize: '12px' }}>{bike.location}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '50px', height: '6px', background: '#1f2937', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${bike.battery}%`, height: '100%', borderRadius: '3px', background: getBatteryColor(bike.battery), transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: getBatteryColor(bike.battery), minWidth: '32px' }}>{bike.battery}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '12px', color: bike.lastRide === 'Now' ? '#3b82f6' : '#94a3b8', fontWeight: bike.lastRide === 'Now' ? 700 : 500 }}>
                    {bike.lastRide === 'Now' && <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', marginRight: '6px', animation: 'bikePulse 1.5s infinite' }} />}
                    {bike.lastRide}
                  </td>
                  <td style={{ fontWeight: 700, fontSize: '13px' }}>{bike.totalTrips}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    {(bike.status === 'available' || bike.status === 'maintenance') && (
                      <button className={`admin-btn ${bike.status === 'available' ? 'danger' : 'success'}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => toggleStatus(bike.id)}>
                        {bike.status === 'available' ? 'Maintenance' : 'Available'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <span className="page-info">
            Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="page-buttons">
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bike Detail Modal */}
      <BikeDetailModal bike={selectedBike} onClose={() => setSelectedBike(null)} onToggle={toggleStatus} />
    </div>
  );
}
