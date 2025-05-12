import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
  const navigate = useNavigate();

  // You can enhance this with actual AuthContext for login state
  const isAuthenticated = false;
  const isAdmin = false;

  const handleLogout = () => {
    // Clear auth tokens, logout logic here
    alert("Logged out!");
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-success">
          WasteWatch
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/search-companies">Search Collectors</Nav.Link>
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
            {isAuthenticated && !isAdmin && (
              <Nav.Link as={Link} to="/company-dashboard">Dashboard</Nav.Link>
            )}
            {isAuthenticated && isAdmin && (
              <Nav.Link as={Link} to="/admin-dashboard">Admin Panel</Nav.Link>
            )}
          </Nav>
          {isAuthenticated && (
            <Button variant="outline-success" onClick={handleLogout} className="rounded-pill">
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
