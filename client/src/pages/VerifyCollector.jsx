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
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Verify a Garbage Collector</h2>

      {status && <p className="mb-4 text-blue-600">{status}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-medium">Select Collector</label>
        <select
          className="w-full p-2 border rounded"
          value={selectedId || ""}
          onChange={(e) => setSelectedId(Number(e.target.value))}
        >
          <option value="" disabled>Select one...</option>
          {collectors.map(c => (
            <option key={c.id} value={c.id}>
              {c.full_name} — {c.email}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={verifierName}
          onChange={(e) => setVerifierName(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Verification
        </button>
      </form>
    </div>
  );
};

export default VerifyCollector;
