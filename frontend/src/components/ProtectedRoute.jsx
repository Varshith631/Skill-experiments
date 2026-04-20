import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const storedAuth = localStorage.getItem("authData");

  if (!storedAuth) {
    return <Navigate to="/login" replace />;
  }

  const authData = JSON.parse(storedAuth);

  if (roles && !roles.includes(authData.role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
