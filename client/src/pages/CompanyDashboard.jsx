import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CompanyDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [company, setCompany] = useState(null);
  const [regions, setRegions] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', description: '' });

  const token = auth?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyRes = await axios.get('/companies/my-company', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompany(companyRes.data);
        setForm({
          name: companyRes.data.name,
          email: companyRes.data.email,
          description: companyRes.data.description,
        });
        setRegions(companyRes.data.regions || []);

        const serviceRes = await axios.get(`/companies/${companyRes.data.id}/service-requests`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setServiceRequests(serviceRes.data);
      } catch (err) {
        console.error('Error loading company data:', err);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/companies/${company.id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Profile updated');
      setEditMode(false);
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update profile');
    }
  };

  if (!company) return <p>Loading dashboard...</p>;

  return (
    <div className="container mt-4">
      <h2>Company Dashboard</h2>

      <div className="card p-3 mb-4">
        <h4>Profile</h4>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          disabled={!editMode}
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          disabled={!editMode}
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control mb-2"
          disabled={!editMode}
        />
        {editMode ? (
          <button onClick={handleUpdate} className="btn btn-success">Save</button>
        ) : (
          <button onClick={() => setEditMode(true)} className="btn btn-primary">Edit</button>
        )}
      </div>

      <div className="card p-3 mb-4">
        <h4>Assigned Regions</h4>
        <ul>
          {regions.map(region => (
            <li key={region.id}>{region.name}</li>
          ))}
        </ul>
      </div>

      <div className="card p-3">
        <h4>Service Requests</h4>
        {serviceRequests.length > 0 ? (
          <ul>
            {serviceRequests.map((req, idx) => (
              <li key={idx}>
                <strong>{req.full_name}</strong> - {req.phone}<br />
                <em>{req.description}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No service requests found.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;
