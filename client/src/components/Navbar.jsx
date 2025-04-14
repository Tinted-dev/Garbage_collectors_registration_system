import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-green-600 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide">
          <Link to="/">WasteWatch</Link>
        </h1>
        {/* Menu icon - now always visible */}
        <button
          className="text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={32} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu links - toggle visibility */}
      {menuOpen && (
        <div className="mt-4 flex flex-col space-y-2 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/verify-collector" onClick={() => setMenuOpen(false)}>Verify</Link>
          <Link to="/register-collector" onClick={() => setMenuOpen(false)}>Register</Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
              )}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100 w-fit"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
