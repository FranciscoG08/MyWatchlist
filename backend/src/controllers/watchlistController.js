import { prisma } from "../config/db.js";

// ===== GET: Lista filmes da watchlist do user =====
const getWatchList = async (req, res) => {
  try {
    const userId = req.userId; // definido pelo authMiddleware

    const watchlist = await prisma.watchlistMovie.findMany({
      where: { userId },
      orderBy: { addedAt: "desc" }, // últimos adicionados primeiro
    });

    res.status(200).json({
      status: "success",
      data: watchlist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erro ao buscar watchlist",
    });
  }
};

// ===== POST: Adiciona filme à watchlist =====
const addToWatchlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { movieId, status = "PLANNED" } = req.body;

    if (!movieId) {
      return res.status(400).json({ error: "movieId é obrigatório" });
    }

    // verifica se o filme já existe na watchlist do user
    const existing = await prisma.watchlistMovie.findUnique({
      where: { userId_movieId: { userId, movieId } },
    });

    if (existing) {
      return res.status(400).json({ error: "Filme já está na watchlist" });
    }

    const newMovie = await prisma.watchlistMovie.create({
      data: {
        userId,
        movieId,
        status,
      },
    });

    res.status(201).json({
      status: "success",
      data: newMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao adicionar filme" });
  }
};

// ===== PUT: Atualiza filme da watchlist =====
const updateWatchlist = async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = parseInt(req.params.movieId);
    const { status, userRating, notes, progress } = req.body;

    const updatedMovie = await prisma.watchlistMovie.update({
      where: { userId_movieId: { userId, movieId } },
      data: {
        ...(status && { status }),
        ...(userRating && { userRating }),
        ...(notes && { notes }),
        ...(progress && { progress }),
      },
    });

    res.status(200).json({
      status: "success",
      data: updatedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar filme" });
  }
};

// ===== DELETE: Remove filme da watchlist =====
const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.userId;
    const movieId = parseInt(req.params.movieId);

    await prisma.watchlistMovie.delete({
      where: { userId_movieId: { userId, movieId } },
    });

    res.status(200).json({
      status: "success",
      message: "Filme removido da watchlist",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover filme" });
  }
};

export {getWatchList,addToWatchlist,updateWatchlist,removeFromWatchlist};