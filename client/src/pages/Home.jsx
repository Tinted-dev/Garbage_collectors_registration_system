import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css"; // Keep your custom styles
import emailjs from '@emailjs/browser';
import { useRef } from 'react';

const Home = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_dvyk4em',
      'template_3yo8e9o',
      form.current,
      'AUmYd-CL8BUBqmN8m'
    ).then((result) => {
      alert("Message sent successfully!");
      form.current.reset();
    }, (error) => {
      alert("Failed to send message. Please try again.");
    });
  };

  return (
    <div className="home-page">
      {/* Hero Section - Modern & Minimalist */}
      <section className="hero-section bg-light py-5">
        <div className="container d-flex flex-column align-items-center text-center py-md-5">
          <h1 className="hero-title display-3 fw-bold text-success mb-3">
            Reimagine Waste. <span className="text-secondary">Build a Greener Future.</span>
          </h1>
          <p className="hero-subtitle lead text-secondary mb-4">
            Connect with verified waste collectors and contribute to cleaner cities.
            Join WasteWatch today!
          </p>
          <div className="d-flex gap-3">
            <Link to="/verify-collector" className="btn btn-success btn-lg px-4 rounded-pill">
              Find a Collector
            </Link>
            <Link to="/register-collector" className="btn btn-outline-success btn-lg px-4 rounded-pill">
              Register as Collector
            </Link>
          </div>
          <img
            src="https://www.greencitytimes.com/wp-content/uploads/2022/05/Shutterstock_1437340853-scaled.jpg"
            alt="Modern Waste Management"
            className="hero-image img-fluid rounded-lg shadow-sm mt-5"
            style={{ maxWidth: "1000px" }}
          />
        </div>
      </section>

      {/* Features Section - Clean Layout */}
      <section className="features-section py-5 bg-white">
        <div className="container text-center">
          <h2 className="section-title text-success mb-5">How WasteWatch Works</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="feature-card card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon bg-success text-white rounded-circle mb-3">
                    <i className="bi bi-search fs-4"></i>
                  </div>
                  <h5 className="feature-title card-title text-success">Verify Collectors</h5>
                  <p className="feature-description card-text text-secondary">
                    Easily search and verify licensed waste collectors in your area for reliable service.
                  </p>
                  <Link to="/verify-collector" className="btn btn-outline-success btn-sm mt-2 rounded-pill">Learn More</Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="feature-card card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon bg-success text-white rounded-circle mb-3">
                    <i className="bi bi-person-plus-fill fs-4"></i>
                  </div>
                  <h5 className="feature-title card-title text-success">Register & Grow</h5>
                  <p className="feature-description card-text text-secondary">
                    Collectors can register their services, reach more clients, and manage their operations efficiently.
                  </p>
                  <Link to="/register-collector" className="btn btn-outline-success btn-sm mt-2 rounded-pill">Join Now</Link>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="feature-card card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="feature-icon bg-success text-white rounded-circle mb-3">
                    <i className="bi bi-gear-fill fs-4"></i>
                  </div>
                  <h5 className="feature-title card-title text-success">Admin Control</h5>
                  <p className="feature-description card-text text-secondary">
                    A dedicated portal for administrators to manage users, data, and ensure platform integrity.
                  </p>
                  <Link to="/login" className="btn btn-outline-success btn-sm mt-2 rounded-pill">Admin Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Engaging Content */}
      <section className="benefits-section py-5 bg-light">
        <div className="container">
          <h2 className="section-title text-success text-center mb-5">The WasteWatch Advantage</h2>
          <div className="row align-items-center">
            <div className="col-md-6">
              <img
                src="https://boxergy.co.uk/wp-content/uploads/2024/03/sustainable-living.jpg"
                alt="Eco-Friendly Living"
                className="img-fluid rounded-lg shadow-sm"
              />
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
              <h3 className="text-success mb-3">Empowering Sustainable Communities</h3>
              <p className="lead text-secondary mb-4">
                WasteWatch is more than just a platform; it's a movement towards a sustainable future.
                By connecting citizens with verified collectors, we're fostering responsible waste management practices.
              </p>
              <ul className="list-unstyled text-secondary">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Transparent and reliable services</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Support local waste management businesses</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i> Contribute to cleaner and healthier environments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Minimalist Cards */}
      <section className="testimonials-section py-5 bg-white">
        <div className="container text-center">
          <h2 className="section-title text-success mb-5">What Our Users Say</h2>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {[
              { text: "WasteWatch made finding a reliable collector so easy! Highly recommended.", name: "Jane M." },
              { text: "As a collector, WasteWatch has significantly helped me grow my business and reach more customers.", name: "Peter K." },
              { text: "This platform is a game-changer for efficient waste management in our city.", name: "Susan L." },
            ].map((testimonial, index) => (
              <div className="col" key={index}>
                <div className="testimonial-card card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <p className="testimonial-text card-text text-secondary">"{testimonial.text}"</p>
                    <h6 className="testimonial-author text-success mt-3">— {testimonial.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - Prominent */}
      <section className="cta-section py-5 bg-success bg-opacity-10">
        <div className="container text-center">
          <h2 className="cta-title display-6 text-success mb-4">Ready to Make a Difference?</h2>
          <p className="cta-subtitle lead text-secondary mb-4">
            Join WasteWatch and be part of the solution for a cleaner, more sustainable future.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/verify-collector" className="btn btn-success btn-lg px-5 rounded-pill">
              Get Started Now
            </Link>
            <Link to="/about" className="btn btn-outline-success btn-lg px-5 rounded-pill">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form - Streamlined */}
      <section className="contact-section py-5 bg-white">
        <div className="container">
          <h2 className="section-title text-success text-center mb-5">Get in Touch</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form ref={form} onSubmit={sendEmail}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-secondary">Your Name</label>
                  <input type="text" name="user_name" className="form-control rounded-pill border-success" id="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-secondary">Your Email</label>
                  <input type="email" name="user_email" className="form-control rounded-pill border-success" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-secondary">Subject</label>
                  <input type="text" name="subject" className="form-control rounded-pill border-success" id="subject" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-secondary">Message</label>
                  <textarea name="message" className="form-control rounded-3 border-success" id="message" rows="5" required></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-success btn-lg px-5 rounded-pill">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Clean and Informative */}
      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container text-center text-md-start">
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-0">
              <h5 className="text-success mb-3">WasteWatch</h5>
              <p className="text-secondary">
                Building sustainable communities through innovative waste management solutions.
              </p>
            </div>
            <div className="col-md-3 mb-3 mb-md-0">
              <h5 className="text-success mb-3">Quick Links</h5>
              <ul className="list-unstyled text-secondary">
                <li><Link to="/verify-collector" className="text-decoration-none text-secondary hover-success">Verify Collectors</Link></li>
                <li><Link to="/register-collector" className="text-decoration-none text-secondary hover-success">Register as Collector</Link></li>
                <li><Link to="/login" className="text-decoration-none text-secondary hover-success">Admin Portal</Link></li>
                <li><Link to="/about" className="text-decoration-none text-secondary hover-success">About Us</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="text-success mb-3">Contact Us</h5>
              <p className="text-secondary"><i className="bi bi-envelope me-2 text-success"></i> info@wastewatch.org</p>
              <p className="text-secondary"><i className="bi bi-telephone me-2 text-success"></i> +254 729 698 288</p>
              <p className="text-secondary"><i className="bi bi-geo-alt me-2 text-success"></i> Nairobi, Kenya</p>
            </div>
          </div>
          <hr className="my-3 border-secondary" />
          <p className="text-center text-secondary">
            &copy; {new Date().getFullYear()} WasteWatch. All rights reserved. 🌱
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;