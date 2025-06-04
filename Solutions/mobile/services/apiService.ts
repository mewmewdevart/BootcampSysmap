import axios from 'axios';
import { formatDateTime } from "../utils/validation";

const BASE_URL = "http://localhost:3000";

const MESSAGES = {
  ERRORS: {
    UNEXPECTED: "Erro inesperado.",
    INVALID_TOKEN: "Token inválido ou expirado.",
    ACTIVITY_UPDATE: "Erro ao atualizar a atividade.",
    ACTIVITY_FETCH: "Erro ao buscar atividades.",
    ACTIVITY_PARTICIPANTS_FETCH: "Erro ao buscar participantes da atividade.",
    ACTIVITY_CREATE: "Erro ao criar atividade.",
    ACTIVITY_DELETE: "Erro ao deletar atividade.",
    ACTIVITY_CONCLUDE: "Erro ao concluir atividade.",
    PARTICIPANT_APPROVE: "Erro ao aprovar participante.",
    ACTIVITY_SUBSCRIBE: "Erro ao se inscrever na atividade.",
    ACTIVITY_UNSUBSCRIBE: "Erro ao cancelar inscrição na atividade.",
    ACTIVITY_CHECKIN: "Erro ao realizar check-in na atividade.",
  },
  SUCCESS: {
    ACTIVITY_UPDATE: "Atividade atualizada com sucesso!",
    ACTIVITY_CREATE: "Atividade criada com sucesso!",
    ACTIVITY_DELETE: "Atividade deletada com sucesso!",
    ACTIVITY_CONCLUDE: "Atividade concluída com sucesso!",
    PARTICIPANT_APPROVE: "Participante aprovado com sucesso!",
    ACTIVITY_SUBSCRIBE: "Inscrição realizada com sucesso!",
    ACTIVITY_UNSUBSCRIBE: "Inscrição cancelada com sucesso!",
    ACTIVITY_CHECKIN: "Check-in realizado com sucesso!",
  },
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const registerUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    console.error("Register error:", error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.UNEXPECTED);
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/auth/sign-in", data);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.UNEXPECTED);
  }
};

export const fetchWithAuth = async (url: string, token: string) => {
  try {
    const response = await api.get(url, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Fetch with Auth error:", error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.UNEXPECTED);
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error(MESSAGES.ERRORS.INVALID_TOKEN);
    }
    return true;
  } catch (error: any) {
    console.error("Token validation error:", error.response?.data || error);
    return false;
  }
};

export const updateUserData = async (
  data: { name?: string; email?: string; password?: string },
  token: string
) => {
  try {
    const response = await api.put("/user/update", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Update user data error:", error.response?.data || error);
    throw new Error(error.response?.data?.error || "Failed to update user data");
  }
};

export const updateUserAvatar = async (avatar: any, token: string) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const response = await api.put("/user/avatar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Update avatar error:", error.response?.data || error);
    throw new Error(error.response?.data?.error || "Failed to update avatar");
  }
};

