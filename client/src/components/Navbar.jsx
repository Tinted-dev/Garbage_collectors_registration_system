import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-green-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">
        <Link to="/">WasteWatch</Link>
      </h1>
      <div className="flex space-x-4 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/verify-collector" className="hover:underline">Verify</Link>
        <Link to="/register-collector" className="hover:underline">Register</Link>

        {user ? (
          <>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">Admin</Link>
            )}
            <button
              onClick={logout}
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
