import { useEffect, useState } from "react";
import axios from "axios";

const VerifyCollector = () => {
  const [collectors, setCollectors] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [verifierName, setVerifierName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/collectors/")
      .then(res => setCollectors(res.data))
      .catch(() => setStatus("Failed to load collectors."));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !verifierName) {
      setStatus("Please select a collector and enter your name.");
      return;
    }

    axios.post("http://localhost:5000/verifications/", {
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

          <button
            type="submit"
            className="btn btn-success w-100"
          >
            Submit Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyCollector;
