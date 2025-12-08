import { useState } from "react";
import Link from '@mui/material/Link';
import Navbar from "../components/Navbar.js";
import DarkVeil from "../components/DarkVeil"; 
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, MemoryRouter, StaticRouter } from 'react-router';

import "./HomePage.css";

function HomePage() {
  return (
    <div className="home">
      <Navbar />
      <div className="home-hero">
        <div className="home-hero-bg">
          <DarkVeil />
        </div>
        <div className="home-hero-content">
          <div className="home-section-container">
            <Box sx={{ minWidth: 275 }}>
              <Card sx={{backgroundColor: "rgb(117 190 218 / 20%);", color: "white"}}>
                <CardContent>
                  <CardMedia
                      sx={{ height: 300 }}
                      image="movie.png"
                      title="movies"
                    />
                  <br></br>
                  <Typography variant="h4" component="div">
                    Welcome!
                  </Typography>
                  <br></br>
                  <Typography variant="body">
                    Movie Recommender helps you discover new films tailored to your
                    taste. Whether you're into thrillers, comedies, or hidden indie
                    gems, our system suggests movies based on your viewing history
                    and preferences.
                  </Typography>
                  <br></br>
                  <br></br>
                  <Typography variant="body">
                    Click on the {" "}
                    <Link component={RouterLink} to="/list" underline="none">
                      List of Movies
                    </Link> {" "}
                    to get multiple recommendations or the {" "}
                    <Link component={RouterLink} to="/wizard" underline="none">
                      Wizard
                    </Link>{" "}
                    to get a single personalized pick!
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
