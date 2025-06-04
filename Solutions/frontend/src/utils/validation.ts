import { z, ZodSchema } from "zod";

export const formatCpf = (value: string) => {
  return value
    .replace(/\D/g, "") 
    .replace(/(\d{3})(\d)/, "$1.$2") 
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const cpfSchema = z
  .string()
  .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido");

export const emailSchema = z.string().email("E-mail inválido");

export const passwordSchema = z
  .string()
  .min(6, "A senha deve ter no mínimo 6 caracteres");

export const validateFields = (
  fields: Record<string, { value: string; schema: ZodSchema }>
) => {
  const errors: string[] = [];
  for (const [field, { value, schema }] of Object.entries(fields)) {
    if (!schema.safeParse(value).success) {
      errors.push(`${field} inválido.`);
    }
  }
  return errors;
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const validateScheduledDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && date.toISOString() === dateString;
};

export const formatToISODate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const parseAndFormatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split("T")[0];
  }
  console.error("Invalid date string:", dateString);
  return "";
};
