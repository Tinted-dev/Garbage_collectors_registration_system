import React, { useState, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Set base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:5000';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await axios.post('/auth/login', credentials, {
        headers: {
          'Content-Type': 'application/json'
          
        }
      });

      if (!res.data.access_token) {
        throw new Error('No access token received');
      }
      
      localStorage.setItem("access_token", res.data.access_token);

      const token = res.data.access_token;
      const decoded = jwtDecode(token);
    
      // Validate required fields
      if (typeof decoded.sub === 'undefined' || typeof decoded.role === 'undefined') {
        throw new Error('Invalid token structure');
      }
      console.log("Decoded token:", decoded);

      const authData = {
        token,
        role: decoded.role,
        isApproved: decoded.is_approved || false,
        userId: decoded.sub,
      };

      localStorage.setItem('token', token);
      login(token); // This will update context and localStorage


      // Handle navigation
      switch(authData.role) {
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'collector':
          navigate(authData.isApproved ? '/company-dashboard' : '/pending-approval');
          break;
        default:
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