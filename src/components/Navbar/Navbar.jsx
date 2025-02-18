import React from "react";
import { Link } from "react-router-dom";
import "./../styles/style.css"; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <a href="/">Logo</a>
        </div>
        <div className="nav-links">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/about" className="nav-link">
            About
          </a>
          <a href="/services" className="nav-link">
            Services
          </a>
          <a href="/get-user" className="nav-link">
            Get User{" "}
          </a>
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </div>
        <div className="auth-links">
          <Link to="/login" className="btn login">
            Login
          </Link>
          <Link to="/register" className="btn register">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
