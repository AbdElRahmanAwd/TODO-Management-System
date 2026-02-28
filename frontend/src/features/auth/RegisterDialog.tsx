import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useRegisterMutation } from "../../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "./authSlice";

interface RegisterDialogProps {
  visible: boolean;
  onHide: () => void;
  onSwitchToLogin: () => void;
}

export default function RegisterDialog({
  visible,
  onHide,
  onSwitchToLogin,
}: RegisterDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const result = await register({ name, email, password }).unwrap();
      dispatch(setToken(result.token));
      handleHide();
      navigate("/tasks");
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      setError(
        apiError.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  const handleHide = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
    onHide();
  };

  return (
    <Dialog
      visible={visible}
      onHide={handleHide}
      style={{ width: "500px" }}
      modal
      dismissableMask
      draggable={false}
      closable={false}
    >
      <div className="text-center mb-4">
        <i className="pi pi-user-plus" style={{ fontSize: "2rem" }} />
        <h3 className="mt-2 mb-4">Create Account</h3>
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
            <i className="pi pi-id-card"></i>
          </span>
          <InputText
            id="register-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-100"
            required
          />
        </div>
        <div className="p-input-group d-flex">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText
            id="register-email"
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
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min 6 characters"
            className="w-100"
            inputClassName="w-100"
            toggleMask
            required
          />
        </div>
        <div className="d-flex justify-content-between align-items-center gap-5">
          <Button
            label="Register"
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
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}
          >
            Login
          </a>
        </p>
      </form>
    </Dialog>
  );
}
