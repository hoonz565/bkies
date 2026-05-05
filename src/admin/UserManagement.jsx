import { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight, X, Ban, ShieldCheck, Mail, Calendar, TrendingUp } from 'lucide-react';
import './admin.css';

const FACULTIES = [
  'Computer Science & Engineering',
  'Electrical & Electronic Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Mechanical Engineering',
  'Environmental Engineering',
];

const AVATAR_COLORS = [
  'linear-gradient(135deg, #3b82f6, #06b6d4)',
  'linear-gradient(135deg, #8b5cf6, #ec4899)',
  'linear-gradient(135deg, #22c55e, #14b8a6)',
  'linear-gradient(135deg, #f59e0b, #ef4444)',
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #06b6d4, #22c55e)',
  'linear-gradient(135deg, #f43f5e, #fb923c)',
  'linear-gradient(135deg, #14b8a6, #3b82f6)',
];

const generateMockUsers = () => {
  const firstNames = ['Nguyen', 'Tran', 'Le', 'Pham', 'Hoang', 'Vo', 'Bui', 'Dang', 'Do', 'Ngo', 'Duong', 'Ly', 'Truong', 'Huynh', 'Dinh'];
  const middleNames = ['Van', 'Thi', 'Minh', 'Duc', 'Hoang', 'Quoc', 'Thanh', 'Ngoc', 'Anh', 'Huu'];
  const lastNames = ['An', 'Binh', 'Cuong', 'Dung', 'Em', 'Gia', 'Hung', 'Khanh', 'Linh', 'Mai', 'Nam', 'Oanh', 'Phuc', 'Quang', 'Son', 'Tuan', 'Uyen', 'Vy', 'Xuan', 'Yen'];
  const users = [];

  for (let i = 0; i < 45; i++) {
    const first = firstNames[i % firstNames.length];
    const middle = middleNames[i % middleNames.length];
    const last = lastNames[i % lastNames.length];
    const name = `${first} ${middle} ${last}`;
    const studentId = `23${50000 + i * 137 + Math.floor(Math.random() * 100)}`;
    const faculty = FACULTIES[i % FACULTIES.length];
    const trips = 5 + Math.floor(Math.random() * 80);
    const balance = Math.floor(Math.random() * 200) * 1000;
    const status = Math.random() > 0.08 ? 'active' : 'banned';
    const joinDate = `2026-0${1 + Math.floor(Math.random() * 4)}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`;
    const email = `${first.toLowerCase()}${last.toLowerCase()}${Math.floor(Math.random() * 100)}@hcmut.edu.vn`;
    const lastActive = `${Math.floor(Math.random() * 24)}h ago`;

    users.push({
      id: i + 1,
      name,
      email,
      studentId,
      faculty,
      trips,
      balance,
      status,
      joinDate,
      lastActive,
      avatarColor: AVATAR_COLORS[i % AVATAR_COLORS.length],
      initials: `${first[0]}${last[0]}`,
    });
  }
  return users;
};

const PAGE_SIZE = 10;

