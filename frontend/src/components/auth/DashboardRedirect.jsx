import { Navigate } from 'react-router-dom';
import { Spinner } from '@/components/shared/LoadingSpinner';
import { useAuth } from '@/store/auth-context';

const roleRouteMap = {
  student: '/dashboard/student',
  teacher: '/dashboard/teacher',
  admin: '/dashboard/admin',
};

export default function DashboardRedirect() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  const route = roleRouteMap[user?.role] || '/dashboard/student';
  return <Navigate to={route} replace />;
}
