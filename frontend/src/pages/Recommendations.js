import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Recommendations.css";

function Recommendations() {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("savedMovies") || "[]");
        setSavedMovies(stored);
    }, []);

    return (
        <div>
            <Navbar />
            <main className="recommendations-main">
                <div className="recommendations-section-container">
                    <section className="recommendations-section">
                        <h1>Your Saved Movie Recommendations</h1>

                        <table border="2px solid" cellPadding="5" id="movieTable">
                            <thead>
                                <tr style={{ backgroundColor: "#f2f2f2", color: "black" }}>
                                    <th>Rank</th>
                                    <th>Movie Name</th>
                                    <th>Year</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedMovies.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                            No saved movies yet — go take the Wizard quiz!
                                        </td>
                                    </tr>
                                ) : (
                                    savedMovies.map((movie, index) => (
                                        <tr key={movie.id || movie.title}>
                                            <td>{index + 1}</td>
                                            <td>{movie.title}</td>
                                            <td>{movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}</td>
                                            <td>{movie.vote_average ? movie.vote_average + "/10" : "N/A"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Recommendations;
