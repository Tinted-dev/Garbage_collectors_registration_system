import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterCompany = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    description: '',
    region: '',
  });

  const [regions, setRegions] = useState([]);

  // Fetch regions on mount
  useEffect(() => {
    axios.get('/admin/regions')
      .then(res => {
        if (Array.isArray(res.data)) {
          setRegions(res.data);
        } else {
          console.error('Error fetching regions: Data is not an array', res.data);
          setRegions([]); // Set to empty array on error
        }
      })
      .catch(err => {
        console.error('Error fetching regions:', err);
        setRegions([]); // Set to empty array on error
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/companies/register', formData);
      alert('Company registered. Awaiting approval.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register as a Garbage Collection Company</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Company Name" onChange={handleChange} className="form-control mb-2" required />
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="form-control mb-2" required />
        <select name="region" onChange={handleChange} className="form-control mb-2" required>
          <option value="">Select Region</option>
          {Array.isArray(regions) && regions.map(region => (
            <option key={region.id} value={region.name}>{region.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default RegisterCompany;