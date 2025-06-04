import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import LogoComponent from "../atoms/LogoComponent";
import { useNavigate } from "react-router-dom";

import imageLoginVerticalLogo from "@assets/images/verticalLogo.png";
import ButtonComponent from "../atoms/ButtonComponent";
import { PlusCircle } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import ModalActivitiesComponent from "../molecules/ModalActivitiesComponent";

interface NavbarComponentProps {
  avatar: string;
  level: number;
}

function NavbarComponent({ avatar, level }: NavbarComponentProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigateToProfile = () => {
    navigate("/perfil");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex justify-between items-center h-[57px]">
      <LogoComponent pathImage={imageLoginVerticalLogo} />

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <ButtonComponent
              label={<span className="hidden sm:inline">Criar atividade</span>}
              leftIcon={<PlusCircle />}
              variant="fullPrimary"
              size="small"
            />
          </DialogTrigger>
          <DialogContent>
            <ModalActivitiesComponent setIsOpen={setIsModalOpen} />
          </DialogContent>
        </Dialog>
        <NavigationMenu className="">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <div className="relative inline-block cursor-pointer">
                  <div
                    aria-haspopup="true"
                    aria-controls="user-menu"
                    className="mt-4 cursor-pointer w-[40px] h-[40px] lg:w-[52px] lg:h-[52px] border-2 border-primary-500 p-0.5 rounded-full overflow-hidden focus-visible:outline-primary-500 focus-visible:outline-offset-2"
                  >
                    <img
                      src={avatar}
                      alt="Abrir menu do usuário"
                      className="w-full h-full object-cover scale-[1.6] object-center pointer-events-none"
                    />
                  </div>

                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 font-bold text-white text-[12px] flex items-center justify-center text-center bg-primary-500 rounded-[4px] px-2 h-[18px] min-w-[28px]">
                    {level}
                  </div>
                </div>
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <NavigationMenuLink onClick={handleNavigateToProfile}>
                  Perfil
                </NavigationMenuLink>
                <NavigationMenuLink onClick={handleLogout}>
                  Sair
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

export default NavbarComponent;
