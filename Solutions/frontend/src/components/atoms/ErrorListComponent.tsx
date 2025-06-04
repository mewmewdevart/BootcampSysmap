import React from "react";

interface ErrorListComponentProps {
  errors: string[];
}

const ErrorListComponent: React.FC<ErrorListComponentProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <ul className="text-warning-500">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};

export default ErrorListComponent;
