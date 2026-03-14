import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const signIn = async ({ email, password }) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 700)); // simulate API delay

    setUser({
      name: "Demo User",
      email: email || "demo@hospitality.com",
      role: "Hospitality Lead",
      desk: "Guest Experience Desk",
      shift: "Morning",
    });
    setIsAuthenticated(true);
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
