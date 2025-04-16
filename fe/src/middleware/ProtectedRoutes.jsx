import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../components/Admin/common/loading";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const { user: userFirebase, loading: authLoading } = useAuth();
  const { user: dbUser, loading: reduxLoading } = useSelector(
    (state) => state.auth
  );
  console.log("dbUser:", dbUser);
  console.log("userFirebase:", userFirebase);
  console.log("dbUser?.user?.role:", dbUser?.role);
  if (authLoading || reduxLoading) return <Loading />;

  if (userFirebase && dbUser?.role === "admin") return children;
  return <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
