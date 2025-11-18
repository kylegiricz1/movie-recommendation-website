import { useState } from 'react';
import { Link } from "react-router-dom";
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
            Click on the <Link to="/list" className='movie-link'> <b>List of Movies</b> </Link> 
            to get multiple recommendations or the 
            <Link to="/wizard" className='movie-link'> <b>Wizard</b> </Link> 
            to get a single personalized pick!
          </p>
      </section> 
      </div>
    </div>
  );
}

export default HomePage;
