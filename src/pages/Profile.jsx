// Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!loggedIn || !currentUser) {
      navigate("/login");
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>👋 Welcome</h1>
        <h2>{user.name}</h2>
        <p>{user.email}</p>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}