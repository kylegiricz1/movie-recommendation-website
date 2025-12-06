import Button from '@mui/material/Button';

import Rating from '@mui/material/Rating';
import "./Table.css";

function Table({ data }) {
    
    // Save movies to local storage
    function saveMovieToLocalStorage(movie) {
        try {
            var data = localStorage.getItem("savedMovies");
            var existingMovies = JSON.parse(data || "[]");

            // Make sure the same movie isn't saved twice
            if (!(existingMovies.some((item) => item.title === movie.title))) {
                existingMovies.push(movie);
                localStorage.setItem("savedMovies", JSON.stringify(existingMovies));
                return "success";
            } else {
                return "duplicate";
            }
        } catch (e) {
            alert("Something went wrong when saving the movie! \n" + String(e));
            return "error";
        }
    }

    if (data != null && data.length == 0) {
        return (
            <table border="2px solid" cellPadding="5" id="movieTable">
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2", color: 'black'}}>
                        <th>Name</th>
                        <th>Date Released</th>
                        <th>Genres</th>
                        <th>Popularity</th>
                        <th>Vote Average</th>
                        <th>Vote Count</th>
                        <th>Budget</th>
                        <th>Overview</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colspan="8" style={{ textAlign: "center", fontWeight: "bold"}}>No movies match your results!</td>
                    </tr>
                </tbody>
            </table>
        )
    } else {
        return (
                <table border="2px solid" cellPadding="5" id="movieTable">
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2", color: 'black'}}>
                            <th>Name</th>
                            <th>Date Released</th>
                            <th>Genres</th>
                            <th>Popularity</th>
                            <th>Vote Average</th>
                            <th>Vote Count</th>
                            <th>Budget</th>
                            <th>Overview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // The different columns of the table
                            data.map((row, position) => (
                                <tr key={position}>
                                    <td><b>{row.title}</b></td>
                                    <td>{row.release_date}</td>
                                    <td>{JSON.parse(row.genres).map(item => item.name).join(", ")}</td>
                                    <td>{row.popularity}</td>
                                    <td>{row.vote_average}/10
                                        <br></br>
                                        <Rating name="read-only" value={row.vote_average / 2} precision={0.5} readOnly />
                                    </td>
                                    <td>{row.vote_count}</td>
                                    <td>${row.budget}</td>
                                    <td>
                                        <i>{row.overview}</i>
                                        <br></br>
                                        <Button variant="text" 
                                        onClick={(event) => { 
                                            // Save movie to local storage
                                            var response = saveMovieToLocalStorage(row);

                                            // Change button text
                                            if (response == "success") {
                                                event.target.innerHTML = "Saved!";
                                            } else if (response == "duplicate") {
                                                event.target.innerHTML = "Already saved!";
                                            }
                                        }
                                        }>Save this movie</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
        )
    }
}

export default Table;