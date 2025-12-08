import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Paper, Typography, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:5000/api/user");
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Error loading user data");
      } finally {
        setLoading(false);
      }
    }

    setUser({
      name: "John Doe",
      pastRecommendations: ["Inception", "The Matrix", "Interstellar"]
    });
    setLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#eae7e7" }}>
          <Typography variant="h4" gutterBottom>User Profile</Typography>

          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <CircularProgress />
            </Box>
          )}

          {error && <Typography color="error">{error}</Typography>}

          {!loading && !error && user && (
            <div>
              <Typography variant="h6" gutterBottom><strong>Name:</strong> {user.name}</Typography>

              <Typography variant="h6" gutterBottom>Past Recommendations</Typography>
              {user.pastRecommendations && user.pastRecommendations.length > 0 ? (
                <List>
                  {user.pastRecommendations.map((rec, index) => (
                    <ListItem key={index} style={{ marginBottom: "8px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "4px" }}>
                      <ListItemText primary={rec} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No past recommendations.</Typography>
              )}
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Profile;