export default function UserManagement() {
  const [users, setUsers] = useState(generateMockUsers);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [facultyFilter, setFacultyFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;
      if (facultyFilter !== 'all' && u.faculty !== facultyFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!u.name.toLowerCase().includes(q) && !u.studentId.includes(q) && !u.email.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [users, statusFilter, facultyFilter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleBan = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
      )
    );
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser((prev) => ({ ...prev, status: prev.status === 'active' ? 'banned' : 'active' }));
    }
  };

  const activeCount = users.filter(u => u.status === 'active').length;
  const bannedCount = users.filter(u => u.status === 'banned').length;
  const totalTrips = users.reduce((a, u) => a + u.trips, 0);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: '0 0 4px' }}>👥 User Management</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {users.length} registered • <span style={{ color: '#22c55e' }}>{activeCount} active</span> • <span style={{ color: '#ef4444' }}>{bannedCount} banned</span> • <span style={{ color: '#f59e0b' }}>{totalTrips.toLocaleString()} total trips</span>
          </p>
        </div>
        <button className="admin-btn"><Download size={14} /> Export CSV</button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={18} color="#22c55e" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Active</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>{activeCount}</div>
          </div>
        </div>
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(239,68,68,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Ban size={18} color="#ef4444" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Banned</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>{bannedCount}</div>
          </div>
        </div>
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={18} color="#3b82f6" />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Trips</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>{totalTrips.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrapper">
        <div className="admin-table-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input className="admin-search-input" placeholder="Search name, ID, or email..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} style={{ paddingLeft: '34px', width: '230px' }} />
            </div>
            <div className="filter-tabs">
              {['all', 'active', 'banned'].map((f) => (
                <button key={f} className={`filter-tab ${statusFilter === f ? 'active' : ''}`} onClick={() => { setStatusFilter(f); setPage(1); }}>
                  {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <select
              value={facultyFilter}
              onChange={(e) => { setFacultyFilter(e.target.value); setPage(1); }}
              style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #1f2937', background: '#0b1121', color: '#e2e8f0', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
            >
              <option value="all">All Faculties</option>
              {FACULTIES.map((f) => (<option key={f} value={f}>{f}</option>))}
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Student ID</th>
                <th>Faculty</th>
                <th>Trips</th>
                <th>Balance</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedUser(user)}>
                  <td>
                    <div className="user-avatar-cell">
                      <div className="user-avatar" style={{ background: user.avatarColor }}>{user.initials}</div>
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '12px' }}>{user.studentId}</td>
                  <td style={{ fontSize: '12px', color: '#94a3b8', maxWidth: '140px' }}>{user.faculty}</td>
                  <td style={{ fontWeight: 700 }}>{user.trips}</td>
                  <td style={{ fontWeight: 600, color: '#f59e0b', fontSize: '12px' }}>{user.balance.toLocaleString()}</td>
                  <td style={{ fontSize: '12px', color: '#94a3b8' }}>{user.lastActive}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: user.status === 'active' ? '#22c55e' : '#ef4444' }} />
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className={`admin-btn ${user.status === 'active' ? 'danger' : 'success'}`} style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => toggleBan(user.id)}>
                      {user.status === 'active' ? <><Ban size={12} /> Ban</> : <><ShieldCheck size={12} /> Unban</>}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-pagination">
          <span className="page-info">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </span>
          <div className="page-buttons">
            <button className="page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={14} /></button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>User Details</h2>
              <button className="admin-modal-close" onClick={() => setSelectedUser(null)}><X size={16} /></button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div className="user-avatar" style={{ width: '56px', height: '56px', fontSize: '20px', borderRadius: '14px', background: selectedUser.avatarColor }}>{selectedUser.initials}</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>{selectedUser.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{selectedUser.faculty}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { icon: <Mail size={12} />, label: 'Email', value: selectedUser.email },
                  { icon: '🎓', label: 'Student ID', value: selectedUser.studentId },
                  { icon: <Calendar size={12} />, label: 'Join Date', value: selectedUser.joinDate },
                  { icon: <TrendingUp size={12} />, label: 'Total Trips', value: selectedUser.trips },
                  { icon: '💰', label: 'Balance', value: `${selectedUser.balance.toLocaleString()} VND` },
                  { icon: '⏱️', label: 'Last Active', value: selectedUser.lastActive },
                ].map((item) => (
                  <div key={item.label} style={{ padding: '12px', background: '#0b1121', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                      {item.icon} {item.label}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'white', wordBreak: 'break-all' }}>{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Status badge */}
              <div style={{ marginTop: '16px', padding: '12px', background: selectedUser.status === 'active' ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', borderRadius: '10px', border: `1px solid ${selectedUser.status === 'active' ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`, textAlign: 'center' }}>
                <span className={`status-badge ${selectedUser.status}`} style={{ fontSize: '14px', padding: '6px 20px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: selectedUser.status === 'active' ? '#22c55e' : '#ef4444' }} />
                  {selectedUser.status === 'active' ? 'Active Account' : 'Banned Account'}
                </span>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn" onClick={() => setSelectedUser(null)}>Close</button>
              <button className={`admin-btn ${selectedUser.status === 'active' ? 'danger' : 'success'}`} onClick={() => toggleBan(selectedUser.id)}>
                {selectedUser.status === 'active' ? <><Ban size={14} /> Ban User</> : <><ShieldCheck size={14} /> Unban User</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
