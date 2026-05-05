import { useState } from "react";
import { Bell, ChevronDown, LogOut, Settings, UserCircle } from "lucide-react";
import dxcLogo from "../assets/images/dxc-logo.svg";
import "./Header.css";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <img src={dxcLogo} alt="DXC logo" className="topbar-logo-img" />

      <div className="topbar-actions">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>

        <div className="profile-menu-wrapper">
          <button className="profile-btn" onClick={() => setOpen(!open)}>
            <UserCircle size={20} />
            <span>Sam Smith</span>
            <ChevronDown size={16} />
          </button>

          {open && (
            <div className="profile-dropdown">
              <button>
                <Settings size={16} />
                User Settings
              </button>

              <button className="logout">
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