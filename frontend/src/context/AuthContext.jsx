import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // ao iniciar app → vai buscar token
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // login
  const loginUser = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // logout
  const logoutUser = async () => {
    try {
      // 1. Faz a chamada ao backend para limpar o Cookie
      await api.post("/auth/logout"); // Ajusta o caminho conforme a tua rota
    } catch (err) {
      console.error("Erro ao fazer logout no servidor", err);
    } finally {
      // 2. Limpa o localStorage e o estado, independentemente da resposta
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook para usar facilmente
export const useAuth = () => useContext(AuthContext);