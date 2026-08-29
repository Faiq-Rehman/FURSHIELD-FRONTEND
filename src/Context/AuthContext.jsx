import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../Services/authApi";
const AuthContext = createContext(null);
const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("furshield-user") || "null");
  } catch {
    localStorage.removeItem("furshield-user");
    return null;
  }
};
export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("furshield-token")));
  const clearSession = () => {
    localStorage.removeItem("furshield-user");
    localStorage.removeItem("furshield-token");
    setUser(null);
  };

  useEffect(() => {
    if (!localStorage.getItem("furshield-token")) return;
    getCurrentUser()
      .then(({ data }) => {
        const currentUser = data.user;
        localStorage.setItem("furshield-user", JSON.stringify(currentUser));
        setUser(currentUser);
      })
      .catch(clearSession)
      .finally(() => setLoading(false));
  }, []);

  const login = ({ user: loggedInUser, token }) => {
    localStorage.setItem("furshield-token", token);
    localStorage.setItem("furshield-user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };
  const logout = clearSession;
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
