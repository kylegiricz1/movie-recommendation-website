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
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <label style={{ marginLeft: '12px' }}>
          Release Year:
          <input
            type="number"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <br></br>
      <Table />
    </div>
  );
}

export default HomePage;
