import { useEffect, useState } from "react";
import HomeTemplate from "@templates/HomeTemplate";
import { useActivities } from "@context/activitiesContext";
import { fetchActivities } from "@services/apiService";

type Activity = {
  id: string;
  image: string;
  name: string;
  date: string;
  participants: number;
  private: boolean;
  type: string;
};

function HomePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const { activityTypes } = useActivities();

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const token = localStorage.getItem("token") || "";
        const formattedActivities = await fetchActivities(token);
        setActivities(formattedActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };
    loadActivities();
  }, []);

  return (
    <HomeTemplate activities={activities} activityTypes={activityTypes} />
  );
}

export default HomePage;
