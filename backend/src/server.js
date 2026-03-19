import express from 'express';
import { config } from 'dotenv';
import { connectDB,disconnectDB } from './config/db.js';
import cookieParser from 'cookie-parser'; // 1. Importa aqui
// Import Routes
import authRoutes from './routes/authRoutes.js'
import movieRoutes from './routes/movieRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js'

import cors from "cors";

config();
connectDB();

const app = express();

//Body parsing middleware
app.use(cookieParser()); // 2. ATIVA AQUI (antes das rotas!)
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// ⚠️ CORS middleware deve vir antes das routes
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

//API Routes
app.use("/auth",authRoutes)
app.use("/watchlist",watchlistRoutes)
app.use("/movies",movieRoutes)

const PORT = 5001;
const server = app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});