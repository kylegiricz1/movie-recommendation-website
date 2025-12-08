import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import DarkVeil from "../components/DarkVeil"; 

import "./HomePage.css";

function HomePage() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-hero">
        <div className="home-hero-bg">
          <DarkVeil />
        </div>
        <div className="home-hero-content">
          <div className="home-section-container">
            <section className="home-section">
              <h1>Welcome!</h1>
              <p>
                Movie Recommender helps you discover new films tailored to your
                taste. Whether you're into thrillers, comedies, or hidden indie
                gems, our system suggests movies based on your viewing history
                and preferences.
              </p>
              <p>
                Click on the{" "}
                <Link to="/list" className="movie-link">
                  List of Movies
                </Link>{" "}
                to get multiple recommendations or the{" "}
                <Link to="/wizard" className="movie-link">
                  Wizard
                </Link>{" "}
                to get a single personalized pick!
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;