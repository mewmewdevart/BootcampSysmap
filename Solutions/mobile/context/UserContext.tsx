import {
  XP_FOR_CHECKIN,
  XP_FOR_CREATOR,
  calculateLevelAndXP,
  unlockAchievement
} from "@/utils/userUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  id: string | null;
  name: string | null;
  email: string | null;
  cpf: string | null;
  avatar: string | null;
  xp: number | null;
  level: number | null;
  achievements: { name: string; criterion: string }[] | null;
}

interface UserContextProps {
  userData: UserData;
  fetchUserData: () => Promise<void>;
  updateXP: (xpGained: number) => Promise<void>;
  unlockAchievement: (
    achievements: { name: string; criterion: string }[],
    setAchievements: (achievements: { name: string; criterion: string }[]) => void,
    achievementName: string,
    criterion: string
  ) => void;
  fetchUserPreferences: () => Promise<{ key: string; value: string }[]>;
  defineUserPreferences: (preferences: string[]) => Promise<void>;
  updateUserAvatar: (avatarFile: File) => Promise<void>;
  updateUserData: (data: { name?: string; email?: string; password?: string }) => Promise<void>;
  deactivateAccount: () => Promise<void>;
  handleCheckIn: (isCreator: boolean) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData>({
    id: null,
    name: null,
    email: null,
    cpf: null,
    avatar: null,
    xp: null,
    level: null,
    achievements: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        setToken(storedToken);
      } catch (error) {
        console.error("Erro ao carregar token:", error);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    const initializeUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUserData({
          id: data.id,
          name: data.name,
          email: data.email,
          cpf: data.cpf,
          avatar: data.avatar,
          xp: data.xp,
          level: data.level,
          achievements: data.achievements,
        });
      } catch (error) {
        console.error("Error initializing user data:", error);
      }
    };

    if (token) {
      initializeUserData();
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData({
        id: data.id,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        avatar: data.avatar,
        xp: data.xp,
        level: data.level,
        achievements: data.achievements,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const updateXP = async (xpGained: number) => {
    try {
      const { newLevel, remainingXP } = calculateLevelAndXP(userData.xp || 0, xpGained);

      const response = await fetch("http://localhost:3000/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          xp: remainingXP,
          level: newLevel,
        }),
      });

      if (!response.ok) throw new Error("Failed to update XP");

      setUserData((prev) => ({
        ...prev,
        xp: remainingXP,
        level: newLevel,
      }));

      if (newLevel > (userData.level || 0)) {
        unlockAchievement(
          userData.achievements || [],
          (achievements) => setUserData((prev) => ({ ...prev, achievements })),
          "Subiu de nível!",
          `Alcançou o nível ${newLevel}`
        );
      }
    } catch (error) {
      console.error("Error updating XP:", error);
      throw error;
    }
  };

  const handleCheckIn = async (isCreator: boolean) => {
    try {
      const xpGained = isCreator ? XP_FOR_CREATOR : XP_FOR_CHECKIN;
      await updateXP(xpGained);

      if (!isCreator) {
        unlockAchievement(
          userData.achievements || [],
          (achievements) => setUserData((prev) => ({ ...prev, achievements })),
          "Primeiro Check-in",
          "Fez check-in em uma atividade"
        );
      } else {
        unlockAchievement(
          userData.achievements || [],
          (achievements) => setUserData((prev) => ({ ...prev, achievements })),
          "Criador de Atividades",
          "Criou uma atividade"
        );
      }
    } catch (error) {
      console.error("Error handling check-in:", error);
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/preferences", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user preferences");
      return await response.json();
    } catch (error) {
      console.error("Error fetching user preferences:", error);
      throw error;
    }
  };

  const defineUserPreferences = async (preferences: string[]) => {
    try {
      const response = await fetch("http://localhost:3000/user/preferences/define", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });
      if (!response.ok) throw new Error("Failed to define user preferences");
    } catch (error) {
      console.error("Error defining user preferences:", error);
      throw error;
    }
  };

  const updateUserAvatar = async (avatarFile: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      const response = await fetch("http://localhost:3000/user/avatar", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to update avatar");

      const data = await response.json();
      setUserData((prev) => ({
        ...prev,
        avatar: data.avatar,
      }));
      await AsyncStorage.setItem("avatar", data.avatar);
    } catch (error) {
      console.error("Error updating avatar:", error);
      throw error;
    }
  };

  const updateUserData = async (data: { name?: string; email?: string; password?: string }) => {
    try {
      const response = await fetch("http://localhost:3000/user/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update user data");
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  };

  const deactivateAccount = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/deactivate", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao desativar a conta.");
      }

      // Limpa os dados do usuário após a desativação
      setUserData({
        id: null,
        name: null,
        email: null,
        cpf: null,
        avatar: null,
        xp: null,
        level: null,
        achievements: null,
      });
      await AsyncStorage.multiRemove(["token", "userData", "avatar", "level"]);
    } catch (error) {
      console.error("Erro ao desativar a conta:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        fetchUserData,
        updateXP,
        unlockAchievement,
        fetchUserPreferences,
        defineUserPreferences,
        updateUserAvatar,
        updateUserData,
        deactivateAccount,
        handleCheckIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
