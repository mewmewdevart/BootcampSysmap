import { useAuth } from "@/context/authContext";
import NavbarComponent from "@organisms/NavbarComponent";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, avatar, level } = useAuth();

  return (
    <div className="max-w-[1220px] w-full mx-auto px-4 xl:px-0 py-2 2xl:py-6 transition-all duration-300 ease-in-out">
      {isAuthenticated && avatar && level !== null && (
        <NavbarComponent avatar={avatar} level={level} />
      )}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
