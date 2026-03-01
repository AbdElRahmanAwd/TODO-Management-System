import { useState } from "react";
import { Button } from "primereact/button";
import LoginDialog from "../features/auth/LoginDialog";
import RegisterDialog from "../features/auth/RegisterDialog";
import ThemeToggle from "../features/theme/ThemeToggle";

export default function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg border-bottom px-4">
        <div className="container-fluid p-1">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="Logo" width="30" className="me-2" />
            TODO
          </a>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <ThemeToggle />
            <Button
              label="Login"
              severity="contrast"
              className="me-2 rounded-pill"
              size="small"
              onClick={() => setShowLogin(true)}
            />
            <Button
              label="Register"
              className="btn-primary rounded-pill"
              size="small"
              onClick={() => setShowRegister(true)}
            />
          </div>
        </div>
      </nav>

      <LoginDialog
        visible={showLogin}
        onHide={() => setShowLogin(false)}
        onSwitchToRegister={switchToRegister}
      />
      <RegisterDialog
        visible={showRegister}
        onHide={() => setShowRegister(false)}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
}
