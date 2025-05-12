import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.sub,         // adjust depending on your token structure
          role: decoded.role,
          isApproved: decoded.is_approved,
        });
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, [token]);

  const login = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
