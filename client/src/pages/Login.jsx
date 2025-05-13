import React, { useState, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Set base URL for axios
axios.defaults.baseURL = 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      });

      const token = res.data.access_token;
      if (!token) throw new Error('No access token received');

      // Decode and validate token structure
      const decoded = jwtDecode(token);
      if (!decoded || !decoded.sub || !decoded.role) {
        throw new Error('Invalid token structure');
      }

      // Save token to context (this also updates user in AuthContext)
      login(token);

      // Redirect based on role
      if (decoded.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (decoded.role === 'collector' || decoded.role === 'company') {
        navigate(decoded.is_approved ? '/company-dashboard' : '/pending-approval');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || err.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="form-control mb-2"
          required
          minLength="6"
        />
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
