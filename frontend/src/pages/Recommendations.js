import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "./Recommendations.css";

function Recommendations() {
    const [savedMovies, setSavedMovies] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("savedMovies") || "[]");
        setSavedMovies(stored);
    }, []);

    const sortedMovies = [...savedMovies].sort((a, b) => {
        let compare = 0;

        switch (sortConfig.key) {
            case "name":
                compare = a.title.localeCompare(b.title);
                break;
            case "rating":
                compare = (a.vote_average || 0) - (b.vote_average || 0);
                break;
            case "year":
                const yearA = a.release_date ? parseInt(a.release_date.substring(0, 4)) : 0;
                const yearB = b.release_date ? parseInt(b.release_date.substring(0, 4)) : 0;
                compare = yearA - yearB;
                break;
            default:
                break;
        }

        return sortConfig.direction === "asc" ? compare : -compare;
    });

    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
            } else {
                return { key, direction: key === "rating" ? "desc" : "asc" };            
            }
        });
    };

    const renderArrows = (key) => {
        const isActive = sortConfig.key === key;
        const upStyle = {
            color: isActive && sortConfig.direction === "asc" ? "black" : "#ccc",
            fontSize: "0.7em",
            marginLeft: "2px",
        };
        const downStyle = {
            color: isActive && sortConfig.direction === "desc" ? "black" : "#ccc",
            fontSize: "0.7em",
            marginLeft: "1px",
        };
        return (
            <>
                <span style={upStyle}>▲</span>
                <span style={downStyle}>▼</span>
            </>
        );
    };

    return (
        <div>
            <Navbar />
            <main className="recommendations-main">
                <div className="recommendations-section-container">
                    <section className="recommendations-section">
                        <h1>Your Saved Movie Recommendations</h1>

                        <table border="2px solid" cellPadding="5" id="movieTable">
                            <thead>
                                <tr style={{ backgroundColor: "#f2f2f2", color: "black", cursor: "pointer" }}>
                                    <th>Rank</th>
                                    <th onClick={() => handleSort("name")}>Movie Name{renderArrows("name")}</th>
                                    <th onClick={() => handleSort("year")}>Year{renderArrows("year")}</th>
                                    <th onClick={() => handleSort("rating")}>Rating{renderArrows("rating")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedMovies.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                            No saved movies yet — go take the Wizard quiz!
                                        </td>
                                    </tr>
                                ) : (
                                    sortedMovies.map((movie, index) => (
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
