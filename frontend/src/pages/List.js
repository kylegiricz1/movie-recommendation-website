import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Table from "../components/Table.js";
import "./List.css";

function List() {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialLoaded, setIntitialLoaded] = useState(false);

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

    var genres = updateGenres();
    var ratings = updateRatings();
    var year = document.getElementById("year").value;

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

  function updateGenres() {
    var checkboxes = document.getElementsByClassName("genre-list");
    var buttonText = "Selected Genres: "
    var genres = []

    // Get all selected genre checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          genres.push(checkboxes[i].value);
          buttonText += checkboxes[i].value + ", "
        }
    }

    // Update button text
    if (genres.length == 0) {
      buttonText = "Selected Genres: None  "
    }
    document.getElementById("genre-button").innerHTML = buttonText.substring(0, buttonText.length - 2);

    return genres;
  }

  function updateRatings() {
    var checkboxes = document.getElementsByClassName("rating-list");
    var buttonText = "Selected Ratings: "
    var ratings = []

    // Get all selected rating checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          ratings.push(checkboxes[i].value);
          buttonText += checkboxes[i].value + ", "
        }
    }

    // Update button text
    if (ratings.length == 0) {
      buttonText = "Selected Ratings: None  "
    }
    document.getElementById("rating-button").innerHTML = buttonText.substring(0, buttonText.length - 2);

    return ratings;
  }

  return (
    <div>
      <Navbar/>
      <h1>List of Movies</h1>
      <form onSubmit={handleSubmit} style={{display: "flex"}}>
        <div class="genre-section">
          <button id="genre-button" style={{margin: "10px"}}>Selected Genres: None</button>
        <div class="genre-menu">
        <label>
          <input type="checkbox" class="genre-list" value="action" onChange={updateGenres}/>Action
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="adventure" onChange={updateGenres}/>Adventure
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="animation" onChange={updateGenres}/>Animation
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="comedy" onChange={updateGenres}/>Comedy
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="crime" onChange={updateGenres}/>Crime
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="documentary" onChange={updateGenres}/>Documentary
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="drama" onChange={updateGenres}/>Drama
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="family" onChange={updateGenres}/>Family
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="fantasy" onChange={updateGenres}/>Fantasy
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="history" onChange={updateGenres}/>History
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="horror" onChange={updateGenres}/>Horror
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="mystery" onChange={updateGenres}/>Mystery
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="romance" onChange={updateGenres}/>Romance
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="science fiction" onChange={updateGenres}/>Science Fiction
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="thriller" onChange={updateGenres}/>Thriller
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="war" onChange={updateGenres}/>War
        </label>
        <br></br>
        <label>
          <input type="checkbox" class="genre-list" value="western" onChange={updateGenres}/>Western
        </label>
        </div>
        </div>

        <div class="rating-section">
          <button id="rating-button" style={{margin: "10px"}}>Selected Ratings: None</button>
        <div class="rating-menu">
        <label>
          <input type="checkbox" class="rating-list" value="1" onChange={updateRatings}/>1/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="2" onChange={updateRatings}/>2/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="3" onChange={updateRatings}/>3/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="4" onChange={updateRatings}/>4/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="5" onChange={updateRatings}/>5/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="6" onChange={updateRatings}/>6/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="7" onChange={updateRatings}/>7/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="8" onChange={updateRatings}/>8/10
        </label>
        <br></br>
               <label>
          <input type="checkbox" class="rating-list" value="9" onChange={updateRatings}/>9/10
        </label>
        <br></br>
        </div>
        </div>



        <label style={{ margin: '10px'}}>
          Release Year:
          &nbsp;
          <input type="number" name="year" id="year"/>
          &nbsp;
        </label>
        <button type="submit">Search!</button>
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
        (<p style={{ textAlign: "center"}}><b>Loading movies...</b></p>): ""
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
                    <b>{data.length} { (data.length == 1) ? "movie" : "movies" } found.</b>
                </div><Table data={data} /></div>) : ""
      }
    </div>
  );
}

export default List;