import React from "react";
import { twMerge } from "tailwind-merge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { useToast } from "@hooks/useToast";

type ToastVariant = "success" | "warning" | "error";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const variantStyles: Record<ToastVariant, { icon: React.ReactNode; styles: string }> = {
  success: {
    icon: <CheckCircle className="size-6 text-green-600" />,
    styles: "border-green-200 bg-green-50 text-green-800",
  },
  warning: {
    icon: <AlertTriangle className="size-6 text-yellow-600" />,
    styles: "border-yellow-200 bg-yellow-50 text-yellow-800",
  },
  error: {
    icon: <XCircle className="size-6 text-warning-500" />,
    styles: "border-red-200 bg-red-50 text-red-800",
  },
};

const ToastNotifications = ({
  title,
  description,
  variant = "success",
  className,
  onClose,
  ...props
}: ToastProps) => {
  const { visible } = useToast(5000, onClose);
  const titleId = React.useId();
  const descriptionId = React.useId();

  if (!visible) return null;

  const { icon, styles } = variantStyles[variant];

  return (
    <div className="px-4 fixed top-4 left-1/2 transform -translate-x-1/2 z-[999] w-full flex justify-center pointer-events-none">
      <div
        role="alert"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={twMerge(
          "lg:max-w-[40%] w-full rounded-md border px-4 py-3 text-sm leading-[20px] flex items-start gap-3 shadow-lg pointer-events-auto transition-all duration-500 ease-in-out animate-fade-in-out",
          styles,
          className
        )}
        {...props}
      >
        <span className="mt-1" aria-hidden="true">
          {icon}
        </span>
        <div className="flex flex-col gap-1">
          <strong id={titleId} className="font-semibold">
            {title}
          </strong>
          {description && (
            <p id={descriptionId} className="text-sm">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToastNotifications;
