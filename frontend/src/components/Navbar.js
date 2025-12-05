import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Tabs, Tab, Typography, Box } from "@mui/material";
import "./Navbar.css";

const PAGES = [
  { label: "Home", path: "/" },
  { label: "List of Movies", path: "/list" },
  { label: "Recommendations", path: "/recommendations" },
  { label: "Wizard", path: "/wizard" },
  { label: "About", path: "/about" },
  { label: "Profile", path: "/profile" },
];

function Navbar() {
  const location = useLocation();
  const currentPath =
    PAGES.find((page) => page.path === location.pathname)?.path || false;

  return (
    <AppBar position="static" color="primary" className="navbar" elevation={3}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 600,
            marginRight: "2rem",
          }}
          className="navbar-logo"
        >
          Movie Recommender
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={currentPath}
            textColor="inherit"
            indicatorColor="secondary"
            aria-label="main navigation tabs"
            className="navbar-links"
          >
            {PAGES.map((page) => (
              <Tab
                key={page.path}
                label={page.label}
                value={page.path}
                component={Link}
                to={page.path}
                sx={{
                  textTransform: "none",
                  fontSize: "0.95rem",
                  minHeight: "64px",
                  fontWeight: currentPath === page.path ? 600 : 400,
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

  
export default Navbar;
