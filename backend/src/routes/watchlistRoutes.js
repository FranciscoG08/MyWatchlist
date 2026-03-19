import express from 'express'
import {addToWatchlist,removeFromWatchlist,updateWatchlist,getWatchList} from '../controllers/watchlistController.js'

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()
router.use(authMiddleware); // todas as rotas precisam de autenticação

router.get("/", getWatchList);
router.post("/", addToWatchlist);
router.put("/:movieId", updateWatchlist);
router.delete("/:movieId", removeFromWatchlist);

export default router;