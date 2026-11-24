import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const user = localStorage.getItem('ninetypte_user');

  if (!user) {
    // If not logged in, redirect to login page and preserve attempted route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
