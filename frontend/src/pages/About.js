import React from "react";
import Navbar from "../components/Navbar";
import "./About.css";

function About() {
    return (
        <div>
            <Navbar />

            <main className="about-main">
                <div className="about-section-container">
                <section className="about-section">
                    <h1>About Movie Recommender</h1>
                    <p>
                        Movie Recommender helps you discover new films tailored to your taste. 
                        Whether you’re into thrillers, comedies, or hidden indie gems, 
                        our system suggests movies based on your viewing history and preferences.
                    </p>
                </section>
                </div>

                <div className="about-section-container">
                <section className="about-section">
                    <h2>How It Works</h2>
                    <p>
                        Our recommendation engine uses user ratings, genres, and popularity trends 
                        to find movies that match your interests. You can explore personalized suggestions, 
                        see what’s trending, and save favorites for later.
                    </p>
                </section>
                </div>
                <div className="about-section-container">
                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        We aim to make movie discovery simple and fun — helping you spend less time searching 
                        and more time watching what you love.
                    </p>
                </section>
                </div>
            </main>
        </div>
    );
}

export default About;
