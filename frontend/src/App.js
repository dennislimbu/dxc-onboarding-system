import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/global.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyRoute from "./pages/MyRoute";
import Resources from "./pages/Resources";
import History from "./pages/History";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <DashboardRouter />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-route"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <MainLayout>
                  <MyRoute />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Resources />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/history"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <MainLayout>
                  <History />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/users/:id"
            element={
              <ProtectedRoute allowedRoles={["MANAGER", "ADMIN"]}>
                <MainLayout>
                  <UserProfile />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function DashboardRouter() {
  const loggedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  if (loggedUser?.role === "MANAGER" || loggedUser?.role === "ADMIN") {
    return <ManagerDashboard />;
  }

  return <Dashboard />;
}

export default App;