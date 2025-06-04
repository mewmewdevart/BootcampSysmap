import imageLoginPage from "@assets/images/loginImage.png";
import imageLoginVerticalLogo from "@assets/images/verticalLogo.png";
import LoginTemplate from "../templates/LoginTemplate";

function LoginPage() {
  return (
    <>
      <LoginTemplate
        imageLoginPage={imageLoginPage}
        imageLoginVerticalLogo={imageLoginVerticalLogo}
        loginWelcomeText="Bem-vindo de volta!"
        loginDescriptionText="Encontre parceiros para treinar ao ar livre. Conecte-se e comece agora! 💪"
        loginRegisterText="Ainda não tem uma conta?"
        loginRegisterLinkText="Cadastre-se"
        loginRegisterLinkHref="#"
        registerWelcomeText="Crie sua conta"
        registerDescriptionText="Cadastre-se para encontrar parceiros de treino e começar a se exercitar ao ar livre. Vamos juntos! 💪"
        registerLoginText="Já tem uma conta? "
        registerLoginLinkText="Faça login"
        registerLoginLinkHref="#"
      />
    </>
  );
}

export default LoginPage;
