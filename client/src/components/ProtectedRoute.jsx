// src/components/ProtectedRoute.js

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  // Wait for auth state to finish loading
  if (loading) {
    return <div className="text-center mt-5">Checking permissions...</div>;
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect if role does not match
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
