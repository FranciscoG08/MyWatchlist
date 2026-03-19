import axios from 'axios';

// Pega a API key do .env
const TMDB_API_KEY = process.env.TMDB_API;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// ===== Função: Filmes populares =====
const getPopulars = async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: 1
      }
    });
    res.json(response.data.results); // retorna lista de filmes
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar filmes populares' });
  }
};

// ===== Função: Pesquisa de filmes =====
const search = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: 'Parametro "q" é obrigatório' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page: 1,
        include_adult: false
      }
    });

    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao pesquisar filmes' });
  }
};

// ===== Função: Detalhes de um filme =====
const getById = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!movieId) {
      return res.status(400).json({ error: 'ID do filme é obrigatório' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar detalhes do filme' });
  }
};

export {getPopulars,search,getById};