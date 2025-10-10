import React, { useEffect, useState } from 'react';

function Table() {
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    // Get back-end URL
    const URL = window.location.href.replace("3000", "5200") + "/data";

    // Fetch the data from the back-end
    useEffect(() => {
        fetch(URL)
        .then(response => {
            // HTTP errors
            if (!response.ok) {
                console.error("Something went wrong! \n Error: ", response.status + "\n" + response.statusText);
                setErrorMessage(response.status + "\n" + response.statusText);
            } else {
                return response.json()
            }
        })
        .then(json => setData(json))
        .catch(error => {
            // Other errors
            console.error("Something went wrong! \n Error: ", error);
            setErrorMessage(error.name + "\n" + error.message);
        });
    }, []);

    if (errorMessage !== "") {
        // Show error message
        return (<div style={{ textAlign: "center"}}>
                    <b>Something went wrong when retrieving the movies!</b>
                    <br></br>
                    Error:
                    <br></br>
                    {errorMessage}
                </div>);
    } else if (data.length === 0) {
        // Show loading text in meantime
        return <p style={{ textAlign: "center"}}><b>Loading movies...</b></p>;
    } else if (data.error) {
        // Print error message from server
                return (<div style={{ textAlign: "center"}}>
                    <b>The server said something went wrong when retrieving the movies!</b>
                    <br></br>
                    Server-side error:
                    <br></br>
                    {data.error}
                </div>);
    }

    return (
        <table border="2px solid" cellPadding="5">
            <thead>
                <tr style={{ backgroundColor: "#f2f2f2"}}>
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
                            <td key={position}><b>{row.title}</b></td>
                            <td key={position}>{row.release_date}</td>
                            <td key={position}>{JSON.parse(row.genres).map(item => item.name).join(", ")}</td>
                            <td key={position}>{row.popularity}</td>
                            <td key={position}>{row.vote_average}/10</td>
                            <td key={position}>{row.vote_count}</td>
                            <td key={position}>${row.budget}</td>
                            <td key={position}><i>{row.overview}</i></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;