export const createActivity = async (
  activityData: {
    title: string;
    description: string;
    typeId: string;
    scheduledDate: string;
    private: boolean;
    address: { latitude: number; longitude: number };
    image: any;
  },
  token: string
) => {
  try {
    const formData = new FormData();
    formData.append("title", activityData.title);
    formData.append("description", activityData.description);
    formData.append("typeId", activityData.typeId);
    formData.append("scheduledDate", activityData.scheduledDate);
    formData.append("private", String(activityData.private));
    formData.append("image", activityData.image);
    formData.append("address", JSON.stringify(activityData.address));

    const response = await api.post("/activities/new", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(MESSAGES.SUCCESS.ACTIVITY_CREATE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_CREATE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_CREATE);
  }
};

export const fetchActivityTypes = async (token: string) => {
  try {
    const response = await api.get("/activities/types", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching activity types:", error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.UNEXPECTED);
  }
};

export const fetchActivities = async (token: string) => {
  try {
    const response = await api.get("/activities/all?orderBy=createdAt&order=desc", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    type ApiActivity = {
      id: string;
      image: string;
      title: string;
      scheduledDate: string;
      participantCount: number;
      private: boolean;
      type: string;
      completedAt: string | null;
    };
    const activities = response.data as ApiActivity[];
    return activities
      .filter((activity: ApiActivity) => activity.completedAt === null)
      .map((activity: ApiActivity) => ({
        id: activity.id,
        image: activity.image,
        name: activity.title,
        date: formatDateTime(activity.scheduledDate),
        participants: activity.participantCount,
        private: activity.private,
        type: activity.type,
      }));
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
  }
};

export const fetchActivityParticipants = async (token: string, activityId: string) => {
  try {
    const response = await api.get(`/activities/${activityId}/participants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_PARTICIPANTS_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_PARTICIPANTS_FETCH);
  }
};

export const subscribeToActivity = async (activityId: string, token: string) => {
  try {
    const response = await api.post(`/activities/${activityId}/subscribe`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(MESSAGES.SUCCESS.ACTIVITY_SUBSCRIBE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_SUBSCRIBE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_SUBSCRIBE);
  }
};

export const updateActivity = async (
  activityId: string,
  activityData: FormData,
  token: string
) => {
  try {
    const response = await api.put(`/activities/${activityId}/update`, activityData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(MESSAGES.SUCCESS.ACTIVITY_UPDATE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_UPDATE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_UPDATE);
  }
};

export const concludeActivity = async (activityId: string, token: string) => {
  try {
    const response = await api.put(`/activities/${activityId}/conclude`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(MESSAGES.SUCCESS.ACTIVITY_CONCLUDE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_CONCLUDE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_CONCLUDE);
  }
};

export const approveParticipant = async (
  activityId: string,
  participantId: string,
  approved: boolean,
  token: string
) => {
  try {
    const response = await api.put(
      `/activities/${activityId}/approve`,
      { participantId, approved },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(MESSAGES.SUCCESS.PARTICIPANT_APPROVE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.PARTICIPANT_APPROVE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.PARTICIPANT_APPROVE);
  }
};

export const checkInActivity = async (
  activityId: string,
  confirmationCode: string,
  token: string
) => {
  try {
    const response = await api.put(
      `/activities/${activityId}/check-in`,
      { confirmationCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(MESSAGES.SUCCESS.ACTIVITY_CHECKIN);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_CHECKIN, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_CHECKIN);
  }
};

export const unsubscribeFromActivity = async (activityId: string, token: string) => {
  try {
    const response = await api.delete(`/activities/${activityId}/unsubscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(MESSAGES.SUCCESS.ACTIVITY_UNSUBSCRIBE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_UNSUBSCRIBE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_UNSUBSCRIBE);
  }
};

export const deleteActivity = async (activityId: string, token: string) => {
  try {
    const response = await api.delete(`/activities/${activityId}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(MESSAGES.SUCCESS.ACTIVITY_DELETE);
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_DELETE, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_DELETE);
  }
};

export const fetchAllActivities = async (token: string) => {
  try {
    const response = await api.get("/activities/all?orderBy=createdAt&order=desc", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    type ApiActivity = {
      id: string;
      image: string;
      title: string;
      scheduledDate: string;
      participantCount: number;
      private: boolean;
      type: string;
      completedAt: string | null;
    };
    const activities = response.data as ApiActivity[];
    return activities
      .filter((activity: ApiActivity) => activity.completedAt === null)
      .map((activity: ApiActivity) => ({
        id: activity.id,
        image: activity.image,
        name: activity.title,
        date: formatDateTime(activity.scheduledDate),
        participants: activity.participantCount,
        private: activity.private,
        type: activity.type,
      }));
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
  }
};

export const fetchUserCreatedActivities = async (token: string, params?: { page?: number; pageSize?: number }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value));
      });
    }
    const response = await api.get(`/activities/user/creator?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
  }
};

export const fetchUserSubscribedActivities = async (token: string, params?: { page?: number; pageSize?: number }) => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value));
      });
    }
    const response = await api.get(`/activities/user/participant?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
  }
};

export const fetchAllUserCreatedActivities = async (token: string) => {
  try {
    const response = await api.get("/activities/user/creator/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
  }
};

export const fetchAllUserSubscribedActivities = async (token: string) => {
  try {
    const response = await api.get("/activities/user/participant/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error.response?.data || error);
    throw new Error(error.response?.data?.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
  }
};
