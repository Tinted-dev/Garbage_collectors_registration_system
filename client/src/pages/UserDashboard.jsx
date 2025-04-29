import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ full_name: "", phone: "" });
  const [regions, setRegions] = useState([]);
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState("");

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({ full_name: user.full_name || "", phone: user.phone || "" });
    }

    axios.get("http://localhost:5000/regions/")
      .then(res => setRegions(res.data))
      .catch(() => setStatus("Failed to load regions."));

    axios.get(`http://localhost:5000/collectors/${user?.id}/verifications`)
      .then(res => setHistory(res.data))
      .catch(() => setStatus("Failed to load history."));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/collectors/${user?.id}`, formData)
      .then(() => setStatus("Details updated successfully!"))
      .catch(() => setStatus("Failed to update details."));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow border-success border-2">
        <h3 className="text-success mb-3">User Dashboard</h3>

        {status && <div className="alert alert-info">{status}</div>}

        <form onSubmit={handleUpdate} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success">Update Details</button>
        </form>

        <hr />

        <h5 className="text-success">Available Locations</h5>
        <ul className="list-group mb-4">
          {regions.map(region => (
            <li key={region.id} className="list-group-item">{region.name}</li>
          ))}
        </ul>

        <h5 className="text-success">Verification History</h5>
        <ul className="list-group">
          {history.map((entry, index) => (
            <li key={index} className="list-group-item">
              Verified by: {entry.verifier_name} — on {new Date(entry.verified_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
