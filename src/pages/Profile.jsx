import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const loggedIn =
    localStorage.getItem("loggedIn");

  if (!loggedIn) {
    navigate("/login");
    return null;
  }

  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">

        <h1>👋 Welcome</h1>

        <h2>{user?.name}</h2>

        <p>{user?.email}</p>

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}