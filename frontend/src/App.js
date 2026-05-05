import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.css";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MyRoute from "./pages/MyRoute";
import Resources from "./pages/Resources";
import History from "./pages/History";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-route" element={<MyRoute />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/history" element={<History />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/users/:id" element={<UserProfile />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;