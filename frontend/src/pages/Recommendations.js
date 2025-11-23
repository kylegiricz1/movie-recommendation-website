import Navbar from "../components/Navbar";
import "./Recommendations.css";

function Recommendations() {
    return (
        <div>
            <Navbar />
            <main className="recommendations-main">
                <div className="recommendations-section-container">
                    <section className="recommendations-section">
                        <h1>Your Recommendations</h1>
                        <table border="2px solid" cellPadding="5" id="movieTable">
                            <thead>
                                <tr style={{ backgroundColor: "#f2f2f2", color: 'black'}}>
                                    <th>Rank</th>
                                    <th>Movie Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>The Matrix</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Superman</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Ocean 11</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Recommendations;
