import Navbar from '../components/Navbar.js';
import { Box, Paper, Typography, Container } from "@mui/material";

function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f4f6f8", pb: 4 }}>
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: 2, 
              backgroundColor: "rgba(193, 189, 189, 0.336)" 
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Welcome!
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              Movie Recommender helps you discover new films tailored to your taste. 
              Whether you're into thrillers, comedies, or hidden indie gems, 
              our system suggests movies based on your viewing history and preferences.
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6 }}>
              Click on the <b>List of Movies</b> to get multiple recommendations or the <b>Wizard</b> to get a single personalized pick!
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;