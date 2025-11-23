import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function MovieTable({ data }) {
    const headers = ["Name", "Data Realeasd", "Genres", "Popularity", "Vote Average", "Vote Count", "Budget", "Overview"];
    const bodyCellSx = { padding: "10px 16px", verticalAlign: "top", borderBottom: "1px solid #e6e6e6" };
    const budgetCellSx = { color: "#27ae60", fontWeight: 500 };
    const boldTextSx = { fontWeight: 600, color: "#2c3e50" };
    const italicTextSx = { color: "#555", fontStyle: "italic" };
    const rowSx = (index) => ({ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff", 
        "&:hover": { 
            backgroundColor: "#f1f7ff",
            transition: "background-color 0.2s ease-in-out",
        }
    });

    if (!data || data.length === 0) {
        return (
            <TableContainer component={Paper} sx={{ width: "95%", margin: "40px auto", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell key={header} sx={{ backgroundColor: "#2c3e50", color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, padding: "12px 16px" }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={8} sx={{ textAlign: "center", fontWeight: "bold" }}>
                                No movies match your results!
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    return (
        <TableContainer component={Paper} sx={{ width: "95%", margin: "40px auto", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header} sx={{ backgroundColor: "#2c3e50", color: "#ffffff", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600, padding: "12px 16px" }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} sx={rowSx(index)}>
                            <TableCell sx={bodyCellSx}>
                                <span style={boldTextSx}>{row.title}</span>
                            </TableCell>
                            <TableCell sx={bodyCellSx}>{row.release_date}</TableCell>
                            <TableCell sx={bodyCellSx}>
                                {JSON.parse(row.genres).map((g) => g.name).join(", ")}
                            </TableCell>
                            <TableCell sx={bodyCellSx}>{row.popularity}</TableCell>
                            <TableCell sx={bodyCellSx}>{row.vote_average}/10</TableCell>
                            <TableCell sx={bodyCellSx}>{row.vote_count}</TableCell>
                            <TableCell sx={{ ...bodyCellSx, ...budgetCellSx }}>${row.budget}</TableCell>
                            <TableCell sx={{ ...bodyCellSx, ...italicTextSx }}>{row.overview}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MovieTable;