import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function AdminRoute() {
  const { user, loading } = useAuth();
  const adminToken = localStorage.getItem('furshield-admin-token');
  const storedAdminUser = localStorage.getItem('furshield-admin-user');

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-indigo-400">
        <div className="text-center space-y-3">
          <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold">Authenticating admin session...</p>
        </div>
      </div>
    );
  }

  const userToken = localStorage.getItem('furshield-token');
  const isAdminAuthenticated = Boolean(adminToken) || (Boolean(userToken) && user?.role === 'admin');

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
