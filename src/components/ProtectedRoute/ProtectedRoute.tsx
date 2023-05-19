import { Navigate } from 'react-router-dom';

import { LOCAL_STORAGE_KEY, ROUTES } from '../../constants';

interface ProtectedRouteProps {
  outlet: JSX.Element;
}

const ProtectedRoute = ({ outlet }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!isLoggedIn) {
    return <Navigate to={`/${ROUTES.LOGIN}`} replace />;
  }
  return outlet;
};

export default ProtectedRoute;
