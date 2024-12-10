import { Navigate, useLocation } from "react-router-dom";
// import { isAuthenticated } from "@/services/authService.js";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const userRole = getRole();

  //prevent from accessing login/register once logged in
  if (isAuthenticated() && location.pathname.match(/\/(login|register)/)) {
    switch (userRole) {
      case "client":
        return <Navigate to="/client/dashboard" replace />;
      case "freelance":
        return <Navigate to="/freelancer/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  if (!isAuthenticated()) {
    //if not authenticated go back to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //if unauthorized redirect to a 404 page or a not allowed page, make the page later
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
