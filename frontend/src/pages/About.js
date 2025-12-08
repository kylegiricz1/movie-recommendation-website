import React from "react";
import Navbar from "../components/Navbar";
import { Container, Paper, Typography, Box } from "@mui/material";

function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Navbar />

      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, backgroundColor: "rgba(193,189,189,0.3)" }}>
        <Typography variant="h3" gutterBottom>
          About Movie Recommender
        </Typography>
        <Typography variant="body1" paragraph>
          Movie Recommender is an intelligent film discovery platform created to help users explore 
          and enjoy movies that truly align with their personal tastes. With an ever-expanding database 
          of films from a wide range of genres, directors, and production styles, our goal is to make 
          finding your next favorite movie effortless and engaging. Whether you are a dedicated cinephile 
          or a casual viewer, Movie Recommender provides a curated experience that adapts to your preferences 
          and evolves as your interests change over time.
        </Typography>
        <Typography variant="body1">
          Our platform goes beyond simple suggestions — it strives to understand your unique viewing patterns 
          and translate them into meaningful recommendations that reflect both your mood and your curiosity. 
          By blending data-driven insights with an appreciation for cinematic diversity, we bring you films 
          that resonate, inspire, and entertain.
        </Typography>
      </Paper>

      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, backgroundColor: "rgba(193,189,189,0.3)" }}>
        <Typography variant="h4" gutterBottom>
          How It Works
        </Typography>
        <Typography variant="body1" paragraph>
          At the core of Movie Recommender is a sophisticated recommendation engine that combines advanced 
          algorithms with user feedback to deliver highly accurate suggestions. The system analyzes key factors 
          such as genre preferences, user ratings, actor and director choices, and broader popularity trends 
          within the film community. Using this data, it identifies connections between your past selections 
          and new titles you are likely to enjoy.
        </Typography>
        <Typography variant="body1">
          Users can explore curated movie lists, browse trending titles, or dive into personalized collections 
          generated from their own watch history. The platform also enables you to save your favorite movies, 
          rate films you have seen, and continually refine your profile so that each recommendation becomes 
          increasingly tailored to your evolving cinematic interests.
        </Typography>
      </Paper>

      <Paper sx={{ p: 4, mb: 4, borderRadius: 2, backgroundColor: "rgba(193,189,189,0.3)" }}>
        <Typography variant="h4" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to transform the way people discover and connect with films. In an era where thousands 
          of new titles are released each year across countless streaming services, it can be overwhelming to 
          decide what to watch next. Movie Recommender seeks to eliminate that uncertainty by offering a trusted, 
          personalized, and enjoyable movie-finding experience.
        </Typography>
        <Typography variant="body1">
          We believe great stories deserve to be seen — and that the right recommendation at the right moment 
          can spark curiosity, emotion, and inspiration. By merging technology with a passion for cinema, 
          we aim to empower users to spend less time searching and more time immersing themselves in the art 
          of storytelling.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About;