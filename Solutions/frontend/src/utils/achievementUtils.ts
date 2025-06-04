import ToastNotifications from "@atoms/ToastNotifications";

export const XP_PER_LEVEL = 100;
export const XP_FOR_CHECKIN = 10;
export const XP_FOR_CREATOR = 5; 

export const MEDAL_PATHS = [
  { image: "/assets/images/medal5Icon.png", description: "Participou de 5 atividades" },
  { image: "/assets/images/medal10Icon.png", description: "Participou de 10 atividades" },
  { image: "/assets/images/medal15Icon.png", description: "Participou de 15 atividades" },
];

export const calculateLevelAndXP = (currentXP: number, xpGained: number) => {
  const totalXP = currentXP + xpGained;
  const newLevel = Math.floor(totalXP / XP_PER_LEVEL);
  const remainingXP = totalXP % XP_PER_LEVEL;

  return { newLevel, remainingXP };
};

export const isAchievementUnlocked = (
  achievements: { name: string; criterion: string }[],
  achievementName: string
) => {
  return achievements.some((ach) => ach.name === achievementName);
};

export const unlockAchievement = (
  achievements: { name: string; criterion: string }[],
  setAchievements: (achievements: { name: string; criterion: string }[]) => void,
  achievementName: string,
  criterion: string
) => {
  if (isAchievementUnlocked(achievements, achievementName)) {
    return;
  }

  const newAchievement = { name: achievementName, criterion };
  setAchievements([...achievements, newAchievement]);

  ToastNotifications({
    title: "Conquista desbloqueada!",
    description: `${achievementName}: ${criterion}`,
    variant: "success",
  });
};
