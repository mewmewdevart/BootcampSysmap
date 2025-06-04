import { CalendarDays, Users, Lock } from "lucide-react";

interface CardLargeComponentProps {
  pathImage: string;
  nameActivity?: string;
  date?: string;
  participants?: number;
  isLocked: boolean;
  onClick?: () => void;
}

function CardLargeComponent({
  pathImage,
  nameActivity,
  date,
  participants,
  isLocked,
  onClick,
}: CardLargeComponentProps & { onClick?: () => void }) {
  
  const truncatedName = nameActivity && nameActivity.length > 30 
    ? `${nameActivity.slice(0, 30)}...` 
    : nameActivity;

  return (
    <div
      tabIndex={0}
      role="button"
      className="w-full cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-lg"
      onClick={onClick}
    >
      <div className="flex flex-col w-full relative">
        {isLocked && (
          <div className="bg-gradient-to-b from-[#00BC7D] to-[#009966] p-2 w-[28px] h-[28px] rounded-full flex items-center justify-center absolute top-2 left-2">
            <Lock className="text-white w-4 h-4" />
          </div>
        )}

        <img
          src={pathImage}
          alt={`Imagem da atividade física : ${nameActivity}`}
          className="w-full h-40 rounded-lg object-cover"
        />

        <h2 className="text-base font-semibold font-dm leading-[20px] tracking-[0] my-[16px]">
          {truncatedName}
        </h2>

        <div className="flex items-center gap-[6px] text-sm text-neutral-700">
          <div className="flex items-center gap-[6px]">
            <CalendarDays className="text-primary-500 w-4 h-4" />
            <span className="text-xs font-dm font-normal leading-[16px] text-neutral-500">
              {date}
            </span>
          </div>

          <div className="h-4 w-px bg-neutral-600" />

          <div className="flex items-center gap-[6px]">
            <Users className="text-primary-500 w-4 h-4" />
            <span className="text-xs font-dm font-normal leading-[16px] text-neutral-500">
              {participants}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardLargeComponent;
