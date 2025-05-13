import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [regions, setRegions] = useState([]);
  const [regionFilter, setRegionFilter] = useState('');

  useEffect(() => {
    fetchCompanies();
    fetchRegions();
  }, []);

  const token = localStorage.getItem("access_token"); // Ensure it's set after login

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("/admin/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCompanies(response.data); // ✅ This is what was missing
      setFiltered(response.data); // Optional: show all on first load
    } catch (error) {
      console.error("Error fetching companies", error.response || error);
    }
  };
  
  


  const fetchRegions = async () => {
    try {
      const res = await axios.get('/admin/regions'); // or `/regions` if you expose it generally
      if (Array.isArray(res.data)) {
        setRegions(res.data);
      } else {
        console.error('Error fetching regions: Data is not an array', res.data);
        setRegions([]); // Initialize as an empty array to prevent errors
      }
    } catch (err) {
      console.error('Error fetching regions', err);
      setRegions([]); // Initialize as an empty array in case of an error
    }
  };

  const handleSearch = () => {
    let filteredList = companies;

    if (searchTerm) {
      filteredList = filteredList.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (regionFilter) {
      filteredList = filteredList.filter((c) =>
        c.regions.some((r) => r.name === regionFilter)
      );
    }

    setFiltered(filteredList);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, regionFilter]);

  return (
    <div className="container mt-4">
      <h2>Verify Garbage Collectors</h2>
      <p>Search by company name or region</p>

      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map((region) => (
              <option key={region.id} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map((company) => (
          <div key={company.id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5>{company.name}</h5>
                <p>{company.description}</p>
                <p className="mb-1">
                  <strong>Email:</strong> {company.email}
                </p>
                <p className="mb-1">
                  <strong>Regions:</strong>{' '}
                  {company.regions.map((r) => r.name).join(', ')}
                </p>
                <span className="badge bg-success">Approved</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted">No companies match your search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchCompanies;