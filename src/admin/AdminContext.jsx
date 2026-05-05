import { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('bkies_admin') === 'true';
  });

  const adminLogin = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAdmin(true);
      sessionStorage.setItem('bkies_admin', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('bkies_admin');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}

export function AdminRoute({ children }) {
  const { isAdmin } = useAdmin();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}
