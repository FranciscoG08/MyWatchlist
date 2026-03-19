import "../css/movieCard.css";

export default function WatchListItem({ item, onRemove }) {
  return (
    <div className="movie-card">
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w300${item.movie.poster_path}`}
        alt={item.movie.title}
      />
      <div className="movie-info">
        <h3>{item.movie.title}</h3>
        <span>{item.movie.release_date ? item.movie.release_date.split("-")[0] : "N/A"}</span>
        <p>Status: {item.status}</p>
        <p>Rating: {item.userRating || "N/A"}</p>
        <p>Notas: {item.notes || "—"}</p>
        <p>Progresso: {item.progress || "0%"}</p>
      </div>
      {onRemove && (
        <button className="remove-btn" onClick={() => onRemove(item.movieId)}>
          Remover
        </button>
      )}
    </div>
  );
}