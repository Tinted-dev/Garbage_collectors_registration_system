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

  // Fetch regions from backend
  useEffect(() => {
    axios.get("http://localhost:5000/regions/")
      .then((res) => setRegions(res.data))
      .catch(() => setStatus("Failed to load regions"));
  }, []);

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
    axios.post("http://localhost:5000/collectors/", formData)
      .then(() => setStatus("Registration successful!"))
      .catch(() => setStatus("Error during registration"));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
      <h2 className="text-2xl font-semibold mb-4">Register as a Garbage Collector</h2>
      {status && <div className="mb-4 text-blue-600">{status}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="national_id"
          placeholder="National ID"
          value={formData.national_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <div>
          <label className="block font-medium mb-1">Select Regions</label>
          <div className="grid grid-cols-2 gap-2">
            {regions.map(region => (
              <label key={region.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.region_ids.includes(region.id)}
                  onChange={() => handleRegionChange(region.id)}
                />
                <span>{region.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterCollector;
