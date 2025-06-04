import React, { useState } from "react";
import PasswordFieldComponent from "@atoms/PasswordFieldComponent";
import ButtonComponent from "@atoms/ButtonComponent";
import ValidatedFieldComponent from "@atoms/ValidatedFieldComponent";
import { emailSchema, passwordSchema, validateFields } from "@utils/validation";
import ErrorListComponent from "@atoms/ErrorListComponent";
import ToastNotifications from "@atoms/ToastNotifications";
import { loginUser } from "@services/apiService";
import { useAuth } from "@context/authContext";
import { MESSAGES } from "@constants/messages";

const LoginFormComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [toast, setToast] = useState<{ title: string; description?: string; variant: "success" | "error" | "warning" } | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFields({
      Email: { value: email, schema: emailSchema },
      Senha: { value: password, schema: passwordSchema },
    });
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors([]);

    try {
      const response = await loginUser({ email, password });
      login({ token: response.token, avatar: response.avatar, level: response.level });
      setToast({ title: MESSAGES.SUCCESS.LOGIN, variant: "success" });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === MESSAGES.ERRORS.INVALID_PASSWORD) {
        setToast({
          title: MESSAGES.ERRORS.LOGIN,
          description: MESSAGES.ERRORS.INVALID_PASSWORD,
          variant: "error",
        });
      } else if (error instanceof Error && error.message === MESSAGES.ERRORS.INVALID_EMAIL) {
        setToast({
          title: MESSAGES.ERRORS.LOGIN,
          description: MESSAGES.ERRORS.INVALID_EMAIL,
          variant: "error",
        });
      } else if (error instanceof Error && error.message === MESSAGES.ERRORS.UNEXPECTED) {
        setToast({
          title: MESSAGES.ERRORS.LOGIN,
          description: MESSAGES.ERRORS.UNEXPECTED,
          variant: "error",
        });
      } else {
        const errorMessage = error instanceof Error ? error.message : MESSAGES.ERRORS.UNEXPECTED;
        setToast({
          title: MESSAGES.ERRORS.LOGIN,
          description: errorMessage,
          variant: "error",
        });
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
          label="Entrar"
          variant="fullPrimary"
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary-600 rounded mt-2"
          type="submit"
        />
      </form>
    </>
  );
};

export default LoginFormComponent;
