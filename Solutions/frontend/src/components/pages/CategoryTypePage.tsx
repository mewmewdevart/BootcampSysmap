import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryTypeTemplate from "@templates/CategoryTypeTemplate";
import { fetchActivities } from "@services/apiService";
import { useActivities } from "@context/activitiesContext";

type Activity = {
  id: string;
  image: string;
  name: string;
  date: string;
  participants: number;
  private: boolean;
  type: string;
};

function CategoryTypePage() {
  const { category } = useParams();
  const { activityTypes } = useActivities();
  const [activities, setActivities] = useState<Activity[]>([]);

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
    <CategoryTypeTemplate
      category={category || ""}
      activities={activities}
      activityTypes={activityTypes}
    />
  );
}

export default CategoryTypePage;
