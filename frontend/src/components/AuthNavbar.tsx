import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useGetMeQuery } from "../api/authApi";
import { useAppDispatch } from "../app/hooks";
import { clearToken } from "../features/auth/authSlice";
import ThemeToggle from "../features/theme/ThemeToggle";

export default function AuthNavbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom px-4">
      <div className="container-fluid p-1">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="Logo" width="30" className="me-2" />
          TODO
        </a>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <ThemeToggle />
          <div className="d-flex align-items-center gap-2">
            <span className="fw-semibold d-none d-sm-inline">
              {user?.name ?? "..."}
            </span>
          </div>
          <Button
            icon="pi pi-sign-out"
            label="Logout"
            severity="secondary"
            text
            size="small"
            className="rounded-pill"
            onClick={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
}
