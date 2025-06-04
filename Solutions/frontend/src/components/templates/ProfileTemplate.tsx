import { Pencil } from "lucide-react";
import ButtonComponent from "@atoms/ButtonComponent";
import ProfileHeader from "@molecules/ProfileHeader";
import ProfileLevelCard from "@molecules/ProfileLevelCard";
import ProfileMedals from "@molecules/ProfileMedals";
import { useNavigate } from "react-router-dom";
import UserActivitySectionComponent from "@organisms/UserActivitySectionComponent";

interface ProfileTemplateProps {
  avatar: string;
  name: string;
  level: number;
  points: { current: number; total: number };
  progress: number;
  medals: { image: string; description: string; unlocked: boolean }[];
  userActivitiesHistory: {
    id: string;
    image: string;
    name: string;
    date: string;
    participants: number;
  }[];
  userActivities: {
    id: string;
    image: string;
    name: string;
    date: string;
    participants: number;
  }[];
}

function ProfileTemplate({
  avatar,
  name,
  level,
  points,
  progress,
  medals,
  userActivities,
  userActivitiesHistory,
}: ProfileTemplateProps) {
  const navigate = useNavigate();

  const handleNavigateToEditProfile = () => {
    navigate("/editar-perfil");
  };

  return (
    <section className="flex flex-col min-h-screen gap-y-10">
      <article className="mt-4 lg:mt-8 xl:mt-12 bg-neutral-60 gap-4 rounded-lg p-2 xl:p-10 flex flex-col h-full">
        <div className="flex justify-end">
          <ButtonComponent
            label="Editar perfil"
            variant="outlineNeutral"
            leftIcon={<Pencil />}
            className="font-normal text-neutral-200"
            onClick={handleNavigateToEditProfile}
          />
        </div>
        {avatar && <ProfileHeader avatar={avatar} name={name} className="p-2 xl:p-10 " />}
        <div className="flex w-full gap-[12px] items-center justify-center font-dm flex-col md:flex-row">
          <ProfileLevelCard level={level} points={points} progress={progress} />
          <ProfileMedals medals={medals} />
        </div>
      </article>

      <UserActivitySectionComponent
        title="Minhas atividades"
        activities={userActivities}
      />

      <UserActivitySectionComponent
        title="Histórico de atividades"
        activities={userActivitiesHistory}
      />
    </section>
  );
}

export default ProfileTemplate;
