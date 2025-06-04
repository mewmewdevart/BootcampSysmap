import { CalendarDays, Lock, Users, ChevronDown } from "lucide-react";
import ButtonComponent from "../atoms/ButtonComponent";
import { useState } from "react";

interface UserActivitySectionComponentProps {
  title?: string;
  activities: {
    id: string;
    image: string;
    name: string;
    date: string;
    participants: number;
    private: boolean; 
  }[];
}

function UserActivitySectionComponent({
  title,
  activities = [],
}: UserActivitySectionComponentProps) {
  const [visibleActivities, setVisibleActivities] = useState(activities.slice(0, 8));
  const [hasMoreActivities, setHasMoreActivities] = useState(activities.length > 8);

  const handleLoadMore = () => {
    const nextActivities = activities.slice(visibleActivities.length, visibleActivities.length + 8);
    setVisibleActivities((prev) => [...prev, ...nextActivities]);
    if (visibleActivities.length + nextActivities.length >= activities.length) {
      setHasMoreActivities(false);
    }
  };

  return (
    <article className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full mb-[10px]">
        <h1 className="font-bebas text-[28px]">{title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[12px]">
        {visibleActivities.map((activity) => {
          const truncatedName = activity.name.length > 40 
            ? `${activity.name.slice(0, 40)}...` 
            : activity.name;

          return (
            <button
              key={activity.id}
              className="flex flex-row gap-[12px] items-center relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              type="button"
            >
              {activity.private && ( 
                <div className="bg-gradient-to-b from-[#00BC7D] to-[#009966] p-2 w-[28px] h-[28px] rounded-full flex items-center justify-center absolute top-2 left-2">
                  <Lock className="text-white w-4 h-4" />
                </div>
              )}
              <img
                className="w-[88px] h-[88px] rounded-lg "
                src={activity.image}
                alt={activity.name}
              />
              <div className="flex flex-col gap-[12px]">
                <h2 className="text-[16px] font-dm font-semibold text-left">
                  {truncatedName}
                </h2>
                <div className="flex items-center gap-[6px] text-sm text-neutral-700">
                  <div className="flex items-center gap-[6px]">
                    <CalendarDays className="text-primary-500 w-4 h-4" />
                    <span className="text-xs font-dm font-normal leading-[16px] text-neutral-500">
                      {activity.date}
                    </span>
                  </div>
                  <div className="h-4 w-px bg-neutral-600" />
                  <div className="flex items-center gap-[6px]">
                    <Users className="text-primary-500 w-4 h-4" />
                    <span className="text-xs font-dm font-normal leading-[16px] text-neutral-500">
                      {activity.participants}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {visibleActivities.length === 0 && (
        <div className="w-full flex items-center justify-center my-8">
          <span className="text-neutral-500">Sem mais atividades a serem exibidas</span>
        </div>
      )}

      {hasMoreActivities && (
        <div className="w-full flex items-center justify-center mt-4">
          <ButtonComponent
            label="Ver Mais"
            variant="fullPrimary"
            rightIcon={<ChevronDown />}
            size="large"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </article>
  );
}

export default UserActivitySectionComponent;
