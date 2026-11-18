import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useAuth } from './useAuth';

function FullScreenLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070b] text-white">
      <span className="h-10 w-10 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
    </div>
  );
}

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const { slug } = useParams();
  const location = useLocation();

  if (loading) return <FullScreenLoader />;

  if (!user) {
    const loginPath = slug ? `/${slug}/admin/login` : '/admin/login';
    return <Navigate to={loginPath} replace state={{ from: location.pathname }} />;
  }

  // Keep tenants isolated: a signed-in user can only open their own dashboard.
  if (slug && user.slug && slug !== user.slug) {
    return <Navigate to={`/${user.slug}/admin`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
