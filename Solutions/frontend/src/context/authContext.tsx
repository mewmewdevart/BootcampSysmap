import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateToken } from "@services/apiService";

interface AuthContextProps {
  token: string | null;
  avatar: string | null;
  level: number | null;
  login: (data: { token: string; avatar: string; level: number }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean; 
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [avatar, setAvatar] = useState<string | null>(localStorage.getItem("avatar"));
  const [level, setLevel] = useState<number | null>(
    localStorage.getItem("level") ? Number(localStorage.getItem("level")) : null
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const isValid = await validateToken(token);
        setIsAuthenticated(isValid);
        if (!isValid) {
          logout();
        }
      }
      setLoading(false);
    };
    checkToken();
  }, [token]);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setAvatar(storedAvatar); 
    }
  }, [avatar]);

  const login = (data: { token: string; avatar: string; level: number }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("avatar", data.avatar);
    localStorage.setItem("level", data.level.toString());
    setToken(data.token);
    setAvatar(data.avatar);
    setLevel(data.level);
    setIsAuthenticated(true);
    setLoading(false);
    navigate("/atividades");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("level");
    setToken(null);
    setAvatar(null);
    setLevel(null);
    setIsAuthenticated(false);
    setLoading(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, avatar, level, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
