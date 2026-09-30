function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card">
      {movie.Poster !== "N/A" ? (
        <img src={movie.Poster} alt={movie.Title} />
      ) : (
        <div className="no-poster">No Poster</div>
      )}

      <h3>{movie.Title}</h3>

      <p>Year: {movie.Year}</p>

      <p>Type: {movie.Type}</p>

      <button onClick={() => onClick(movie)}>
        View Details
      </button>
    </div>
  );
}

export default MovieCard;