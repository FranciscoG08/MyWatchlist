import { useEffect, useState } from "react";
import { getPopulars, searchMovies, getMovieById } from "../api/movies.js";
import { addToWatchlist } from "../api/watchlist.js";
import "../css/movies.css";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null); // para modal

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getPopulars();
        setMovies(res.results || res);
      } catch (err) {
        console.error("Erro ao buscar filmes populares:", err);
        setMessage("Erro ao carregar filmes.");
      }
    };

    fetchMovies();
  }, []);

  const handleAddToWatchlist = async (movie) => {
    try {
      await addToWatchlist(movie.id);
      setMessage(`Filme "${movie.title}" adicionado à Watchlist!`);
    } catch (err) {
      console.error("Erro ao adicionar à Watchlist:", err);
      setMessage("Erro ao adicionar à Watchlist.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const res = await searchMovies(searchQuery);
      setMovies(res.results || res);
    } catch (err) {
      console.error("Erro ao buscar filmes:", err);
      setMessage("Erro ao buscar filmes.");
    }
  };

  // Abre modal com detalhes do filme
  const handleOpenModal = async (movieId) => {
    try {
      const movie = await getMovieById(movieId);
      setSelectedMovie(movie);
    } catch (err) {
      console.error("Erro ao carregar detalhes do filme:", err);
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-container">
      <header className="movies-header">
        <h2>Filmes Populares</h2>

        {/* Form de pesquisa */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Pesquisar filme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Pesquisar
          </button>
        </form>

        {message && <p className="alert-message">{message}</p>}
      </header>

      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onClick={() => handleOpenModal(movie.id)}
                style={{ cursor: "pointer" }}
              />
            )}
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <span>
                {movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "N/A"}
              </span>
            </div>
            <button
              className="add-btn"
              onClick={() => handleAddToWatchlist(movie)}
            >
              + Watchlist
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>&times;</button>

            <div className="modal-body">
              <div className="modal-img-container">
                {selectedMovie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                  />
                )}
              </div>

              <div className="modal-text">
                <h2>{selectedMovie.title}</h2>
                <p className="modal-overview">{selectedMovie.overview || "Sem descrição disponível."}</p>

                <div className="modal-details">
                  <p><strong>Lançamento:</strong> {selectedMovie.release_date || "N/A"}</p>
                  <p><strong>Avaliação:</strong> ⭐ {selectedMovie.vote_average || "N/A"}</p>
                </div>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedMovie.title)}+official+trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trailer-link"
                >
                  Ver Trailer no YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}