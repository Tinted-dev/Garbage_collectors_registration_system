import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"; // Make sure your custom styles are in here

const Home = () => {
  return (
    <div>
      {/* Carousel Section */}
      <div id="homepageCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="src/images/slide0.jpg" className="d-block w-100 rounded" alt="Clean Environment" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide2.jpg" className="d-block w-100 rounded" alt="Waste Management" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide3.jpg" className="d-block w-100 rounded" alt="Eco-Friendly City" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#homepageCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#homepageCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Feature Section */}
      <div className="container mt-5">
        <h2 className="text-center text-success mb-4">Empowering Clean Communities 🌍</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-success shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-success">Verify Collectors</h5>
                <p className="card-text">Confirm the authenticity of registered garbage collectors in your area.</p>
                <Link to="/verify-collector" className="btn btn-success">Verify</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-success shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-success">Register as Collector</h5>
                <p className="card-text">Join our eco mission by registering as a certified garbage collector.</p>
                <Link to="/register-collector" className="btn btn-success">Register</Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-success shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title text-success">Admin Portal</h5>
                <p className="card-text">Admins can manage the system and oversee registrations and verifications.</p>
                <Link to="/login" className="btn btn-outline-success">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 py-3 bg-success text-white">
        <p className="mb-0">&copy; {new Date().getFullYear()} WasteWatch - Keeping our environment clean 🌱</p>
      </footer>
    </div>
  );
};

export default Home;
