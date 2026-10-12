import { LoaderPage } from "@/routes/loader-page";
import { useAuth } from "@/provider/auth-provider";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ children }: { children: React.ReactNode }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoaderPage />;
  }

  if (!user) {
    return <Navigate to={"/signin"} replace />;
  }

  return children;
};

export default ProtectRoutes;
