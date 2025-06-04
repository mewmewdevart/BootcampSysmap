export const XP_FOR_CHECKIN = 10;
export const XP_FOR_CREATOR = 5;

export const calculateLevelAndXP = (currentXP: number, xpGained: number) => {
  const XP_PER_LEVEL = 100;
  const totalXP = currentXP + xpGained;
  const newLevel = Math.floor(totalXP / XP_PER_LEVEL);
  const remainingXP = totalXP % XP_PER_LEVEL;

  return { newLevel, remainingXP };
};

export const unlockAchievement = (
  achievements: { name: string; criterion: string }[],
  setAchievements: (achievements: { name: string; criterion: string }[]) => void,
  achievementName: string,
  criterion: string
) => {
  if (achievements.some((ach) => ach.name === achievementName)) {
    return;
  }

  const newAchievement = { name: achievementName, criterion };
  setAchievements([...achievements, newAchievement]);
};