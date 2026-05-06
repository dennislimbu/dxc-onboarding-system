import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className={`main-area ${collapsed ? "collapsed" : ""}`}>
        <Header />
        <div className="page-content">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;