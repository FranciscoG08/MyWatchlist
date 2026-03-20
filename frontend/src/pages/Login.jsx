import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";
import { useAuth } from "../context/AuthContext"; // 1. Importa o hook corretamente
import "../css/login_register.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  // 2. O hook deve ser chamado DENTRO do componente
  const { loginUser } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 3. Guarda a resposta da API para extrair o token
      const res = await login(email, password);
      
      // 4. Verifica como o teu backend envia o token (res.token ou res.data.token)
      const token = res.token || res.data?.token;

      if (token) {
        loginUser(token); // 5. Atualiza o estado global (isto faz a Navbar mudar)
        navigate("/movies");
      } else {
        alert("Token não recebido do servidor.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro no login: Verifique as suas credenciais.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="input-group">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} // Recomenda-se usar value para inputs controlados
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button className="login-button" type="submit">Entrar</button>
      </form>
    </div>
  );
}