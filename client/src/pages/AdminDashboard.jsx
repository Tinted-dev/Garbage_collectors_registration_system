import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const AdminDashboard = () => {
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [editData, setEditData] = useState({
    full_name: "",
    email: "",
    phone: "",
    national_id: "",
  });

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

  const openEditModal = (collector) => {
    setSelectedCollector(collector);
    setEditData({
      full_name: collector.full_name,
      email: collector.email,
      phone: collector.phone,
      national_id: collector.national_id,
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/collectors/${selectedCollector.id}`, editData)
      .then(() => {
        setShowModal(false);
        fetchCollectors();
      })
      .catch(() => alert("Failed to update collector"));
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
                  <th>Actions</th>
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
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openEditModal(collector)}
                      >
                        Update
                      </button>
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

        {/* Modal for editing */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Collector</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              name="full_name"
              className="form-control mb-2"
              value={editData.full_name}
              onChange={handleEditChange}
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={editData.email}
              onChange={handleEditChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              className="form-control mb-2"
              value={editData.phone}
              onChange={handleEditChange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="national_id"
              className="form-control mb-2"
              value={editData.national_id}
              onChange={handleEditChange}
              placeholder="National ID"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;
