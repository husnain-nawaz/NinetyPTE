import { Navigate, useLocation } from 'react-router-dom';
import { getStoredUser, isSuperAdmin } from '../frontend/src/utils/auth';

/**
 * Route guard ensuring only the verified Super Admin account (Husnain@gmail.com)
 * can access SuperDashboard routes.
 */
export default function SuperAdminRoute({ children }) {
  const location = useLocation();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isSuperAdmin(user)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
