import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@context/authContext";
import { useState, useEffect, JSX } from "react";
import ToastNotifications from "@atoms/ToastNotifications";
import { MESSAGES } from "@constants/messages";
import ImageLoading from "@assets/images/loading.gif";

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [toast, setToast] = useState<{
    title: string;
    description?: string;
    variant: "success" | "error" | "warning";
  } | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      setToast({
        title: "Acesso negado",
        description: MESSAGES.ERRORS.LOGIN_DESCRIPTION,
        variant: "warning",
      });
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return <section className="flex items-center justify-center h-screen w-full flex-col"> 
                  <img src={ImageLoading} alt="" />
                  Carregando...
                  </section>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} />;
  }

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
      {children}
    </>
  );
};

export const RedirectAuthenticated: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/atividades" /> : children;
};
