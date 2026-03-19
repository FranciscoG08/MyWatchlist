import api from './api.js';

// GET watchlist
export const getWatchlist = async () => {
  const res = await api.get("/watchlist");
  // O teu backend retorna { status: "success", data: [...] }
  return res.data; 
};

// ADD filme
export const addToWatchlist = async (movieId) => {
  const res = await api.post("/watchlist", { movieId });
  return res.data;
};

// UPDATE filme
export const updateWatchlist = async (movieId, data) => {
  const res = await api.put(`/watchlist/${movieId}`, data);
  return res.data;
};

// DELETE filme
export const removeFromWatchlist = async (movieId) => {
  const res = await api.delete(`/watchlist/${movieId}`);
  return res.data;
};