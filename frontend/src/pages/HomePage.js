import { useState } from 'react';
import Table from "../components/Table.js";
import Navbar from '../components/Navbar.js';

function HomePage() {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Selected Genre:", genre);
    console.log("Selected year:", year);
    // Call your API or filter movies here
  };

  return (
    <div>
      <Navbar/>
      <form onSubmit={handleSubmit}>
        Genres:
        <br></br>
        <label>
          <input type="checkbox" name="action" />Action
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="adventure" />Adventure
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="animation" />Animation
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="comedy" />Comedy
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="crime" />Crime
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="documentary" />Documentary
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="drama" />Drama
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="family" />Family
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="fantasy" />Fantasy
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="history" />History
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="horror" />Horror
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="mystery" />Mystery
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="romance" />Romance
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="science-fiction" />Science Fiction
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="thriller" />Thriller
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="war" />War
        </label>
        <br></br>
        <label>
          <input type="checkbox" name="western" />Western
        </label>
        <br></br>
        <label style={{ marginLeft: '12px' }}>
          Release Year:
          &nbsp;
          <input type="date" name="year" value={year} onChange={(e) => setYear(e.target.value)}/>
          &nbsp;
        </label>
        <button type="submit">Submit</button>
      </form>
      <br></br>
      <Table />
    </div>
  );
}

export default HomePage;
