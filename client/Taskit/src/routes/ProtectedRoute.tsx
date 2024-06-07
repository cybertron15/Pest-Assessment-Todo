import { Navigate, Outlet } from 'react-router-dom';
type ProtectedRoute = {
    isAuthenticated: boolean
}

const ProtectedRoute = ({ isAuthenticated }:ProtectedRoute) => {
  if (!isAuthenticated) {
    // return to login page and remove current route from history stack and replace it with login page
    return <Navigate to="/login" replace/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;