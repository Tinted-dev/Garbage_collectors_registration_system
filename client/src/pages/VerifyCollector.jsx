import { useEffect, useState } from "react";
import axios from "axios";

const VerifyCollector = () => {
  const [collectors, setCollectors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [verifierName, setVerifierName] = useState("");
  const [status, setStatus] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get the backend URL

  useEffect(() => {
    axios.get(`${API_BASE_URL}/collectors/`) // Use the environment variable
      .then(res => setCollectors(res.data))
      .catch(() => setStatus("Failed to load collectors."));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !verifierName) {
      setStatus("Please select a collector and enter your name.");
      return;
    }

    axios.post(`${API_BASE_URL}/verifications/`, { // Use the environment variable
      collector_id: selectedId,
      verifier_name: verifierName,
    })
      .then(() => {
        setStatus("Verification submitted successfully!");
        setVerifierName("");
        setSelectedId(null);
      })
      .catch(() => setStatus("Error submitting verification."));
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ backgroundColor: "#ffffff", color: "#212529" }}>
        <h2 className="card-title mb-4 text-center fw-bold text-success">Verify a Garbage Collector</h2>

        {status && (
          <div className="alert alert-info text-center" role="alert">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Collector</label>
            <select
              className="form-select"
              value={selectedId || ""}
              onChange={(e) => setSelectedId(Number(e.target.value))}
              required
            >
              <option value="" disabled>Select one...</option>
              {collectors.map(c => (
                <option key={c.id} value={c.id}>
                  {c.full_name} — {c.email}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="form-control"
              value={verifierName}
              onChange={(e) => setVerifierName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Submit Verification
          </button>
        </form>
      </div>

      {/* Display Table of Collectors */}
      <div className="mt-5">
        <h4 className="text-center text-success mb-3">Latest 10 Registered Collectors</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {collectors.slice(-10).map((collector, index) => (
                <tr key={collector.id}>
                  <td>{index + 1}</td>
                  <td>{collector.full_name}</td>
                  <td>{collector.email}</td>
                  <td>{collector.phone}</td>
                  <td>{collector.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerifyCollector;