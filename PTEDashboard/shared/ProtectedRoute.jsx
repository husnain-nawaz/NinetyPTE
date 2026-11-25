import { Navigate, useLocation } from 'react-router-dom';
import { getStoredUser } from '../../frontend/src/utils/auth';
import { PortalLoadGate } from './CyanBarsLoader';
import { usePortal } from './portalContext';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { portalMode } = usePortal();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <PortalLoadGate refreshKey={portalMode}>
      {children}
    </PortalLoadGate>
  );
}
