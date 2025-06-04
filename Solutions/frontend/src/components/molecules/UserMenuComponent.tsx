import { useState, useEffect, useRef, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "@atoms/ButtonComponent";
import { useAuth } from "@context/authContext";

interface UserMenuComponentProps {
  avatar: string;
  level: number;
}

function UserMenuComponent({ avatar, level }: UserMenuComponentProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLButtonElement>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    avatarButtonRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === "Escape") {
      closeDropdown();
    }
  };

  const handleNavigateToProfile = () => {
    navigate("/perfil");
    closeDropdown();
  };

  const handleLogout = () => {
    logout();
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      firstMenuItemRef.current?.focus();
    }
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative inline-block cursor-pointer">
        <button
          ref={avatarButtonRef}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-controls="user-menu"
          className="cursor-pointer w-[40px] h-[40px] lg:w-[52px] lg:h-[52px] border-2 border-primary-500 p-0.5 rounded-full overflow-hidden focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        >
          <img
            src={avatar}
            alt="Abrir menu do usuário"
            className="w-full h-full object-cover scale-[1.6] object-center pointer-events-none"
          />
        </button>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 font-bold text-white text-[12px] flex items-center justify-center text-center bg-primary-500 rounded-[4px] px-2 h-[18px] min-w-[28px]">
          {level}
        </div>
      </div>

      {isDropdownOpen && (
        <div
          id="user-menu"
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 transition-all duration-200 ease-in-out scale-100 origin-top-right"
          role="menu"
          aria-label="User menu"
        >
          <ButtonComponent
            label="Perfil"
            onClick={handleNavigateToProfile}
            ref={firstMenuItemRef}
            variant="outlineNeutral"
            size="small"
            className="w-full text-left px-4 py-2 hover:bg-neutral-100"
            role="menuitem"
          />
          <ButtonComponent
            label="Sair"
            onClick={handleLogout}
            variant="outlineNeutral"
            size="small"
            className="w-full text-left px-4 py-2 hover:bg-neutral-100"
            role="menuitem"
          />
        </div>
      )}
    </div>
  );
}

export default UserMenuComponent;
