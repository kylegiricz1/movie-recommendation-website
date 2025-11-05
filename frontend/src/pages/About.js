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
                            Movie Recommender is an intelligent film discovery platform created to help users explore 
                            and enjoy movies that truly align with their personal tastes. With an ever-expanding database 
                            of films from a wide range of genres, directors, and production styles, our goal is to make 
                            finding your next favorite movie effortless and engaging. Whether you are a dedicated cinephile 
                            or a casual viewer, Movie Recommender provides a curated experience that adapts to your preferences 
                            and evolves as your interests change over time.
                        </p>
                        <p>
                            Our platform goes beyond simple suggestions — it strives to understand your unique viewing patterns 
                            and translate them into meaningful recommendations that reflect both your mood and your curiosity. 
                            By blending data-driven insights with an appreciation for cinematic diversity, we bring you films 
                            that resonate, inspire, and entertain.
                        </p>
                    </section>
                </div>

                <div className="about-section-container">
                    <section className="about-section">
                        <h2>How It Works</h2>
                        <p>
                            At the core of Movie Recommender is a sophisticated recommendation engine that combines advanced 
                            algorithms with user feedback to deliver highly accurate suggestions. The system analyzes key factors 
                            such as genre preferences, user ratings, actor and director choices, and broader popularity trends 
                            within the film community. Using this data, it identifies connections between your past selections 
                            and new titles you are likely to enjoy.
                        </p>
                        <p>
                            Users can explore curated movie lists, browse trending titles, or dive into personalized collections 
                            generated from their own watch history. The platform also enables you to save your favorite movies, 
                            rate films you have seen, and continually refine your profile so that each recommendation becomes 
                            increasingly tailored to your evolving cinematic interests.
                        </p>
                    </section>
                </div>

                <div className="about-section-container">
                    <section className="about-section">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to transform the way people discover and connect with films. In an era where thousands 
                            of new titles are released each year across countless streaming services, it can be overwhelming to 
                            decide what to watch next. Movie Recommender seeks to eliminate that uncertainty by offering a trusted, 
                            personalized, and enjoyable movie-finding experience.
                        </p>
                        <p>
                            We believe great stories deserve to be seen — and that the right recommendation at the right moment 
                            can spark curiosity, emotion, and inspiration. By merging technology with a passion for cinema, 
                            we aim to empower users to spend less time searching and more time immersing themselves in the art 
                            of storytelling.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default About;
