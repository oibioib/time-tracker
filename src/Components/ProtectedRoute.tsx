import { Navigate } from 'react-router-dom';

import { PagesRoutingNames } from '../Constants/Constants';

interface ProtectedRouteProps {
  outlet: JSX.Element;
}

const ProtectedRoute = ({ outlet }: ProtectedRouteProps) => {
  const user = true;
  if (!user) {
    return <Navigate to={`/${PagesRoutingNames.LOGIN}`} replace />;
  }
  return outlet;
};

export default ProtectedRoute;
