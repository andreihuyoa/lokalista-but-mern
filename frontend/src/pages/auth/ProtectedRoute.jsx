import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getRole } from "@/services/authService.js";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const userRole = getRole();

  //add a function where if a logged in user tries to go back to login page it just goes back to home page which is the dashboard of the logged in user

  //if not authenticated go back to login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //if unauthorized redirect to a 404 page or a not allowed page, make the page later
  if (allowedRoles.length > 0 && !allowedRoles(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
