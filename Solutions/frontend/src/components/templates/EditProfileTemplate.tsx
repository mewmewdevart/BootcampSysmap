import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, Trash2 } from "lucide-react";
import ButtonComponent from "@atoms/ButtonComponent";
import PasswordFieldComponent from "@atoms/PasswordFieldComponent";
import ValidatedFieldComponent from "@atoms/ValidatedFieldComponent";
import NameFieldComponent from "@atoms/NameFieldComponent";
import { fetchWithAuth, updateUserData } from "@services/apiService";
import { emailSchema, passwordSchema } from "@utils/validation";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "@molecules/ProfileHeader";
import ToastNotifications from "@atoms/ToastNotifications";
import { MESSAGES } from "@constants/messages";
import { useUser } from "@/context/userContext";
import { Dialog, DialogContent, DialogTrigger } from "@ui/dialog";
import ModalClassicComponent from "@molecules/ModalClassicComponent";
import { useAuth } from "@/context/authContext";

interface EditProfileTemplateProps {
  userData: {
    avatar: string;
    name: string;
    email: string;
    cpf: string;
  };
}

function EditProfileTemplate({ userData }: EditProfileTemplateProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [localUserData, setLocalUserData] = useState({
    ...userData,
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{
    title: string;
    description?: string;
    variant: "success" | "error";
  } | null>(null);

  const { updateUserAvatar: updateAvatarInContext } = useUser();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchWithAuth(
          "/user",
          localStorage.getItem("token") || ""
        );
        setLocalUserData({
          avatar: data.avatar,
          name: data.name,
          email: data.email,
          password: "",
          cpf: data.cpf,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserData({
        name: localUserData.name,
        email: localUserData.email,
        password: localUserData.password,
      });
      if (avatarFile) {
        await updateAvatarInContext(avatarFile);
      }
      setToast({
        title: MESSAGES.SUCCESS.UPDATE_PROFILE,
        description: MESSAGES.SUCCESS.UPDATE_PROFILE_DESCRIPTION,
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setToast({
        title: MESSAGES.ERRORS.UPDATE_PROFILE,
        description: MESSAGES.ERRORS.UPDATE_PROFILE_DESCRIPTION,
        variant: "error",
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setAvatarFile(file);
      const previewURL = URL.createObjectURL(file);
      setLocalUserData((prev) => ({
        ...prev,
        avatar: previewURL,
      }));
    }
  };

  const handleClickAvatarDiv = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleNavigateToProfile = () => {
    navigate("/perfil");
  };

  const handleDeactivateAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/user/deactivate", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || MESSAGES.ERRORS.UNEXPECTED);
      }

      setToast({
        title: MESSAGES.SUCCESS.DEACTIVATE_ACCOUNT,
        description: MESSAGES.SUCCESS.DEACTIVATE_ACCOUNT_DESCRIPTION,
        variant: "success",
      });

      setTimeout(() => {
        logout();
      }, 3000);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : MESSAGES.ERRORS.UNEXPECTED;
      setToast({
        title: MESSAGES.ERRORS.DEACTIVATE_ACCOUNT,
        description: errorMessage,
        variant: "error",
      });
    }
  };

  return (
    <section className="flex flex-col min-h-screen items-center">
      {toast && (
        <ToastNotifications
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <article className="mt-4 lg:mt-8 xl:mt-12 gap-4 py-2 xl:py-10 flex flex-col h-full w-[320px]">
        <div className="flex justify-start">
          <ButtonComponent
            label="Voltar para o perfil"
            variant="ghost"
            leftIcon={<ChevronLeft />}
            size="large"
            onClick={handleNavigateToProfile}
          />
        </div>

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleFormSubmit}>
          <div className="relative self-center">
            {localUserData.avatar ? (
              <ProfileHeader
                avatar={localUserData.avatar}
                className="p-2 xl:pt-10 "
              />
            ) : (
              <div className="rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sem avatar</span>
              </div>
            )}

            <button
              onClick={handleClickAvatarDiv}
              className="w-[48px] h-[48px] rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center absolute bottom-10 right-4 cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              style={{ boxShadow: "0px 2px 4px 0px #00000040" }}
            >
              <Camera className="text-black w-6 h-6" />
            </button>

            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
          </div>
          <NameFieldComponent
            id="name"
            label="Nome completo"
            type="text"
            placeholder="Ex.: João Silva"
            required
            value={localUserData.name}
            onChange={(e: { target: HTMLInputElement }) =>
              setLocalUserData((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <ValidatedFieldComponent
            id="cpf"
            label="CPF"
            type="text"
            placeholder="Ex.: 123.456.789-01"
            value={localUserData.cpf}
            disabled
            readOnly
          />
          <ValidatedFieldComponent
            id="email"
            label="E-mail"
            type="email"
            placeholder="Ex.: joao@email.com"
            required
            value={localUserData.email}
            onChange={(e: { target: HTMLInputElement }) =>
              setLocalUserData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            validationSchema={emailSchema}
          />
          <PasswordFieldComponent
            id="password"
            label="Senha"
            placeholder="Ex.: joao123"
            value={localUserData.password}
            onChange={(e: { target: HTMLInputElement }) =>
              setLocalUserData((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            showPassword={showPassword}
            toggleShowPassword={() => setShowPassword(!showPassword)}
            validationSchema={passwordSchema}
          />
          <ButtonComponent
            label="Salvar alterações"
            variant="fullPrimary"
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary-600 rounded mt-2"
            type="submit"
          />
        </form>

        <div className="w-full flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <ButtonComponent
                label="Desativar minha conta"
                variant="ghost"
                leftIcon={<Trash2 />}
                size="large"
                className="text-warning-500"
              />
            </DialogTrigger>
            <DialogContent>
              <ModalClassicComponent
                typeOfModal="delete"
                title="Tem certeza que deseja desativar sua conta?"
                description="Ao desativar sua conta, todos os seus dados e histórico de atividades serão permanentemente removidos."
                forceDescription=" Esta ação é irreversível e não poderá ser desfeita."
                hasButtonClose={false}
                primaryButton={{
                  label: "Desativar",
                  onClick: handleDeactivateAccount,
                  variant: "fullNeutral",
                  className: "bg-warning-500 hover:bg-warning-600 min-w-[123px]",
                }}
                secondaryButton={{
                  label: "Cancelar",
                  onClick: () => {},
                  variant: "outlineNeutral",
                  className: "min-w-[123px]",
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </article>
    </section>
  );
}

export default EditProfileTemplate;
