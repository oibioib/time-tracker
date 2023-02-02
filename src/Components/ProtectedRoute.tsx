import { Navigate } from 'react-router-dom';

import { PagesRoutingNames } from '../Constants/Constants';

interface ProtectedRouteProps {
  outlet: JSX.Element;
}
const LOCAL_STORAGE_KEY = 'GitHubToken';

const ProtectedRoute = ({ outlet }: ProtectedRouteProps) => {
  const isLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!isLoggedIn) {
    return <Navigate to={`/${PagesRoutingNames.LOGIN}`} replace />;
  }
  return outlet;
};

export default ProtectedRoute;
