import React, { useEffect, useState } from 'react';

function Table() {
    const [data, setData] = useState([]);

    // Get back-end URL
    const URL = window.location.href.replace("3000", "5200") + "/data";

    // Fetch the data from the back-end
    useEffect(() => {
        fetch(URL)
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error("Something went wrong! \n Error: ", error));
    }, []);

    // Show loading text in meantime
    if (data.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <table border="2px solid" cellPadding="5">
            <thead>
                <tr style={{ backgroundColor: "#f2f2f2"}}>
                    <th>Name</th>
                    <th>Year</th>
                    <th>Genres</th>
                    <th>Popularity</th>
                    <th>Vote Average</th>
                    <th>Vote Count</th>
                    <th>Budget</th>
                </tr>
            </thead>
            <tbody>
                {
                    // The different columns of the table
                    data.map((row, position) => (
                        <tr key={position}>
                            <td key={position}>{row.title}</td>
                            <td key={position}>{row.release_date}</td>
                            <td key={position}>{JSON.parse(row.genres).map(item => item.name).join(", ")}</td>
                            <td key={position}>{row.popularity}</td>
                            <td key={position}>{row.vote_average}/10</td>
                            <td key={position}>{row.vote_count}</td>
                            <td key={position}>${row.budget}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;
