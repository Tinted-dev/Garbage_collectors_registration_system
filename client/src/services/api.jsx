import axios from 'axios';

// Set up base URL for the API (adjust as needed)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Change to your API base URL

// Create an axios instance with default configurations
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to attach JWT token to requests (if available)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API helper functions

// Login function
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'An error occurred during login');
  }
};

// Register company function
export const registerCompany = async (companyData) => {
  try {
    const response = await api.post('/companies/register', companyData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'An error occurred during registration');
  }
};

// Fetch companies (for SearchCompanies.js)
export const fetchCompanies = async () => {
  try {
    const response = await api.get('/companies');
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching companies');
  }
};

// Fetch a single company by ID (for CompanyDashboard.js)
export const fetchCompanyById = async (companyId) => {
  try {
    const response = await api.get(`/companies/${companyId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'An error occurred while fetching the company');
  }
};

// Update company profile (for CompanyDashboard.js)
export const updateCompany = async (companyId, updatedData) => {
  try {
    const response = await api.put(`/companies/${companyId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'An error occurred while updating the company');
  }
};

// Admin actions (e.g., approve/reject companies)
export const updateCompanyApproval = async (companyId, status) => {
  try {
    const response = await api.put(`/admin/companies/${companyId}/approve`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'An error occurred while updating company approval');
  }
};

export default api;
