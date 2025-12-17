// components/ProtectedRoute.tsx
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null; // wait for auth

  // Not logged in
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
