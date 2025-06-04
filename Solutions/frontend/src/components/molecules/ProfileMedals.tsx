interface Medal {
  image: string;
  description: string;
  unlocked: boolean;
}

function ProfileMedals({ medals }: { medals: Medal[] }) {
  return (
    <div className="bg-[#F5F5F5] h-[208px] w-full md:w-[414px] rounded-lg flex px-[32px] py-[42px] flex-row gap-x-3 justify-between">
      {medals.map((medal, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-[95px]"
        >
          <div className="w-[80px] h-[80px] rounded-full bg-[#ECECEC] flex items-center justify-center">
            <img src={medal.image} alt={medal.description} className={`w-[40px] h-[48px] ${!medal.unlocked ? "grayscale" : ""}`} />
          </div>
          <span className="text-[12px] text-center">{medal.description}</span>
        </div>
      ))}
    </div>
  );
}

export default ProfileMedals;
