import React, { useEffect, useState } from 'react';

function Table() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/data")
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error("Something went wrong! \n Error: ", error));
    }, []);

    if (data.length === 0) {
        return <p>Loading...</p>;
    }

    const headers = Object.keys(data[0])

    return (
        <table border="1" cellPadding="5">
            <thead>
                <tr>
                    {
                        headers.map((header, position) => (
                            <th key={position}>{header}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, position) => (
                        <tr key={position}>
                            {
                                headers.map((header, i) => (
                                    <td key={i}>{row[header]}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table;