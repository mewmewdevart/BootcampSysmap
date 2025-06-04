import React, { useState } from "react";
import { cpfSchema, emailSchema, passwordSchema, validateFields, formatCpf } from "@utils/validation";
import { z } from "zod";
import ValidatedFieldComponent from "@atoms/ValidatedFieldComponent";
import PasswordFieldComponent from "@atoms/PasswordFieldComponent";
import ButtonComponent from "@atoms/ButtonComponent";
import NameFieldComponent from "@atoms/NameFieldComponent";
import ErrorListComponent from "@atoms/ErrorListComponent";
import ToastNotifications from "@atoms/ToastNotifications";
import { registerUser } from "@services/apiService";
import { MESSAGES } from "@constants/messages";

interface RegisterFormComponentProps {
  onRegisterSuccess: () => void;
}

const RegisterFormComponent: React.FC<RegisterFormComponentProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<{ title: string; description?: string; variant: "success" | "error" | "warning" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields({
      Nome: { value: name, schema: z.string().min(1, MESSAGES.ERRORS.INVALID_PASSWORD) },
      CPF: { value: cpf, schema: cpfSchema },
      Email: { value: email, schema: emailSchema },
      Senha: { value: password, schema: passwordSchema },
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);

    try {
      await registerUser({ name, email, cpf, password });
      setToast({ title: MESSAGES.SUCCESS.REGISTER, description: MESSAGES.SUCCESS.REGISTER_DESCRIPTION, variant: "success" });
      setName("");
      setCpf("");
      setEmail("");
      setPassword("");
      onRegisterSuccess();
    } catch (error: unknown) {
      if (error instanceof Error && error.message === MESSAGES.ERRORS.REGISTER) {
        setToast({
          title: MESSAGES.ERRORS.REGISTER,
          description: MESSAGES.ERRORS.REGISTER_DESCRIPTION,
          variant: "error",
        });
      } else if (error instanceof Error && error.message === MESSAGES.ERRORS.INVALID_EMAIL) {
        setToast({
          title: MESSAGES.ERRORS.INVALID_EMAIL,
          description: MESSAGES.ERRORS.INVALID_EMAIL,
          variant: "error",
        });
      } else if (error instanceof Error && error.message === MESSAGES.ERRORS.UNEXPECTED) {
        setToast({
          title: MESSAGES.ERRORS.UNEXPECTED,
          description: MESSAGES.ERRORS.UNEXPECTED,
          variant: "error",
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : MESSAGES.ERRORS.UNEXPECTED;
        setToast({ title: MESSAGES.ERRORS.REGISTER, description: errorMessage, variant: "error" });
      }
    }
  };

  return (
    <>
      {toast && (
        <ToastNotifications
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => setToast(null)}
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <NameFieldComponent
          id="name"
          label="Nome completo"
          type="name"
          placeholder="Ex.: João Silva"
          required
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <ValidatedFieldComponent
          id="cpf"
          label="CPF"
          type="text"
          placeholder="Ex.: 123.456.789-01"
          required
          value={cpf}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCpf(formatCpf(e.target.value))}
          validationSchema={cpfSchema}
        />
        <ValidatedFieldComponent
          id="email"
          label="E-mail"
          type="email"
          placeholder="Ex.: joao@email.com"
          required
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          validationSchema={emailSchema}
        />
        <PasswordFieldComponent
          id="password"
          label="Senha"
          placeholder="Ex.: joao123"
          required
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          showPassword={showPassword}
          toggleShowPassword={() => setShowPassword(!showPassword)}
          validationSchema={passwordSchema}
        />
        {errors.length > 0 && <ErrorListComponent errors={errors} />}
        <ButtonComponent
          label="Cadastrar"
          variant="fullPrimary"
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary-600 rounded mt-2"
          type="submit"
        />
      </form>
    </>
  );
};

export default RegisterFormComponent;
