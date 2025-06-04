interface CardUserComponentProps {
  pathImage: string;
  nameActivity: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

function CardUserComponent({
  pathImage,
  nameActivity,
  onClick,
  className,
  isActive = false,
}: CardUserComponentProps) {
  const truncatedName =
    nameActivity && nameActivity.length > 20
      ? `${nameActivity.slice(0, 20)}...`
      : nameActivity;

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
        isActive ? "border-primary-500" : "border-transparent"
      } ${className || ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.(); 
      }}
    >
      <img
        className={`w-20 h-20 rounded-full object-cover transition-all duration-300 ease-in-out border-2 ${
          isActive ? "border-primary-500" : "border-transparent"
        }`}
        src={pathImage}
        alt={`Imagem da atividade: ${nameActivity}`}
      />
      <div className="w-22 text-center">
        <h2 className="font-dm font-semibold text-base leading-5 tracking-normal text-neutral-900 break-words">
          {truncatedName}
        </h2>
      </div>
    </div>
  );
}

export default CardUserComponent;

