import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [pendingCollectors, setPendingCollectors] = useState([]);
  const [regionStats, setRegionStats] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch data when component mounts
  useEffect(() => {
    fetchPendingCollectors();
    fetchRegionStats();
  }, []);

  const fetchPendingCollectors = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/collectors/pending`);
      setPendingCollectors(res.data);
    } catch (error) {
      setStatusMessage("Failed to load pending collectors.");
    }
  };

  const fetchRegionStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stats/regions`);
      setRegionStats(res.data);
    } catch (error) {
      setStatusMessage("Failed to load region statistics.");
    }
  };

  const handleStatusChange = async (collectorId, status) => {
    try {
      await axios.put(`${API_BASE_URL}/collectors/${collectorId}/status`, { status });
      setStatusMessage(`Collector ${status} successfully.`);
      fetchPendingCollectors();
      fetchRegionStats();
    } catch (error) {
      setStatusMessage(`Failed to ${status} collector.`);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow border-primary border-2">
        <h2 className="text-primary mb-4">Admin Dashboard</h2>

        {statusMessage && <div className="alert alert-info">{statusMessage}</div>}

        <section className="mb-5">
          <h4 className="text-secondary">Pending Collector Registrations</h4>
          {pendingCollectors.length > 0 ? (
            <ul className="list-group mt-3">
              {pendingCollectors.map((collector) => (
                <li key={collector.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{collector.full_name}</strong><br />
                    Phone: {collector.phone}
                  </div>
                  <div>
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => handleStatusChange(collector.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleStatusChange(collector.id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted mt-3">No pending collectors at the moment.</p>
          )}
        </section>

        <hr />

        <section>
          <h4 className="text-secondary">Collectors by Region</h4>
          {regionStats.length > 0 ? (
            <ul className="list-group mt-3">
              {regionStats.map((region, index) => (
                <li key={index} className="list-group-item">
                  {region.region}: <strong>{region.collector_count}</strong> approved collectors
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted mt-3">No statistics available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
