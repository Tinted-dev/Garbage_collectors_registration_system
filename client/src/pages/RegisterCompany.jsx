import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    description: '',
    region_id: '',
  });

  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/admin/regions')
      .then(res => setRegions(res.data))
      .catch(err => {
        console.error('Error fetching regions:', err);
        setRegions([]);
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRedirectMessage('');

    try {
      const regionName = regions.find(r => r.id === parseInt(formData.region_id))?.name;
      if (!regionName) throw new Error('Invalid region selected.');

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        description: formData.description,
        region: regionName,
      };

      await axios.post('http://localhost:5000/companies/register', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      alert('Company registered successfully. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.response?.status === 409) {
        setRedirectMessage('Email already registered. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000); // wait 3 seconds before redirect
      } else {
        setError(err.response?.data?.msg || err.message || 'Registration failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register as a Garbage Collection Company</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {redirectMessage && <div className="alert alert-warning">{redirectMessage}</div>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Company Name" onChange={handleChange} className="form-control mb-2" required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required minLength="6" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="form-control mb-2" required />
        <select name="region_id" onChange={handleChange} className="form-control mb-3" required>
          <option value="">Select Region</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterCompany;
