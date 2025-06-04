import imageTrophy from "@assets/images/trophyIcon.png";
import { ProgressComponent } from "@atoms/ProgressComponent";

interface ProfileLevelCardProps {
  level: number;
  points: { current: number; total: number };
  progress: number; 
}

function ProfileLevelCard({ level, points, progress }: ProfileLevelCardProps) {
  return (
    <div className="bg-[#F5F5F5] h-[208px] w-full md:w-[414px] rounded-lg flex px-[32px] py-[42px] flex-col gap-[32px]">
      <div className="flex">
        <div className="flex flex-col w-full">
          <span>Seu nível é</span>
          <span className="text-[25px] font-bold font-dm">{level}</span>
        </div>
        <img src={imageTrophy} alt="Troféu" className="w-[139px] h-[69px]" />
      </div>
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium">
            Pontos para o próximo nível
          </span>
          <span className="text-[16px] font-bold">
            {points.current}/{points.total} pts
          </span>
        </div>
        <ProgressComponent starter={0} current={progress} />
      </div>
    </div>
  );
}

export default ProfileLevelCard;
