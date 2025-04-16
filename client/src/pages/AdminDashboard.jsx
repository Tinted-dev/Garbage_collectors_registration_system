import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"; // Assuming this has your green & white theme

const AdminDashboard = () => {
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchCollectors = () => {
    axios
      .get("http://localhost:5000/collectors/")
      .then((res) => {
        setCollectors(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load collectors");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this collector?")) return;
    axios
      .delete(`http://localhost:5000/collectors/${id}`)
      .then(() => fetchCollectors())
      .catch(() => alert("Error deleting collector"));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-success border-2">
        <h2 className="mb-4 text-center text-success">Admin Dashboard</h2>

        {loading ? (
          <p className="text-center">Loading collectors...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : collectors.length === 0 ? (
          <p className="text-center">No collectors registered yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Regions</th>
                  <th>Verifications</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {collectors.map((collector) => (
                  <tr key={collector.id}>
                    <td>{collector.full_name}</td>
                    <td>{collector.email}</td>
                    <td>{collector.phone}</td>
                    <td>
                      {Array.isArray(collector.regions)
                        ? collector.regions.map((r) => r.name).join(", ")
                        : "N/A"}
                    </td>
                    <td>{collector.verifications?.length || 0}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(collector.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
