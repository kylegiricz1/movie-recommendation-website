import React from "react";
import Navbar from "../components/Navbar";
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

function Recommendations() {
  const recommendations = [
    { rank: 1, name: "The Matrix" },
    { rank: 2, name: "Superman" },
    { rank: 3, name: "Ocean 11" },
  ];

  return (
    <div>
      <Navbar />
      <main style={{ padding: "40px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Container maxWidth="md">
          <Paper
            elevation={3}
            style={{
              backgroundColor: "rgba(193, 189, 189, 0.336)",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Your Recommendations
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
              <Table sx={{ minWidth: 300 }} aria-label="recommendations table">
                <TableHead sx={{ backgroundColor: "#2c3e50" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Rank</TableCell>
                    <TableCell sx={{ color: "#fff", fontWeight: 600 }}>Movie Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendations.map((rec, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" },
                        "&:hover": { backgroundColor: "#f1f7ff", transition: "0.2s ease-in-out" },
                      }}
                    >
                      <TableCell>{rec.rank}</TableCell>
                      <TableCell>{rec.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </main>
    </div>
  );
}

export default Recommendations;