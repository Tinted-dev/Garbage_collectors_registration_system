import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import RegisterCompany from './pages/RegisterCompany';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SearchCompanies from './pages/SearchCompanies';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <NavigationBar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search-companies" element={<SearchCompanies />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login />
            ) : (
              <Navigate to={user?.role === 'admin' ? '/admin-dashboard' : '/company-dashboard'} />
            )
          }
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterCompany /> : <Navigate to="/" />}
        />

        {/* Protected Routes using nested layout */}
        <Route element={<ProtectedRoute requiredRole="company" />}>
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
