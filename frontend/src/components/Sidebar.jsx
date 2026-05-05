import {
  LayoutDashboard,
  Route,
  Folder,
  Clock,
  UserCircle,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import dxcLogo from "../assets/images/dxc-logo.svg";
import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "My Route", icon: Route, path: "/my-route" },
    { label: "Resources", icon: Folder, path: "/resources" },
    { label: "History", icon: Clock, path: "/history" },
    { label: "User Profile", icon: UserCircle, path: "/profile" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={22} />
      </button>

      <div className="sidebar-logo-container">
        <img src={dxcLogo} alt="DXC logo" className="sidebar-logo-img" />
      </div>

      {!collapsed && <p className="sidebar-subtitle">IPE Onboarding</p>}

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              title={collapsed ? item.label : ""}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;