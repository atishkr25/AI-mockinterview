import { useAuth } from "@/provider/auth-provider";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

export const ProfileContainer = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  return (
    <div className="flex items-center gap-6">
      {user ? (
        <div className="flex items-center gap-3"><span className="text-sm text-navy">{user.name}</span><Button size="sm" variant="outline" onClick={() => { void signOut().then(() => navigate("/")); }}>Sign out</Button></div>
      ) : (
        <Link to={"/signin"}>
          <Button size={"sm"}>Get Started</Button>
        </Link>
      )}
    </div>
  );
};
