import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from './AdminContext';
import './admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adminLogin(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="login-logo">B</div>
          <h1>BKies Admin</h1>
          <p>Sign in to the management dashboard</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="admin-login-error">{error}</div>}
          <button type="submit" className="admin-login-btn">
            Sign in to Dashboard
          </button>
        </form>

        <div className="admin-login-hint">
          <p>Demo: <code>admin</code> / <code>admin123</code></p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/" style={{ color: '#64748b', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to BKies
          </Link>
        </div>
      </div>
    </div>
  );
}
