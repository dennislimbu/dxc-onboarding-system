import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={`main-area ${collapsed ? "collapsed" : ""}`}>
        <Header />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;