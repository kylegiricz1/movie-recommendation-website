import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

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
    setUser({"name": "John Doe", "pastRecommendations": ["Inception", "The Matrix", "Interstellar"]});
    setLoading(false);
    //fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>User Profile</h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && user && (
        <div>
          <p><strong>Name:</strong> {user.name}</p>

          <h3>Past Recommendations</h3>
          {user.pastRecommendations && user.pastRecommendations.length > 0 ? (
            <ul>
              {user.pastRecommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p>No past recommendations.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
