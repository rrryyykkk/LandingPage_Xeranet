import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../components/Admin/common/Loading.jsx";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  return user ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
