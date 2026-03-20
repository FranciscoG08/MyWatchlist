import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth.js";
import { useAuth } from "../context/AuthContext"; // 1. Importa o hook
import "../css/login_register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useAuth(); // 2. Extrai a função do contexto

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 3. Captura a resposta do servidor
      const res = await register(email, password);
      
      // 4. Extrai o token da resposta (ajusta conforme o teu backend: res.token ou res.data.token)
      const token = res.token || res.data?.token;

      if (token) {
        // 5. Atualiza o estado global para a Navbar mudar instantaneamente
        loginUser(token); 
        navigate("/movies");
      } else {
        // Fallback caso o backend não faça login automático no registo
        alert("Registo concluído! Por favor, faça login.");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no registo");
    }
  };

  return (
    <div className="login-container"> {/* Mantendo as classes de estilo que já usas */}
      <form className="login-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-button" type="submit">
          Registar
        </button>
      </form>
    </div>
  );
}