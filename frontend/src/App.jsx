import { AuthProvider } from "./context/AuthContext"; // Ajusta o caminho
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Movies from "./pages/Movies.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;