import React from "react";
import { ZodType } from "zod";
import { useValidation } from "@hooks/useValidation";

interface ValidatedFieldComponentProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationSchema?: ZodType;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean; 
}

const ValidatedFieldComponent: React.FC<ValidatedFieldComponentProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  required = false,
  value = "",
  onChange,
  validationSchema,
  className = "",
  disabled = false,
  readOnly = false,
}) => {
  const { error, validate } = useValidation(validationSchema || null); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && !readOnly && validationSchema) { 
      const newValue = e.target.value;
      validate(newValue);
      onChange?.(e);
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm lg:text-base font-semibold font-dm text-gray-700"
      >
        {label} {required && <span className="text-warning-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full border ${error ? "border-warning-500 text-warning-500" : "border-neutral-100"} rounded-lg py-2 pl-5 pr-5 mt-1 h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${className} ${
          disabled || readOnly ? "bg-gray-100 cursor-not-allowed" : ""
        }`} 
      />
      {error && !disabled && !readOnly && (
        <p id={`${id}-error`} className="text-warning-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default ValidatedFieldComponent;
