import { formatDateTime } from "@utils/validation";

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

export const registerUser = async (data: {
  name: string;
  email: string;
  cpf: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Register response error:", errorData); 
      throw new Error(errorData.error || MESSAGES.ERRORS.UNEXPECTED);
    }

    return await response.json();
  } catch (error) {
    console.error("Register fetch error:", error); 
    throw error;
  }
};

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.UNEXPECTED);
    }

    const responseData = await response.json();
    return {
      token: responseData.token,
      avatar: responseData.avatar,
      level: responseData.level, 
    };
  } catch (error) {
    console.error("Login fetch error:", error);
    throw error;
  }
};

export const fetchWithAuth = async (url: string, token: string) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || MESSAGES.ERRORS.UNEXPECTED);
  }

  return response.json();
};

export const validateToken = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(MESSAGES.ERRORS.INVALID_TOKEN);
    }

    return true;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

export const updateUserData = async (data: { name?: string; email?: string; password?: string }) => {
  try {
    const response = await fetch(`${BASE_URL}/user/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update user data");
    return await response.json();
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

export const updateUserAvatar = async (avatar: File) => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);
    const response = await fetch(`${BASE_URL}/user/avatar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update avatar");
    return await response.json();
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error;
  }
};

export const createActivity = async (activityData: {
  title: string;
  description: string;
  typeId: string;
  scheduledDate: string;
  private: boolean;
  address: { latitude: number; longitude: number };
  image: File;
}) => {
  try {
    const formData = new FormData();
    formData.append("title", activityData.title);
    formData.append("description", activityData.description);
    formData.append("typeId", activityData.typeId);
    formData.append("scheduledDate", activityData.scheduledDate);
    formData.append("private", String(activityData.private));
    formData.append("image", activityData.image);
    formData.append("address", JSON.stringify(activityData.address));

    const response = await fetch(`${BASE_URL}/activities/new`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || MESSAGES.ERRORS.ACTIVITY_CREATE);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_CREATE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_CREATE, error);
    throw error;
  }
};

export const fetchActivityTypes = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/types`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.UNEXPECTED);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching activity types:", error);
    throw error;
  }
};

export const fetchActivities = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/all?orderBy=createdAt&order=desc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
    }

    const activities = await response.json();
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
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error);
    throw error;
  }
};

export const fetchActivityParticipants = async (token: string, activityId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/participants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_PARTICIPANTS_FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_PARTICIPANTS_FETCH, error);
    throw error;
  }
};

export const subscribeToActivity = async (activityId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/subscribe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_SUBSCRIBE);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_SUBSCRIBE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_SUBSCRIBE, error);
    throw error;
  }
};

export const updateActivity = async (
  activityId: string,
  activityData: FormData,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: activityData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_UPDATE);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_UPDATE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_UPDATE, error);
    throw error;
  }
};

export const concludeActivity = async (activityId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/conclude`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_CONCLUDE);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_CONCLUDE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_CONCLUDE, error);
    throw error;
  }
};

export const approveParticipant = async (
  activityId: string,
  participantId: string,
  approved: boolean,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/approve`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participantId, approved }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.PARTICIPANT_APPROVE);
    }

    console.log(MESSAGES.SUCCESS.PARTICIPANT_APPROVE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.PARTICIPANT_APPROVE, error);
    throw error;
  }
};

export const checkInActivity = async (
  activityId: string,
  confirmationCode: string,
  token: string
) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/check-in`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmationCode }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_CHECKIN);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_CHECKIN);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_CHECKIN, error);
    throw error;
  }
};

export const unsubscribeFromActivity = async (activityId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/unsubscribe`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_UNSUBSCRIBE);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_UNSUBSCRIBE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_UNSUBSCRIBE, error);
    throw error;
  }
};

export const deleteActivity = async (activityId: string, token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_DELETE);
    }

    console.log(MESSAGES.SUCCESS.ACTIVITY_DELETE);
    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_DELETE, error);
    throw error;
  }
};

export const fetchAllActivities = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/all?orderBy=createdAt&order=desc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error);
    throw error;
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

    const response = await fetch(`${BASE_URL}/activities/user/creator?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error);
    throw error;
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

    const response = await fetch(`${BASE_URL}/activities/user/participant?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error);
    throw error;
  }
};

export const fetchAllUserCreatedActivities = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/user/creator/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error);
    throw error;
  }
};

export const fetchAllUserSubscribedActivities = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/activities/user/participant/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || MESSAGES.ERRORS.ACTIVITY_FETCH);
    }

    return await response.json();
  } catch (error) {
    console.error(MESSAGES.ERRORS.ACTIVITY_FETCH, error);
    throw error;
  }
};
