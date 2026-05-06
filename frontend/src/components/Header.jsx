import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import dxcLogo from "../assets/images/dxc-logo.svg";
import { getAvatar } from "../services/avatarService";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const loadAvatar = () => {
      if (user?.id) {
        setAvatar(getAvatar(user.id));
      }
    };

    loadAvatar();

    window.addEventListener("avatarUpdated", loadAvatar);

    return () => {
      window.removeEventListener("avatarUpdated", loadAvatar);
    };
  }, [user]);
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <button className="logo-home-btn" onClick={() => navigate("/dashboard")}>
        <img src={dxcLogo} alt="DXC logo" className="topbar-logo-img" />
      </button>

      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <div className="profile-menu-wrapper">
          <button className="profile-btn" onClick={() => setOpen(!open)}>
            {avatar ? (
              <img src={avatar} alt="User avatar" className="header-avatar" />
            ) : (
              <UserCircle size={20} />
            )}
            <span>{user ? user.name : "User"}</span>
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="profile-dropdown">
              <button onClick={() => navigate("/profile")}>
                <Settings size={16} />
                User Settings
              </button>

              <button className="logout" onClick={handleLogout}>
                <LogOut size={16} />
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;