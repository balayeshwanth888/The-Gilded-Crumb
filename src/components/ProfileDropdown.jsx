import { useState } from "react";

export default function ProfileDropdown({
  user,
  onLogout,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="profile">
      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >
        👤 {user.name}
      </button>

      {open && (
        <div className="dropdown">
          <p>{user.email}</p>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              onLogout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}