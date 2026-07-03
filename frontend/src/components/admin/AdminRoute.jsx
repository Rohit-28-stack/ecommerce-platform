import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in but not an admin
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User is admin
  return children;
}

export default AdminRoute;