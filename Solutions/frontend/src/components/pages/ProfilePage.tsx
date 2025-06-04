import { useEffect, useState } from "react";
import { useUser } from "@context/userContext";
import ProfileTemplate from "@templates/ProfileTemplate";
import imageMedal5 from "@assets/images/medal5Icon.png";
import imageMedal10 from "@assets/images/medal10Icon.png";
import imageMedal15 from "@assets/images/medal15Icon.png";
import { fetchAllUserCreatedActivities, fetchAllUserSubscribedActivities } from "@services/apiService";

import ImageLoading from "@assets/images/loading.gif";

const XP_PER_LEVEL = 50;

function ProfilePage() {
  const { userData, fetchUserData } = useUser();

  const [activeActivities, setActiveActivities] = useState([]);
  const [historicalActivities, setHistoricalActivities] = useState([]);

  useEffect(() => {
    fetchUserData();
    loadCreatedActivities();
    loadParticipatedActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCreatedActivities = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const activities = await fetchAllUserCreatedActivities(token);
      const active = activities.filter((activity: { completedAt: unknown; }) => !activity.completedAt);
      setActiveActivities(
        active.map((activity: { id: string; image: string; title: string; scheduledDate: string; participantCount: number; private: boolean; }) => ({
          id: activity.id,
          image: activity.image,
          name: activity.title,
          date: activity.scheduledDate,
          participants: activity.participantCount,
          isLocked: activity.private,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar as atividades criadas:", error);
    }
  };

  const loadParticipatedActivities = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const activities = await fetchAllUserSubscribedActivities(token);
      const history = activities.filter((activity: { completedAt: unknown; }) => activity.completedAt);
      setHistoricalActivities(
        history.map((activity: { id: string; image: string; title: string; scheduledDate: string; participantCount: number; private: boolean; }) => ({
          id: activity.id,
          image: activity.image,
          name: activity.title,
          date: activity.scheduledDate,
          participants: activity.participantCount,
          isLocked: activity.private,
        }))
      );
    } catch (error) {
      console.error("Erro ao buscar as atividades participantes:", error);
    }
  };

  if (!userData.name) {
    return (
      <section className="flex items-center justify-center h-screen w-full flex-col">
        <img src={ImageLoading} alt="" />
        Carregando...
      </section>
    );
  }

  const currentXP = userData.xp ?? 0;
  const level = userData.level ?? Math.floor(currentXP / XP_PER_LEVEL);
  const progressPercentage = ((currentXP % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const medalTemplates = [
    { image: imageMedal5 },
    { image: imageMedal10 },
    { image: imageMedal15 },
  ];

  const userAchievements = userData.achievements ?? [];

  const medals = medalTemplates.map((medal, index) => {
    if (userAchievements[index]) {
      return {
        image: medal.image,
        description: userAchievements[index].criterion,
        unlocked: true,
      };
    } else {
      return {
        image: medal.image,
        description: "Interaja com a plataforma para desbloquear!",
        unlocked: false,
      };
    }
  });

  return (
    <ProfileTemplate
      avatar={userData.avatar || ""}
      name={userData.name || ""}
      level={level}
      userActivities={activeActivities}
      userActivitiesHistory={historicalActivities}
      points={{ current: currentXP, total: XP_PER_LEVEL }}
      progress={progressPercentage}
      medals={medals}
    />
  );
}

export default ProfilePage;
