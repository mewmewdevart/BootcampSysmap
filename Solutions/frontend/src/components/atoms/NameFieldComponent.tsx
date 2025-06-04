import React from "react";

interface NameFieldComponentProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLElement>) => void;
  className?: string;
  error?: string;
}

const NameFieldComponent: React.FC<NameFieldComponentProps> = ({
  id,
  label,
  type = "text",
  placeholder = "",
  required = false,
  value,
  onChange,
  className = "",
  error = "",
}) => {
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
        onChange={onChange}
        className={`w-full border ${error ? "border-warning-500 text-warning-500" : "border-neutral-100"} rounded-lg py-2 pl-5 pr-5 mt-1 h-[56px] focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${className}`}
      />
    </div>
  );
};

export default NameFieldComponent;
