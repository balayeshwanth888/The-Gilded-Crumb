import { useState } from "react";
import "../styles/auth.css";

export default function SignupModal({
  isOpen,
  onClose,
  openLogin,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);

    if (exists) {
      setError("Email already exists");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));

    setName("");
    setEmail("");
    setPassword("");
    setError("");

    alert("Signup Successful! Please login with your credentials.");
    onClose();
    openLogin();
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>
          ✖
        </button>

        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us today and start shopping!</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="auth-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password (min 6 characters)"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-btn">
            Signup
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span
            onClick={() => {
              onClose();
              openLogin();
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
