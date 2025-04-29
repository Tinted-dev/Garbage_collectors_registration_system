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
            <img src="src/images/slide.jpg" className="d-block w-100 rounded" alt="Clean Environment" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide1.jpg" className="d-block w-100 rounded" alt="Waste Management" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide4.jpg" className="d-block w-100 rounded" alt="Eco-Friendly City" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide5.jpg" className="d-block w-100 rounded" alt="Eco-Friendly City" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide6.jpg" className="d-block w-100 rounded" alt="Eco-Friendly City" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide7.jpg" className="d-block w-100 rounded" alt="Eco-Friendly City" />
          </div>
          <div className="carousel-item">
            <img src="src/images/slide8.jpg" className="d-block w-100 rounded" alt="Eco-Friendly City" />
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

      {/* Testimonials Section */}
      <div className="container mt-5">
        <h2 className="text-center text-success mb-4">What People Are Saying 💬</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow">
              <div className="card-body">
                <p className="card-text">"WasteWatch made it easy to find trusted collectors in my neighborhood. The system is seamless and reliable!"</p>
                <h6 className="text-success">— Jane M., Nairobi Resident</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow">
              <div className="card-body">
                <p className="card-text">"As a collector, joining the platform helped me reach more clients and build trust in my services."</p>
                <h6 className="text-success">— Peter K., Registered Collector</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow">
              <div className="card-body">
                <p className="card-text">"WasteWatch is a brilliant initiative. The registration process was straightforward and professional."</p>
                <h6 className="text-success">— Susan L., Environment Officer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white bg-dark bg-opacity-75 mt-5 w-100 pt-5 pb-4">
        <div className="container text-center text-md-start">
          <div className="row text-center text-md-start">
            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">WasteWatch</h5>
              <p>
                Empowering communities through smart waste management. Join us in keeping the environment clean and green.
              </p>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">Quick Links</h5>
              <p><Link to="/verify-collector" className="text-white text-decoration-none">Verify Collectors</Link></p>
              <p><Link to="/register-collector" className="text-white text-decoration-none">Register as Collector</Link></p>
              <p><Link to="/login" className="text-white text-decoration-none">Admin Portal</Link></p>
            </div>
            <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
              <h5 className="text-uppercase mb-4 font-weight-bold text-success">Contact</h5>
              <p><i className="bi bi-envelope-fill me-2"></i> info@wastewatch.org</p>
              <p><i className="bi bi-telephone-fill me-2"></i> +254 700 123 456</p>
              <p><i className="bi bi-geo-alt-fill me-2"></i> Nairobi, Kenya</p>
            </div>
          </div>
          <hr className="my-3 text-white" />
          <div className="text-center">
            &copy; {new Date().getFullYear()} WasteWatch | All rights reserved 🌱
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
