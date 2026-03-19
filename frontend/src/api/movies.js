import api from './api.js'

// Filmes populares
export const getPopulars = async () => {
  const res = await api.get("/movies/popular");
  return res.data;
};

// Pesquisa
export const searchMovies = async (query) => {
  const res = await api.get(`/movies/search?q=${query}`);
  return res.data;
};

// Detalhes
export const getMovieById = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};