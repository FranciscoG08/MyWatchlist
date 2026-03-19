import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/navbar.css";
import logo from "../../Images/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const { token, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/movies"> {/* Adicionado o destino */}
          <img src={logo} alt="CineLog Logo" className="logo-img" />
        </Link>
      </div>

      <ul className="navbar-links">
        {/* Botão Filmes sempre visível */}
        <li><Link to="/movies">Filmes</Link></li>

        {!token ? (
          // NÃO LOGADO: mostra Login e Registo
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registo</Link></li>
          </>
        ) : (
          // LOGADO: mostra Watchlist e Logout
          <>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}