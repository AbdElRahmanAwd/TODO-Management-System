import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/auth/authSlice";

export default function ProtectedRoute() {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
