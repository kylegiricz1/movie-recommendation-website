import { useState } from 'react';

function App() {
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Selected Genre:", genre);
    // Call your API or filter movies here
  };

  return (
    <div>
      <h1>Movie Recommender</h1>
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
      </form>
    </div>
  );
}

export default App;
