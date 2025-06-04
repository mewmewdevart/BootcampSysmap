function ProfileHeader({ avatar, name, className }: { avatar: string; name?: string, className?: string }) {
  return (
    <div className={`flex items-center justify-center flex-col ${className}`}>
      <img
        src={avatar ?? ""}
        alt="Avatar"
        className="w-[192px] h-[192px] rounded-full object-cover"
      />
      <h1 className="text-[32px] font-bebas font-normal my-[16px]">
        {name}
      </h1>
    </div>
  );
}

export default ProfileHeader;
