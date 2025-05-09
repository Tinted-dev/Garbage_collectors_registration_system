import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar navbar-expand-lg minimalist-navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-white fs-4">
          WasteWatch
        </Link>
        <button className="navbar-toggler border-0" type="button" onClick={toggleMenu} aria-label="Toggle navigation">
          {menuOpen ? <X size={32} color="white" /> : <Menu size={24} color="white" />}
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 gap-2">
            <li className="nav-item">
              <Link to="/" className="nav-link minimalist-nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/verify-collector" className="nav-link minimalist-nav-link" onClick={() => setMenuOpen(false)}>Verify</Link>
            </li>
            <li className="nav-item">
              <Link to="/register-collector" className="nav-link minimalist-nav-link" onClick={() => setMenuOpen(false)}>Register</Link>
            </li>

            {user ? (
              <>
                {user.role === "admin" && (
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link minimalist-nav-link" onClick={() => setMenuOpen(false)}>Admin</Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn minimalist-logout-button btn-sm ms-lg-2"
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link minimalist-nav-link" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;