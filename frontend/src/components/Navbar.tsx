import { Button } from "primereact/button";
// import ThemeToggle from "../features/theme/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg border-bottom px-4">
      <div className="container-fluid p-1">
        <a className="navbar-brand " href="/">
          <img src="/logo.jpg" alt="Logo" width="30" className="me-2" />
          TODO
        </a>
        <div className="d-flex align-items-center gap-2 ms-auto">
          {/* <ThemeToggle /> */}
          <Button label="Login" className="me-2 rounded-pill " size="small" />
          <Button
            label="Register"
            className="btn-primary rounded-pill"
            size="small"
          />
        </div>
      </div>
    </nav>
  );
}
