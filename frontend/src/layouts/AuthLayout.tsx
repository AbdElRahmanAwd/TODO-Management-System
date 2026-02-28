import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/auth/authSlice";
import AuthNavbar from "../components/AuthNavbar";

export default function AuthLayout() {
  const token = useAppSelector(selectToken);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <AuthNavbar />
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}

