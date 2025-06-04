import { CalendarDays, Lock, Users } from "lucide-react";
import ButtonComponent from "../atoms/ButtonComponent";
import { useNavigate } from "react-router-dom";

interface ActivitySectionComponentProps {
  title: string;
  isLocked: boolean;
  activities: {
    id: string;
    image: string;
    name: string;
    date: string;
    participants: number;
    private: boolean;
  }[];
  onEditActivity?: (activity: {
    id: string;
    image: string;
    name: string;
    date: string;
    participants: number;
    private: boolean;
  }) => void;
}

function ActivitySectionComponent({
  title,
  activities,
  onEditActivity,
}: ActivitySectionComponentProps) {
  const navigate = useNavigate();

  const handleNavigateListType = () => {
    navigate(`/categorias/${title.toLowerCase()}`);
  };

  return (
    <article className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bebas text-[28px]">{title}</h1>
        <ButtonComponent
          label="Ver Mais"
          onClick={handleNavigateListType}
          variant="ghost"
          size="large"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
        {activities.slice(0, 8).map((activity) => (
          <button
            key={activity.id}
            className="flex flex-row gap-[12px] items-center relative cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            type="button"
            onClick={() => onEditActivity?.(activity)}
          >
            {activity.private && (
              <div className="bg-gradient-to-b from-[#00BC7D] to-[#009966] p-2 w-[28px] h-[28px] rounded-full flex items-center justify-center absolute top-2 left-2">
                <Lock className="text-white w-4 h-4" />
              </div>
            )}
            <img
              className="w-[88px] h-[88px] rounded-lg bg-cover object-cover"
              src={activity.image}
              alt={activity.name}
            />
            <div className="flex flex-col gap-[12px]">
              <h2 className="text-[16px] font-dm font-semibold text-left">
                {activity.name}
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
        ))}
      </div>
    </article>
  );
}

export default ActivitySectionComponent;
