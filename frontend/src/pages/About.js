import React from "react";
import Navbar from "../components/Navbar";

function About() {
    return (
        <div>
            <Navbar/>
            <div>
                <h1>About Movie Recommender</h1>
                <p>
                    Movie Recommender is a web application designed to help users discover new movies based on their preferences.
                </p>
            </div> 
        </div>
    )
}

export default About;