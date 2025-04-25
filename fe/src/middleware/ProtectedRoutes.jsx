import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useSelector } from "react-redux";
import Loading from "../components/Admin/common/Loading";

const ProtectedRoutes = ({ children }) => {
  const { user: userFirebase, loading: authLoading } = useAuth();
  const { user: dbUser, loading: reduxLoading } = useSelector(
    (state) => state.auth
  );
  if (authLoading || reduxLoading) return <Loading />;

  if (userFirebase && dbUser?.role === "admin") return children;
  return <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
