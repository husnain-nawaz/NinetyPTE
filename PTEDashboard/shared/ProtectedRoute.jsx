import { Navigate, useLocation } from 'react-router-dom';
import { getStoredUser } from '../../frontend/src/utils/auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
