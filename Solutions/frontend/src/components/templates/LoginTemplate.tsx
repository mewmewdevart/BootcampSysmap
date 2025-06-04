import { useState } from "react";
import { Link } from "react-router-dom";
import LoginFormComponent from "@organisms/LoginFormComponent";
import RegisterFormComponent from "@organisms/RegisterFormComponent";
import ToastNotifications from "@atoms/ToastNotifications";
import ErrorBoundary from "@atoms/ErrorBoundary";
import { MESSAGES } from "@constants/messages";

interface LoginTemplateProps {
  imageLoginPage: string;
  imageLoginVerticalLogo: string;
  loginWelcomeText: string;
  loginDescriptionText: string;
  loginRegisterText: string;
  loginRegisterLinkText: string;
  loginRegisterLinkHref: string;

  registerWelcomeText: string;
  registerDescriptionText: string;
  registerLoginText: string;
  registerLoginLinkText: string;
  registerLoginLinkHref: string;
}

function LoginTemplate({
  imageLoginPage,
  imageLoginVerticalLogo,
  loginWelcomeText,
  loginDescriptionText,
  loginRegisterText,
  loginRegisterLinkText,
  registerWelcomeText,
  registerDescriptionText,
  registerLoginText,
  registerLoginLinkText,
}: LoginTemplateProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleRegisterSuccess = () => {
    setShowAlert(true);
    setIsLogin(true);
  };

  return (
    <div className="flex items-center justify-center ">
      {showAlert && (
        <ToastNotifications
          variant="success"
          title={MESSAGES.SUCCESS.REGISTER}
          description="O seu cadastro foi realizado com sucesso. Agora você pode encontrar parceiros para treinar ao ar livre."
          onClose={() => setShowAlert(false)}
        />
      )}
      <section className="flex justify-between bg-white p-2 w-full h-full 2xl:h-screen items-stretch">
        <img
          src={imageLoginPage}
          alt="Pessoas praticando atividade física ao ar livre em grupo"
          className="hidden lg:block rounded-[12px] lg:w-1/2 object-cover"
        />
        <div className="w-full lg:w-1/2 flex items-center justify-center transition-all duration-300 ease-in-out">
          <div className="w-full max-w-sm p-4">
            <Link to="/">
              <img
                src={imageLoginVerticalLogo}
                alt="Logo do FitMeet"
                className="w-[119px] h-[40px] my-4 text-left"
              />
            </Link>
            <h1 className="text-3xl lg:text-[32px] font-normal font-bebas leading-9 uppercase text-dark-500 mt-12">
              {isLogin ? loginWelcomeText : registerWelcomeText}
            </h1>
            <p
              className="text-sm lg:text-base text-gray-700 font-normal font-dm leading-6 mt-3"
            >
              {isLogin ? loginDescriptionText : registerDescriptionText}
            </p>
            {isLogin ? (
              <ErrorBoundary fallback={<p>Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.</p>}>
                <LoginFormComponent />
              </ErrorBoundary>
            ) : (
              <RegisterFormComponent onRegisterSuccess={handleRegisterSuccess} />
            )}
            <p className="text-sm lg:text-base text-center text-neutral-500 mt-4 lg:mt-8">
              {isLogin ? loginRegisterText : registerLoginText}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogin(!isLogin);
                }}
                className="hover:text-blue-800 text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {isLogin ? loginRegisterLinkText : registerLoginLinkText}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginTemplate;
