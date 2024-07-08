import React from "react";
import "../styling/styles.css";
import { Link } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav flex-grow-1 justify-content-around">
            <li className="nav-item">
              <Link to="/" className="link-no-underline">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="link-no-underline">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/purpose" className="link-no-underline">Purpose</Link>
            </li>
            <li className="nav-item">
              <Link to="/about-us" className="link-no-underline">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/careers" className="link-no-underline">Careers</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact-us" className="link-no-underline">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/login-signup" className="link-no-underline">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
