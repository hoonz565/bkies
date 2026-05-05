import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import { LayoutDashboard, Map, Bike, Users, LogOut, PanelLeftClose, PanelLeft, Bell, Search } from 'lucide-react';
import './admin.css';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/map', icon: Map, label: 'Campus Map' },
  { to: '/admin/bikes', icon: Bike, label: 'Bikes' },
  { to: '/admin/users', icon: Users, label: 'Users' },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { adminLogout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="admin-sidebar-logo">
          <div className="logo-icon">B</div>
          {!collapsed && (
            <div className="logo-text">
              <span>BKies</span>
              <span>Admin Panel</span>
            </div>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} className="nav-icon" />
              {!collapsed && <span className="nav-label">{item.label}</span>}
            </NavLink>
          ))}

          <div style={{ flex: 1 }} />

          {/* Collapse toggle — desktop only */}
          <button
            className="admin-nav-item"
            onClick={() => setCollapsed(!collapsed)}
            style={{ display: 'none' }}
            id="collapse-btn"
          >
            {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
            {!collapsed && <span className="nav-label">Collapse</span>}
          </button>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-profile">
            <div className="admin-avatar">AD</div>
            {!collapsed && (
              <div className="admin-info">
                <span>Admin</span>
                <span>System Manager</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`admin-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-topbar-btn"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              style={{ display: 'flex' }}
            >
              {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>
          <div className="admin-topbar-right">
            <button className="admin-topbar-btn" title="Search">
              <Search size={18} />
            </button>
            <button className="admin-topbar-btn" title="Notifications">
              <Bell size={18} />
            </button>
            <button
              className="admin-topbar-btn"
              onClick={handleLogout}
              title="Logout"
              style={{ color: '#ef4444' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
