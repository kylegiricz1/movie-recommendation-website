import { useState } from 'react';
import Navbar from '../components/Navbar.js';
import "./HomePage.css";

function HomePage() {

  return (
    <div>
      <Navbar/>
      <h1>Home Page</h1>
      <div className="home-section-container">
      <section className="home-section">
          <h1>Welcome!</h1>
          <p>
              Movie Recommender helps you discover new films tailored to your taste. 
              Whether you're into thrillers, comedies, or hidden indie gems, 
              our system suggests movies based on your viewing history and preferences.
          </p>
          <p>
            Click on the <b>List of Movies</b> to get multiple reccomendations or the <b>Wizard</b> to get a single personalized pick!
          </p>
      </section>
      </div>
    </div>
  );
}

export default HomePage;
