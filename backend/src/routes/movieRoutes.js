import express from 'express'
import { getPopulars, search, getById } from '../controllers/movieController.js'

const router = express.Router()

// Filmes populares
router.get("/popular", getPopulars);

// Pesquisa de filmes (query: ?q=nome)
router.get("/search", search);

// Detalhes de um filme
router.get("/:id", getById);

export default router;