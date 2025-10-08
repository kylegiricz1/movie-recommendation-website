import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Movie recomender</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
        <li><Link to="/favorites"> Favorites</Link></li>
        <li><Link to="/about"> About</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
