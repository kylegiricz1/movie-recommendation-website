import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Table from "../components/Table.js";
import "./List.css";
import { CircularProgress } from "@mui/material";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function List() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialLoaded, setIntitialLoaded] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedYear, setSelectedYear] = React.useState("");

  const genres = [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Mystery",
      "Romance",
      "Science Fiction",
      "Thriller",
      "War",
      "Western"
  ];

  const ratings = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
  ];

      // If externalData is provided by a parent (e.g., Wizard), use it; otherwise fetch from backend
    const URL = window.location.origin.replace("5000", "5200") + "/data";
    const URL_filtered = window.location.origin.replace("5000", "5200") + "/data_filtered";

    // Ensure this code is only called once and not every render
    if (!initialLoaded) {
      // Fetch the data from the back-end
      fetch(URL)
      .then(response => {
          // HTTP errors
          if (!response.ok) {
              console.error("Something went wrong! \n Error: ", response.status + "\n" + response.statusText);
              setErrorMessage(response.status + "\n" + response.statusText);
          } else {
              return response.json();
          }
      })
      .then(json => setData(json))
      .catch(error => {
          // Other errors
          console.error("Something went wrong! \n Error: ", error);
          setErrorMessage(error.name + "\n" + error.message);
      });
      setIntitialLoaded(true);
  }

  async function handleSubmit (e) {
    e.preventDefault(); // Prevent page reload

    var genres = selectedGenres;
    var ratings = selectedRatings;
    var year = String(selectedYear);

    // Reset data
    setErrorMessage("");
    setData(null);

    try {
        // Send filters to back-end
        const response = await fetch(URL_filtered, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "genres": genres, "ratings": ratings, "year": year })
        });

        // Something went wrong!
        if (!response.ok) {
          setErrorMessage("Something went wrong when retrieveing the data! \n" + response.status + " " + response.statusText);
          return
        }

        const responseData = await response.json();

        // Response was empty
        if (!responseData) {
          setErrorMessage("No data was returned!");
        }
        
        // Update with new data
        setData(responseData)
    } catch (error) {
        // Something else went wrong
        setErrorMessage("Something went wrong when retrieveing the data! \n" + error.message);
        setData(null);
    }
  }

  return (
    <div>
      <Navbar/>
      <h1>List of Movies</h1>
      <form onSubmit={handleSubmit}>
        <Stack 
          direction={{ xs: "column", sm: "column", md: "row" }} 
          spacing={2}
          sx={{ width: "100%" }}
        >

          <Autocomplete
            multiple
            id="genres-select"
            options={genres}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            sx={{ minWidth: 300 }}
            onChange={(event, value) => {
              // Convert each selected item into the right format for the back-end filter
              var selected = [];
              value.forEach((element) => {
                selected.push(element.toLowerCase().replace(" ", "-"));
              });
              setSelectedGenres(selected);
            }}

            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              // Put checkboxes for each list item
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              );
            }}

            renderInput={(params) => (
              // The auto-complete textbox
              <TextField {...params} label="Selected Genres" placeholder="Genres" />
            )}
          />

          <Autocomplete
            multiple
            id="ratings-select"
            options={ratings}
            disableCloseOnSelect
            getOptionLabel={(option) => option + "/10"}
            sx={{ minWidth: 300 }}
            onChange={(event, value) => { setSelectedRatings(value); }}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              // Put checkboxes for each individual item
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option + "/10"}
                </li>
              );
            }}

            renderInput={(params) => (
              // Once again the auto-complete textbox
              <TextField {...params} label="Selected Ratings" placeholder="Ratings" />
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={"Release Year"} views={["year"]} onChange={(newValue, context) => {
              if (context.validationError === null && newValue != null) {
                setSelectedYear(newValue.year());
              } else {
                setSelectedYear("");
              }
            }}/>
          </LocalizationProvider>
          
          <Button variant="contained" type="submit">Search!</Button>
        </Stack>
      </form>
      <br></br>
      <br></br>

      { // Show error message
        (errorMessage !== "") ?
        (<div style={{ textAlign: "center"}}>
                    <b>Something went wrong when retrieving the movies!</b>
                    <br></br>
                    Error:
                    <br></br>
                    {errorMessage}
                </div>) : ""
      }

      { // Show loading text in meantime
        (errorMessage === "" && data === null) ?
        (<p style={{ textAlign: "center"}}><CircularProgress /><br></br><b>Loading movies...</b></p>): ""
      }

      { // Print error message from server if any
        (data != null && data.error) ?
                (<div style={{ textAlign: "center"}}>
                    <b>The server said something went wrong when retrieving the movies!</b>
                    <br></br>
                    Server-side error:
                    <br></br>
                    {data.error}
                </div>) : ""
      }

      { // Only show if there's data and no errors
        (data != null && errorMessage === "" && !data.error) ?
        (<div><div style={{ textAlign: "center"}}>
                    <b>{data.length} { (data.length === 1) ? "movie" : "movies" } found.</b>
                </div><Table data={data} /></div>) : ""
      }
    </div>
  );
}

export default List;
