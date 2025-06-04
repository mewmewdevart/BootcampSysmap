import { useState } from "react";
import ToastNotifications from "@atoms/ToastNotifications";
import ButtonComponent from "@atoms/ButtonComponent";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
// import CardUserComponent from "./CardUserComponent";

interface ModalClassicComponentProps {
  title: string;
  description: string;
  forceDescription: string;
  hasButtonClose?: boolean;
  typeOfModal: "delete" | "choice";
  primaryButton: {
    label: string;
    onClick: () => void;
    variant: string;
    className?: string;
  };
  secondaryButton: {
    label: string;
    onClick: () => void;
    variant: string;
    className?: string;
  };
}

function ModalClassicComponent({
  title,
  description,
  forceDescription,
  hasButtonClose,
  primaryButton,
  secondaryButton,
  typeOfModal
}: ModalClassicComponentProps) {
  const [toast, setToast] = useState<{
    title: string;
    description?: string;
    variant: "success" | "error";
  } | null>(null);

  return (
    <div className="flex justify-center ">
      {toast && (
        <ToastNotifications
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <DialogContent
        className="w-[572px] h-[296px] sm:w-3xl flex items-center"
        hasButtonClose={hasButtonClose}
      >
        <DialogTitle className="font-heading text-[32px]">{title}</DialogTitle>
        {typeOfModal === "delete" && (
          <DialogDescription>
            {description} <span className="font-bold">{forceDescription}</span>
          </DialogDescription>
      
        )}
        <div className="flex gap-2 justify-end ">
          <DialogClose asChild>
            <ButtonComponent
              label={secondaryButton.label}
              variant={secondaryButton.variant}
              className={secondaryButton.className}
              onClick={secondaryButton.onClick}
            />
          </DialogClose>
          <ButtonComponent
            label={primaryButton.label}
            variant={primaryButton.variant}
            className={primaryButton.className}
            onClick={primaryButton.onClick}
          />
        </div>
      </DialogContent>
    </div>
  );
}

export default ModalClassicComponent;
