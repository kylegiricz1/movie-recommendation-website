import React from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table.js";
import "./List.css";

function List() {

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    var genres = updateGenres();
    var ratings = updateRatings();
    var year = document.getElementById("year").value;

    var table = document.getElementById("movieTable")

    if (table != null) {
      // Go through each row
      for (var i = 1; i < table.rows.length; i++) {
        if (genres.length == 0) {
          table.rows[i].style.display="table-row";
        } else {
          // If the movie genres does not include all of the selected genres, then hide the row
          // I went through each selected genre and see if it was in the table cell text or not
          var movieGenres = table.rows[i].cells[2].textContent.toLowerCase();
          for (var j = 0; j < genres.length; j++) {
            if (!movieGenres.includes(genres[j])) {
              table.rows[i].style.display="none";
              break;
            } else {
              table.rows[i].style.display="table-row";
            }
          }
        }

        // Similarly, I went through each selected rating and see if it was in the table cell text or not
        if (ratings.length != 0) {
            var movieRating = table.rows[i].cells[4].textContent.split("/")[0];
            for (var j = 0; j < ratings.length; j++) {
              if (movieRating.includes(ratings[j] + ".")) {
                table.rows[i].style.display="table-row";
                break;
              } else {
                table.rows[i].style.display="none";
              }
            }
        }

        // If the movie year doesn't match the selected year, hide the row
        var movieYear = table.rows[i].cells[1].textContent;
        if (year != "" && !movieYear.includes(year)) {
            table.rows[i].style.display="none";
        }
      }
    }
  };

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
      <form onSubmit={handleSubmit}>
        <div class="genre-section">
          <button id="genre-button">Selected Genres: None</button>
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
          <input type="checkbox" class="genre-list" value="science-fiction" onChange={updateGenres}/>Science Fiction
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

        <br></br>

        <div class="rating-section">
          <button id="rating-button">Selected Ratings: None</button>
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

        <br></br>

        <label style={{ marginLeft: '12px' }}>
          Release Year:
          &nbsp;
          <input type="number" name="year" id="year"/>
          &nbsp;
        </label>
        <button type="submit">Search!</button>
      </form>
      <br></br>
      <br></br>
      <Table/>
    </div>
  );
}

export default List;