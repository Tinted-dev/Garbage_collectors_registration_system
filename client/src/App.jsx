import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterCollector from "./pages/RegisterCollector";
import VerifyCollector from "./pages/VerifyCollector";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-earth via-limegreen to-forest text-gray-800 font-eco">
        <Router>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-collector" element={<RegisterCollector />} />
              <Route path="/verify-collector" element={<VerifyCollector />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="text-center py-6 text-sm text-green-700 opacity-70">
            &copy; {new Date().getFullYear()} WasteWatch | All rights reserved
          </footer>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;


