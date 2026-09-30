import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchMovies() {
    if (!search.trim()) {
      setError("Please enter a movie name");
      return;
    }

    setLoading(true);
    setError("");
    setSelectedMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  async function showDetails(movie) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
      );

      const data = await response.json();

      setSelectedMovie(data);
    } catch {
      setError("Unable to load movie details");
    }

    setLoading(false);
  }

  return (
    <div className="app">
      <Navbar />

      <Searchbar
        search={search}
        setSearch={setSearch}
        searchMovies={searchMovies}
      />

      {loading && <p className="message">Loading...</p>}

      {error && <p className="message">{error}</p>}

      {selectedMovie ? (
        <MovieDetails
          movie={selectedMovie}
          closeDetails={() => setSelectedMovie(null)}
        />
      ) : (
        <div className="movie-container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={showDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;