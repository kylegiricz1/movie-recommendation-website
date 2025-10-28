import { useState } from 'react';
import Table from "../components/Table.js";
import Navbar from '../components/Navbar.js';
import "./HomePage.css";

function HomePage() {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    var genres = updateGenres();
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

  return (
    <div>
      <Navbar/>
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
        <label style={{ marginLeft: '12px' }}>
          Release Year:
          &nbsp;
          <input type="number" name="year" id="year"/>
          &nbsp;
        </label>
        <button type="submit">Search!</button>
      </form>
      <br></br>
      <Table/>
    </div>
  );
}

export default HomePage;
