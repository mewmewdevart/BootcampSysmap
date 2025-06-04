import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { ZodType } from "zod";
import { useValidation } from "@hooks/useValidation";

interface PasswordFieldComponentProps {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
  validationSchema?: ZodType;
  className?: string;
}

const PasswordFieldComponent: React.FC<PasswordFieldComponentProps> = ({
  id,
  label,
  placeholder = "",
  required = false,
  value = "",
  onChange,
  showPassword,
  toggleShowPassword,
  validationSchema,
  className = "",
}) => {
  const { error, validate } = useValidation(validationSchema);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    validate(newValue);
    onChange(e);
  };

  return (
    <div className="relative text-sm lg:text-base">
      <label
        htmlFor={id}
        className="block font-semibold font-dm text-gray-700"
      >
        {label} {required && <span className="text-warning-500">*</span>}
      </label>
      <div className={`flex items-center border ${error ? "border-warning-500 text-warning-500" : "border-neutral-100"} w-full rounded-lg py-2 pl-5 pr-5 mt-1 h-[56px] focus-within:ring-2 focus-within:ring-primary-500`}>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handlePasswordChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full outline-none ${className}`}
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="text-neutral-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? <EyeClosed /> : <Eye />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-warning-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordFieldComponent;
