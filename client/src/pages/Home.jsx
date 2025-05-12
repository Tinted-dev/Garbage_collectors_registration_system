import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    <div className="bg-light text-dark">
      {/* Hero Section */}
      <div className="container py-5 text-center">
        <h1 className="display-4 text-success fw-bold">Welcome to the Garbage Collectors Portal</h1>
        <p className="lead text-muted">Connecting communities with verified garbage collection companies.</p>
        <div className="mt-4">
          <Link to="/register" className="btn btn-success me-3">Register as a Company</Link>
          <Link to="/search-companies" className="btn btn-outline-success">Find Collectors</Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-5">
        <div className="container">
          <h2 className="text-center text-success mb-4">What You Can Do</h2>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">Verify Collectors</h5>
                  <p className="card-text text-muted">Check if a company is registered and authorized in your area.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">Company Dashboard</h5>
                  <p className="card-text text-muted">Registered companies can manage their profiles and locations.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">Find Services</h5>
                  <p className="card-text text-muted">Easily locate trusted garbage collectors by region or name.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-5 bg-success text-white text-center">
        <div className="container">
          <h2 className="mb-3">Join the movement for a cleaner environment</h2>
          <p className="lead">Whether you're a waste collection company or a citizen, this portal is here for you.</p>
          <Link to="/login" className="btn btn-light btn-lg mt-3">Login Now</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 text-center">
        <div className="container">
          <small>&copy; {new Date().getFullYear()} Garbage Collectors System | Empowering Cleaner Communities</small>
        </div>
      </footer>
    </div>
  );
};

export default Home;
