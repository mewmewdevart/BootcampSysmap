import React from "react";
import { Link } from "react-router-dom";

function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-wrap gap-2 justify-center items-center bg-white border-t border-neutral-100 text-sm sm:text-sm md:text-base lg:px-20 xl:px-40 py-2 md:py-4 mt-4 lg:mt-8 xl:mt-12 transition-all duration-300 ease-in-out text-center">
      <span>
        © {currentYear} FitMeet. Todos os direitos reservados | Ao acessar o site, você concorda com os nossos{" "}
        <Link
          to="/termos-de-uso"
          className="hover:text-blue-800 underline text-blue-600 transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Termos de Uso
        </Link>{" "}
        e{" "}
        <Link
          to="/politica-de-privacidade"
          className="hover:text-blue-800 underline text-blue-600 transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Política de Privacidade
        </Link>.
      </span>
    </footer>
  );
}

export default FooterComponent;
