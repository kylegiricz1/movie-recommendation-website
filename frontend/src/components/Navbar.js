import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#111", padding: ".25rem 1rem", mb: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Movie Recommender
        </Typography>
        <Box component="nav" sx={{ display: "flex", gap: 2 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link>
          <Link to="/list" style={{ color: "white", textDecoration: "none" }}>List</Link>
          <Link to="/recommendations" style={{ color: "white", textDecoration: "none" }}>Recommendations</Link>
          <Link to="/wizard" style={{ color: "white", textDecoration: "none" }}>Wizard</Link>
          <Link to="/favorites" style={{ color: "white", textDecoration: "none" }}>Favorites</Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link>
          <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
