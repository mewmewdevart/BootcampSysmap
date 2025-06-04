import React from "react";

interface InputFieldComponentProps {
  id: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "date";
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const InputFieldComponent: React.FC<InputFieldComponentProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
  className = "",
  error = "",
  disabled = false,
  readOnly = false,
}) => {
  const isTextarea = type === "textarea";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm lg:text-base font-semibold font-dm text-gray-700"
      >
        {label} {required && <span className="text-warning-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full border ${error ? "border-warning-500 text-warning-500" : "border-neutral-100"} rounded-lg p-5 mt-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${className} ${
            disabled || readOnly ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full border ${error ? "border-warning-500 text-warning-500" : "border-neutral-100"} rounded-lg py-2 pl-5 pr-5 mt-1 h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${className} ${
            disabled || readOnly ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        />
      )}
      {error && (
        <p className="text-warning-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputFieldComponent;
