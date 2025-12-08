import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Table from "../components/Table.js";
import { Button, Menu, MenuItem, Checkbox, FormControlLabel, TextField } from '@mui/material';
import "./List.css";

function List() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialLoaded, setInitialLoaded] = useState(false);

  const URL = window.location.origin.replace("5000", "5200") + "/data";
  const URL_filtered = window.location.origin.replace("5000", "5200") + "/data_filtered";

  const [genresAnchor, setGenresAnchor] = useState(null);
  const [ratingsAnchor, setRatingsAnchor] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [year, setYear] = useState('');

  const genreOptions = [
    'action','adventure','animation','comedy','crime','documentary','drama','family','fantasy',
    'history','horror','mystery','romance','science fiction','thriller','war','western'
  ];
  const ratingOptions = ['1','2','3','4','5','6','7','8','9'];

  // Fetch initial data once
  useEffect(() => {
    if (!initialLoaded) {
      fetch(URL)
        .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
        .then(json => setData(json))
        .catch(err => setErrorMessage(err.toString()));
      setInitialLoaded(true);
    }
  }, [initialLoaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setData(null);

    try {
      const response = await fetch(URL_filtered, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ genres: selectedGenres, ratings: selectedRatings, year })
      });
      if (!response.ok) throw new Error(response.statusText);
      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]);
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
  };

  return (
    <div>
      <Navbar />
      <h1>List of Movies</h1>
      <form onSubmit={handleSubmit} style={{display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center"}}>
        {/* Genre Dropdown */}
        <div>
          <Button
            variant="contained"
            color="success"
            onClick={(e) => setGenresAnchor(e.currentTarget)}
          >
            Selected Genres: {selectedGenres.length > 0 ? selectedGenres.join(", ") : "None"}
          </Button>
          <Menu
            anchorEl={genresAnchor}
            open={Boolean(genresAnchor)}
            onClose={() => setGenresAnchor(null)}
          >
            {genreOptions.map(genre => (
              <MenuItem key={genre}>
                <FormControlLabel
                  control={<Checkbox checked={selectedGenres.includes(genre)} onChange={() => toggleGenre(genre)} />}
                  label={genre.charAt(0).toUpperCase() + genre.slice(1)}
                />
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Rating Dropdown */}
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => setRatingsAnchor(e.currentTarget)}
          >
            Selected Ratings: {selectedRatings.length > 0 ? selectedRatings.join(", ") : "None"}
          </Button>
          <Menu
            anchorEl={ratingsAnchor}
            open={Boolean(ratingsAnchor)}
            onClose={() => setRatingsAnchor(null)}
          >
            {ratingOptions.map(r => (
              <MenuItem key={r}>
                <FormControlLabel
                  control={<Checkbox checked={selectedRatings.includes(r)} onChange={() => toggleRating(r)} />}
                  label={`${r}/10`}
                />
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Year Input */}
        <TextField
          type="number"
          label="Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <Button type="submit" variant="contained" color="secondary">Search!</Button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {errorMessage && <div><b>Error:</b><br />{errorMessage}</div>}
        {!errorMessage && data === null && <p><b>Loading movies...</b></p>}
        {data?.error && <div><b>Server-side error:</b><br />{data.error}</div>}
        {data && !data.error && (
          <>
            <b>{data.length} {data.length === 1 ? "movie" : "movies"} found.</b>
            <Table data={data} />
          </>
        )}
      </div>
    </div>
  );
}

export default List;