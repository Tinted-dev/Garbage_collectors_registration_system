import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { token } = useContext(AuthContext); // ✅ FIXED: get token directly
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchCompanies = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.get('/companies', {
        headers: { Authorization: `Bearer ${token}` }, // ✅ token now works
      });
      setCompanies(res.data);
    } catch (err) {
      console.error('Failed to fetch companies', err);
      setErrorMsg('Failed to load companies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, approve) => {
    try {
      await axios.put(
        `/companies/${id}/approve`,
        { is_approved: approve },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCompanies();
    } catch (err) {
      console.error('Failed to update approval', err);
      setErrorMsg('Failed to update approval status.');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <p className="text-muted">Manage registered garbage collection companies.</p>

      {loading ? (
        <p>Loading companies...</p>
      ) : errorMsg ? (
        <div className="alert alert-danger">{errorMsg}</div>
      ) : companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Description</th>
                <th>Regions</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.description}</td>
                  <td>
                    <ul className="mb-0">
                      {company.regions?.map((r) => (
                        <li key={r.id}>{r.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {company.is_approved ? (
                      <span className="badge bg-success">Approved</span>
                    ) : (
                      <span className="badge bg-warning text-dark">Pending</span>
                    )}
                  </td>
                  <td>
                    {company.is_approved ? (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleApproval(company.id, false)}
                      >
                        Reject
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleApproval(company.id, true)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
