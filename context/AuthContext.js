
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Simulate checking for a stored token
    const storedUser = null; 
    setUser(storedUser);
  }, []);

  const login = (email, password) => {
    console.log('Logging in with', email, password);
    setUser({ email });
  };

  const register = (email, password) => {
    console.log('Registering with', email, password);
    setUser({ email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
