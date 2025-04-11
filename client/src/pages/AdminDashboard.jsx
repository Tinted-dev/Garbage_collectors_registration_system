import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [collectors, setCollectors] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchCollectors = () => {
    axios.get("http://localhost:5000/collectors/")
      .then(res => setCollectors(res.data))
      .catch(() => console.error("Failed to load collectors"));
  };

  useEffect(() => {
    fetchCollectors();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this collector?")) return;
    axios.delete(`http://localhost:5000/collectors/${id}`)
      .then(() => fetchCollectors())
      .catch(() => alert("Error deleting collector"));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {collectors.length === 0 ? (
        <p>No collectors registered yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Regions</th>
              <th className="p-2">Verifications</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {collectors.map((collector) => (
              <tr key={collector.id} className="border-t">
                <td className="p-2">{collector.full_name}</td>
                <td className="p-2">{collector.email}</td>
                <td className="p-2">{collector.phone}</td>
                <td className="p-2">
                  {collector.regions.map(r => r.name).join(", ")}
                </td>
                <td className="p-2">{collector.verifications.length}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(collector.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
