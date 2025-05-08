import { useEffect, useState } from "react";
import axios from "axios";

const RegisterCollector = () => {
  const [regions, setRegions] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    national_id: "",
    region_ids: [],
  });
  const [status, setStatus] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get the backend URL

  useEffect(() => {
    axios.get(`${API_BASE_URL}/regions/`) // Use the environment variable
      .then((res) => setRegions(res.data))
      .catch(() => setStatus("Failed to load regions"));
  }, [API_BASE_URL]); // Include API_BASE_URL in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegionChange = (id) => {
    setFormData(prev => {
      const selected = prev.region_ids.includes(id)
        ? prev.region_ids.filter(r => r !== id)
        : [...prev.region_ids, id];
      return { ...prev, region_ids: selected };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/collectors/`, formData) // Use the environment variable
      .then(() => setStatus("Registration successful!"))
      .catch(() => setStatus("Error during registration"));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ backgroundColor: "#ffffff", color: "#212529" }}>
        <h2 className="card-title mb-4 text-center fw-bold">Register as a Garbage Collector</h2>

        {status && (
          <div className="alert alert-info text-center" role="alert">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">National ID</label>
            <input
              type="text"
              name="national_id"
              value={formData.national_id}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter national ID"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Regions</label>
            <div className="row">
              {regions.map(region => (
                <div key={region.id} className="col-6 mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.region_ids.includes(region.id)}
                      onChange={() => handleRegionChange(region.id)}
                      id={`region-${region.id}`}
                    />
                    <label className="form-check-label" htmlFor={`region-${region.id}`}>
                      {region.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCollector;