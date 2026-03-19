import { useEffect, useState } from "react";
import {
  getWatchlist,
  removeFromWatchlist,
  updateWatchlist,
} from "../api/watchlist.js";
import { getMovieById } from "../api/movies.js";
import "../css/movies.css";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await getWatchlist();
        const items = response.data || [];

        if (!Array.isArray(items)) {
          console.error("A watchlist recebida não é um array", items);
          return;
        }

        const moviesWithDetails = await Promise.all(
          items.map(async (item) => {
            try {
              const movieDetails = await getMovieById(item.movieId);
              return { ...item, movie: movieDetails };
            } catch (err) {
              return { ...item, movie: { title: "Filme não encontrado", poster_path: null } };
            }
          })
        );

        setWatchlist(moviesWithDetails);
      } catch (err) {
        console.error("Erro ao buscar watchlist:", err);
      }
    };

    fetchWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    try {
      await removeFromWatchlist(movieId);
      setWatchlist((prev) => prev.filter((m) => m.movieId !== movieId));
      setMessage("Filme removido da watchlist");
      setTimeout(() => setMessage(""), 3000); // Limpa a mensagem após 3s
    } catch (err) {
      console.error(err);
      setMessage("Erro ao remover filme");
    }
  };

  const handleUpdate = async (movieId, data) => {
    try {
      await updateWatchlist(movieId, data);
      setWatchlist((prev) =>
        prev.map((item) =>
          item.movieId === movieId ? { ...item, ...data } : item
        )
      );
      setMessage("Atualizado com sucesso");
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao atualizar");
    }
  };

  return (
    <div className="movies-container">
      <header className="movies-header">
        <h2>Minha Watchlist</h2>
        {message && <p className="alert-message">{message}</p>}
      </header>

      <div className="movies-grid">
        {watchlist.map((item) => (
          <div key={item.movieId} className="movie-card">
            
            {/* ADICIONADO: Imagem do Poster (Tamanho Pequeno) */}
            {item.movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${item.movie.poster_path}`}
                alt={item.movie.title}
                className="movie-poster-small"
              />
            )}

            <div className="movie-info">
              <h3>{item.movie.title}</h3>

              <span>
                {item.movie.release_date ? item.movie.release_date.split("-")[0] : "N/A"}
              </span>

              {/* STATUS */}
              <select
                value={item.status}
                onChange={(e) => handleUpdate(item.movieId, { status: e.target.value })}
              >
                <option value="PLANNED">Planeado</option>
                <option value="WATCHING">A ver</option>
                <option value="WATCHED">Visto</option>
              </select>

              {/* RATING */}
              <input
                type="number"
                min="1" max="10"
                value={item.userRating || ""}
                placeholder="Rating"
                onChange={(e) => handleUpdate(item.movieId, { userRating: Number(e.target.value) })}
              />

              {/* NOTAS */}
              <input
                type="text"
                value={item.notes || ""}
                placeholder="Notas"
                onChange={(e) => handleUpdate(item.movieId, { notes: e.target.value })}
              />

              {/* PROGRESSO */}
              <input
                type="text"
                value={item.progress || ""}
                placeholder="Progresso (ex: 01:20)"
                onChange={(e) => handleUpdate(item.movieId, { progress: e.target.value })}
              />
            </div>

            <button className="add-btn" onClick={() => handleRemove(item.movieId)}>
              Remover
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}