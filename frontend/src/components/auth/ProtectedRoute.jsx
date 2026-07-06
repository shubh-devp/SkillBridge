import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@/components/shared/LoadingSpinner';
import { useAuth } from '@/store/auth-context';

const roleDashboardMap = {
  student: '/dashboard/student',
  teacher: '/dashboard/teacher',
  admin: '/dashboard/admin',
};

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    const dashboardPath = roleDashboardMap[user.role] || '/dashboard/student';
    return <Navigate to={dashboardPath} replace />;
  }

  return children ?? <Outlet />;
}
