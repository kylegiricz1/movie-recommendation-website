import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table"; // Your custom table component
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import "../pages/HomePage.css";

function HomePage() {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Genre:", genre);
    console.log("Selected Year:", year);
    // Call API or filter movies here
  };

  return (
    <>
      <Navbar />
      <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Movie Search
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Genre"
                variant="outlined"
                size="small"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <TextField
                label="Release Year"
                type="number"
                variant="outlined"
                size="small"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <Button type="submit" variant="contained" sx={{ px: 3, py: 1 }}>
                Submit
              </Button>
            </Box>
          </form>
        </Paper>

        <Table /> {/* Your movie table */}
      </Box>
    </>
  );
}

export default HomePage;