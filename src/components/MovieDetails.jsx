function MovieDetails({ movie, closeDetails }) {
  return (
    <div className="details">
      <button onClick={closeDetails}>← Back</button>

      <h2>{movie.Title}</h2>

      {movie.Poster !== "N/A" && (
        <img src={movie.Poster} alt={movie.Title} />
      )}

      <p>Year: {movie.Year}</p>

      <p>Genre: {movie.Genre}</p>

      <p>Director: {movie.Director}</p>

      <p>Actors: {movie.Actors}</p>

      <p>Rating: ⭐ {movie.imdbRating}</p>

      <p>{movie.Plot}</p>
    </div>
  );
}

export default MovieDetails;