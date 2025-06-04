import { validateToken } from "@/services/apiService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  token: string | null;
  avatar: string | null;
  level: number | null;
  login: (data: {
    token: string;
    id: string;
    name: string;
    email: string;
    cpf: string;
    avatar: string;
    xp: number;
    level: number;
    achievements: { name: string; criterion: string }[];
  }) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedAvatar = await AsyncStorage.getItem("avatar");
        const storedLevel = await AsyncStorage.getItem("level");

        if (storedToken) {
          const isValid = await validateToken(storedToken);
          setIsAuthenticated(isValid);

          if (isValid) {
            setToken(storedToken);
            setAvatar(storedAvatar);
            setLevel(storedLevel ? Number(storedLevel) : null);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async (data: {
    token: string;
    id: string;
    name: string;
    email: string;
    cpf: string;
    avatar: string;
    xp: number;
    level: number;
    achievements: { name: string; criterion: string }[];
  }) => {
    try {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("userData", JSON.stringify(data));

      setToken(data.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  const logout = async (callback?: () => void) => {
    try {
      await AsyncStorage.multiRemove(["token", "avatar", "level"]);
      setToken(null);
      setAvatar(null);
      setLevel(null);
      setIsAuthenticated(false);

      if (callback) {
        callback();
      }
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, avatar, level, login, logout, isAuthenticated, loading }}
    >
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
