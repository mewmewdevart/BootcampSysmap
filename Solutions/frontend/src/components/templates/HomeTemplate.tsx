import { useState } from "react";
import CardUserComponent from "@molecules/CardUserComponent";
import ActivitySectionComponent from "@organisms/ActivitySectionComponent";
import CardLargeComponent from "@molecules/CardLargeComponent";
import { useNavigate } from "react-router-dom";
import ModalActivitiesComponent from "@molecules/ModalActivitiesComponent";
import { Dialog } from "@/components/ui/dialog";
import { JSX } from "react/jsx-runtime";

type Activity = {
  id: string;
  image: string;
  name: string;
  date: string;
  participants: number;
  private: boolean;
  type: string;
};

type ActivityType = {
  name: string;
  image: string;
};

type HomeTemplateProps = {
  activities: Activity[];
  activityTypes: ActivityType[];
};

function HomeTemplate({ activities, activityTypes }: HomeTemplateProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);

  const handleNavigateToCategory = (categoryName: string) => {
    navigate(`/categorias/${categoryName.toLowerCase()}`);
  };

  const handleEditActivity = (activityId: string) => {
    const activity = activities.find((a) => a.id === activityId);
    if (activity) {
      setActivityToEdit(activity);
      setIsModalOpen(true);
    }
  };

  const renderSection = (title: string, content: JSX.Element | string) => (
    <article className="my-4 lg:my-8 xl:my-12">
      <h1 className="font-bebas text-[1.75rem]">{title}</h1>
      {typeof content === "string" ? (
        <p className="text-neutral-500 mt-[0.75rem]">{content}</p>
      ) : (
        content
      )}
    </article>
  );

  const renderRecommendationCards = () => {
    const sortedActivities = activities
      .sort((a, b) => b.participants - a.participants || new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 8);

    return renderSection(
      "Recomendado para você",
      sortedActivities.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[1rem] 2xl:gap-[1.5rem] mt-[0.75rem]">
          {sortedActivities.map((activity) => (
            <CardLargeComponent
              key={activity.id}
              pathImage={activity.image}
              nameActivity={activity.name}
              date={activity.date}
              participants={activity.participants}
              isLocked={activity.private}
              onClick={() => handleEditActivity(activity.id)}
            />
          ))}
        </div>
      ) : "Nenhuma atividade recomendada disponível no momento."
    );
  };

  const renderActivityIcons = () => {
    if (activityTypes.length === 0) {
      return renderSection(
        "Tipos de atividade",
        "Nenhum tipo de atividade disponível no momento."
      );
    }

    return renderSection(
      "Tipos de atividade",
      <div className="flex flex-wrap gap-[1rem] mt-[0.75rem]">
        {activityTypes.map((activityType, index) => (
          <CardUserComponent
            key={index}
            nameActivity={activityType.name}
            pathImage={activityType.image}
            className="hover:scale-[1.02] hover:-translate-y-1"
            onClick={() => handleNavigateToCategory(activityType.name)}
          />
        ))}
      </div>
    );
  };

  const renderActivitySections = () => {
    const groupedActivities = activities.reduce((acc, activity: Activity) => {
      if (!acc[activity.type]) {
        acc[activity.type] = [];
      }
      acc[activity.type].push(activity);
      return acc;
    }, {} as Record<string, Activity[]>);

    if (Object.keys(groupedActivities).length === 0) {
      return (
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-[1.75rem] w-full">
          <p className="text-neutral-500">Nenhuma atividade disponível no momento.</p>
        </article>
      );
    }

    return (
      <article className="grid grid-cols-1 lg:grid-cols-2 gap-[1.75rem] w-full">
        {Object.entries(groupedActivities).map(([type, activities]: [string, Activity[]], index: number) => (
          <ActivitySectionComponent
            key={index}
            title={type}
            activities={activities}
            onEditActivity={(activity: Activity) => handleEditActivity(activity.id)}
          />
        ))}
      </article>
    );
  };

  return (
    <section className="flex flex-col min-h-screen">
      {renderRecommendationCards()}
      {renderActivityIcons()}
      {renderActivitySections()}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalActivitiesComponent
          setIsOpen={setIsModalOpen}
          activityToEdit={activityToEdit}
        />
      </Dialog>
    </section>
  );
}

export default HomeTemplate;
