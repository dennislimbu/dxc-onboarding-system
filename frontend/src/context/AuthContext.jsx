import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const storedUser = sessionStorage.getItem("loggedInUser");

  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = (selectedUser) => {
    setUser(selectedUser);
    sessionStorage.setItem("loggedInUser", JSON.stringify(selectedUser));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}