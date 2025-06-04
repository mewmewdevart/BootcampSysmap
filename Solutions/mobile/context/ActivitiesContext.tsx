import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchWithAuth,
  createActivity as apiCreateActivity,
  fetchActivityParticipants as apiFetchActivityParticipants,
  updateActivity as apiUpdateActivity,
} from "@services/apiService";

export interface ActivityType {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: string;
  image: string;
  confirmationCode?: string;
  participantCount: number;
  address?: {
    latitude: number;
    longitude: number;
  };
  scheduledDate: string;
  createdAt: string;
  completedAt?: string | null;
  private: boolean;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface ActivitiesContextProps {
  activityTypes: ActivityType[];
  activities: Activity[];
  fetchActivityTypes: () => Promise<void>;
  fetchActivities: (params?: {
    typeId?: string;
    orderBy?: string;
    order?: string;
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  addActivity: (activityData: {
    title: string;
    description: string;
    typeId: string;
    scheduledDate: string;
    private: boolean;
    address: { latitude: number; longitude: number };
    image: File;
  }) => Promise<void>;
  fetchActivityParticipants: (activityId: string) => Promise<void>;
  updateActivity: (
    activityId: string,
    activityData: FormData,
    token: string
  ) => Promise<void>;
}

const ActivitiesContext = createContext<ActivitiesContextProps | undefined>(undefined);

export const ActivitiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

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

  const fetchActivityTypes = async () => {
    if (!token) {
      console.error("Token ausente! Usuário não autenticado.");
      return;
    }
    try {
      const response = await fetchWithAuth("/activities/types", token);
      if (Array.isArray(response)) {
        setActivityTypes(
          response.map(({ id, name, description, image }: ActivityType) => ({ id, name, description, image }))
        );
      } else {
        console.error("Formato inesperado para tipos de atividade:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar tipos de atividade:", error);
    }
  };

  const fetchActivities = async (params?: {
    typeId?: string;
    orderBy?: string;
    order?: string;
    page?: number;
    pageSize?: number;
  }) => {
    if (!token) {
      console.error("Token ausente! Usuário não autenticado.");
      return;
    }
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) queryParams.append(key, String(value));
        });
      }
      const response = await fetchWithAuth(`/activities?${queryParams.toString()}`, token);
      if (typeof response === "object" && response !== null && "activities" in response) {
        const typedResponse = response as { activities?: Activity[] };
        if (typedResponse.activities) {
          const activeActivities = typedResponse.activities.filter(
            (activity: Activity) => activity.completedAt === null
          );
          setActivities(activeActivities);
        } else {
          console.error("Formato inesperado para busca de atividades:", response);
        }
      } else {
        console.error("Resposta inválida ao buscar atividades:", response);
      }
      if (typeof response === "object" && response !== null && "activities" in response) {
        const activeActivities = (response.activities as Activity[]).filter(
          (activity: Activity) => activity.completedAt === null
        );
        setActivities(activeActivities);
      } else {
        console.error("Formato inesperado para busca de atividades:", response);
      }
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    }
  };

  const addActivity = async (activityData: {
    title: string;
    description: string;
    typeId: string;
    scheduledDate: string;
    private: boolean;
    address: { latitude: number; longitude: number };
    image: File;
  }) => {
    if (!token) {
      console.error("Token ausente! Usuário não autenticado.");
      return;
    }
    try {
      const response = await apiCreateActivity(activityData, token);
      if (typeof response === "object" && response !== null && "id" in response) {
        const newActivity = response as Activity;
        setActivities((prev) => [newActivity, ...prev]);
      } else {
        console.error("Formato inesperado ao criar atividade:", response);
        return;
      }
      const newActivity = response as Activity;
      setActivities((prev) => [newActivity, ...prev]);
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
    }
  };

  const fetchActivityParticipants = async (activityId: string) => {
    if (!token) {
      console.error("Token ausente! Usuário não autenticado.");
      return;
    }
    try {
      await apiFetchActivityParticipants(token, activityId);
    } catch (error) {
      console.error("Erro ao buscar participantes da atividade:", error);
    }
  };

  const updateActivity = async (
    activityId: string,
    activityData: FormData,
    tokenParam: string
  ) => {
    try {
      const updatedActivity = await apiUpdateActivity(activityId, activityData, tokenParam);
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === activityId && typeof updatedActivity === "object" && updatedActivity !== null
            ? { ...activity, ...updatedActivity }
            : activity
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar atividade:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchActivityTypes();
    }
  }, [token]);

  useEffect(() => {
    if (activities.length > 0 && token) {
      fetchActivityParticipants(activities[0].id);
    }
  }, [activities, token]);

  return (
    <ActivitiesContext.Provider
      value={{
        activityTypes,
        activities,
        fetchActivityTypes,
        fetchActivities,
        addActivity,
        fetchActivityParticipants,
        updateActivity,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivities = (): ActivitiesContextProps => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities deve ser usado dentro de um ActivitiesProvider");
  }
  return context;
};
