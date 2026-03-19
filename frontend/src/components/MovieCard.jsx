import "../css/movieCard.css";

export default function MovieCard({ movie, onAddWatchlist }) {
  return (
    <div className="movie-card">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span>{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</span>
      </div>
      {onAddWatchlist && (
        <button className="add-btn" onClick={() => onAddWatchlist(movie)}>
          + Watchlist
        </button>
      )}
    </div>
  );
}