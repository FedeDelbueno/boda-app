import { createContext, useContext, useState } from "react";
import { getToken, clearToken, login as loginRequest, logout as logoutRequest } from "./authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const loginUser = async (username, password) => {
    const data = await loginRequest(username, password);
    setIsAuthenticated(true);
    return data;
  };

  const logoutUser = async () => {
    await logoutRequest().catch(() => clearToken());
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
