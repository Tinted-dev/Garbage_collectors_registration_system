import React, { useState, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', credentials);
      const token = res.data.access_token;
      const decoded = jwt_decode(token);

      const authData = {
        token,
        role: decoded.role,
        isApproved: decoded.is_approved,
        userId: decoded.sub,
      };

      localStorage.setItem('token', token);
      setAuth(authData);

      if (authData.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (authData.role === 'collector' && authData.isApproved) {
        navigate('/company-dashboard');
      } else {
        alert('Awaiting admin approval.');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed. Check credentials.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
