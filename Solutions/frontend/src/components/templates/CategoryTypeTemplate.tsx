import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserActivitySectionComponent from "@organisms/UserActivitySectionComponent";
import CardLargeComponent from "@molecules/CardLargeComponent";
import CardUserComponent from "@molecules/CardUserComponent";
import ModalActivitiesComponent from "@molecules/ModalActivitiesComponent";
import { Dialog } from "@/components/ui/dialog";

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
  id: string;
  name: string;
  image: string;
};

type CategoryTypeTemplateProps = {
  category: string;
  activities: Activity[];
  activityTypes: ActivityType[];
};

function CategoryTypeTemplate({
  category,
  activities,
  activityTypes,
}: CategoryTypeTemplateProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityToEdit, setActivityToEdit] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(
    (activity) => activity.type.toLowerCase() === category.toLowerCase()
  );

  const popularActivities = [...filteredActivities]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 8);

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

  return (
    <section className="flex flex-col min-h-screen gap-10">
      <article className="mt-4 lg:mt-8 xl:mt-12">
        <h1 className="font-bebas text-[28px]">Populares em {category}</h1>
        {popularActivities.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 2xl:gap-6 mt-3">
            {popularActivities.map((activity) => (
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
        ) : (
          <p className="text-neutral-500 mt-3">
            Nenhuma atividade disponível na categoria {category}.
          </p>
        )}
      </article>

      {filteredActivities.length > 0 && (
        <UserActivitySectionComponent
          key={category}
          activities={filteredActivities.map((activity) => ({
            ...activity,
            onClick: () => handleEditActivity(activity.id),
          }))}
        />
      )}

      <article>
        <h1 className="font-bebas text-[28px]">Outros tipos de atividades</h1>
        {activityTypes.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-3">
            {activityTypes.map((activityType) => (
              <CardUserComponent
                key={activityType.id}
                nameActivity={activityType.name}
                pathImage={activityType.image}
                className="hover:scale-[1.02] hover:-translate-y-1"
                onClick={() => handleNavigateToCategory(activityType.name)}
              />
            ))}
          </div>
        ) : (
          <p className="text-neutral-500 mt-3">
            Nenhum outro tipo de atividade disponível no momento.
          </p>
        )}
      </article>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalActivitiesComponent
          setIsOpen={setIsModalOpen}
          activityToEdit={activityToEdit}
        />
      </Dialog>
    </section>
  );
}

export default CategoryTypeTemplate;
