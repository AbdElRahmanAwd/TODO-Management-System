import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useLoginMutation } from "../../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "./authSlice";

interface LoginDialogProps {
  visible: boolean;
  onHide: () => void;
  onSwitchToRegister: () => void;
}

export default function LoginDialog({
  visible,
  onHide,
  onSwitchToRegister,
}: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setToken(result.token));
      handleHide();
      navigate("/tasks");
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setError(
        apiError.data?.message ||
          "Incorrect email or password. Please try again.",
      );
    }
  };

  const handleHide = () => {
    setEmail("");
    setPassword("");
    setError("");
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      style={{ maxWidth: "500px", width: "100%" }}
      modal
      dismissableMask
      draggable={false}
      closable={false}
    >
      <div className="text-center mb-4">
        <i className="pi pi-check-square" style={{ fontSize: "2rem" }} />
        <h3 className="mt-2 mb-4">Welcome Back</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-fluid d-flex flex-column justify-content-between  gap-4 "
      >
        {error && (
          <Message severity="error" text={error} className="w-full mb-3" />
        )}
        <div className="p-input-group d-flex">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-100"
            required
          />
        </div>
        <div className=" p-input-group d-flex mb-3">
          <span className="p-inputgroup-addon">
            <i className="pi pi-lock"></i>
          </span>
          <Password
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="w-100"
            inputClassName="w-100"
            feedback={false}
            toggleMask
            required
          />
        </div>
        <div className="d-flex justify-content-between align-items-center gap-5">
          <Button
            label={isLoading ? "Logging in..." : "Login"}
            type="submit"
            className=" rounded-pill"
            loading={isLoading}
            size="small"
          />
          <Button
            label="Cancel"
            type="button"
            disabled={isLoading}
            onClick={handleHide}
            severity="secondary"
            className=" rounded-pill"
            size="small"
          />
        </div>
        <p className="text-center mt-3 mb-0" style={{ fontSize: "0.9rem" }}>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToRegister();
            }}
          >
            Register
          </a>
        </p>
      </form>
    </Dialog>
  );
}
