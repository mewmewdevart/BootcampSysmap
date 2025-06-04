import { useState } from "react";
import { ZodType, ZodError } from "zod";

export const useValidation = (validationSchema: ZodType) => {
  const [error, setError] = useState("");

  const validate = (value: string) => {
    try {
      validationSchema.parse(value);
      setError("");
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return { error, validate };
};
