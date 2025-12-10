import Button from '@mui/material/Button';
import { memo } from 'react';
import Rating from '@mui/material/Rating';
import "./Table.css";

// Use memo to prevent table from updating every time another U.I. component updates
const Table = memo(function Table({ data }) {
    
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

    if (data != null && data.length === 0) {
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
                                    <td data-label="Name"><b>{row.title}</b></td>

                                    <td data-label="Date Released">{row.release_date}</td>

                                    <td data-label="Genres">
                                        {JSON.parse(row.genres).map(item => item.name).join(", ")}
                                    </td>

                                    <td data-label="Popularity">{row.popularity}</td>

                                    <td data-label="Vote Average">
                                        {row.vote_average}/10
                                        <br />
                                        <Rating 
                                            name="read-only" 
                                            value={row.vote_average / 2} 
                                            precision={0.5} 
                                            readOnly 
                                        />
                                    </td>

                                    <td data-label="Vote Count">{row.vote_count}</td>

                                    <td data-label="Budget">${row.budget}</td>

                                    <td data-label="Overview">
                                        <i>{row.overview}</i>
                                        <br />
                                        <Button
                                            variant="text"
                                            onClick={(event) => {
                                                const response = saveMovieToLocalStorage(row);
                                                if (response === "success") event.target.innerHTML = "Saved!";
                                                if (response === "duplicate") event.target.innerHTML = "Already saved!";
                                            }}
                                        >
                                            Save this movie
                                        </Button>
                                    </td>
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
        )
    }
});

export default Table;