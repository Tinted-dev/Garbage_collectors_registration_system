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

  useEffect(() => {
    axios.get('http://localhost:5000/admin/regions')
      .then(res => setRegions(res.data))
      .catch(err => {
        console.error('Error fetching regions:', err);
        setRegions([]);
      });
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        description: formData.description,
        region: regions.find(r => r.id === parseInt(formData.region_id))?.name || '',
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
      alert('Registration failed.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register as a Garbage Collection Company</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Company Name" onChange={handleChange} className="form-control mb-2" required />
        <input name="email" placeholder="Email" onChange={handleChange} className="form-control mb-2" required />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} className="form-control mb-2" required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="form-control mb-2" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="form-control mb-2" required />
        <select name="region_id" onChange={handleChange} className="form-control mb-2" required>
          <option value="">Select Region</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>{region.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default RegisterCompany;
