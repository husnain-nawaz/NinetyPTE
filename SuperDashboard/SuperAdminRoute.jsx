import { Navigate, useLocation } from 'react-router-dom';
import { getStoredUser, isSuperAdmin } from '../frontend/src/utils/auth';
import { PortalLoadGate } from '../PTEDashboard/shared/CyanBarsLoader';

/**
 * Route guard ensuring only the verified Super Admin account
 * can access SuperDashboard routes, showing the cyan loader until ready.
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

  return <PortalLoadGate>{children}</PortalLoadGate>;
}
