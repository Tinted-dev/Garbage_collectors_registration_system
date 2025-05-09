import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"; // Import Form component
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const AdminDashboard = () => {
  const [collectors, setCollectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Get the backend URL

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [editData, setEditData] = useState({
    full_name: "",
    email: "",
    phone: "",
    national_id: "",
    is_approved: false, // Add is_approved to editData
  });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchCollectors = () => {
    axios
      .get(`${API_BASE_URL}/collectors/`) // Use the environment variable
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
  }, [API_BASE_URL]); // Include API_BASE_URL in the dependency array

  const handleDelete = (id) => {
    if (!window.confirm("Delete this collector?")) return;
    axios
      .delete(`${API_BASE_URL}/collectors/${id}`) // Use the environment variable
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
      is_approved: collector.is_approved, // Populate is_approved in editData
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(`${API_BASE_URL}/collectors/${selectedCollector.id}`, editData) // Use the environment variable
      .then(() => {
        setShowEditModal(false);
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
                  <th>Approved</th> {/* New column for approval status */}
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
                    <td>{collector.is_approved ? "Yes" : "No"}</td> {/* Display approval status */}
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
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Collector</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={editData.full_name}
                  onChange={handleEditChange}
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  placeholder="Phone"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>National ID</Form.Label>
                <Form.Control
                  type="text"
                  name="national_id"
                  value={editData.national_id}
                  onChange={handleEditChange}
                  placeholder="National ID"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  name="is_approved"
                  label="Approve Collector"
                  checked={editData.is_approved}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
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