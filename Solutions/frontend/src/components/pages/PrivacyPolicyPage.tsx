import React from "react";
import { Link } from "react-router-dom";

import imageLoginVerticalLogo from "@assets/images/verticalLogo.png";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <main
      className="container max-w-4xl mx-auto px-4 py-8"
      role="main"
      aria-labelledby="privacy-heading"
    >
      <Link
        to="/"
        className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
      >
        <img
          src={imageLoginVerticalLogo}
          alt="Logo do FitMeet"
          className="w-[119px] h-[40px] mx-auto my-4"
        />
      </Link>

      <h1 id="privacy-heading" className="text-3xl font-bold mb-6 text-center">
        Política de Privacidade
      </h1>

      <p className="mb-4">
        Sua privacidade é importante para nós. O FitMeet é um projeto fictício,
        desenvolvido para fins de demonstração e testes técnicos. Sendo assim,
        os dados informados pelos usuários neste ambiente não são utilizados para
        fins comerciais e nem armazenados de forma permanente.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Coleta de Dados</h2>
      <p className="mb-4">
        Como parte deste desafio técnico, o FitMeet não coleta dados reais dos
        usuários. Todos os dados inseridos na aplicação são utilizados apenas
        para simular o comportamento de um sistema completo de agendamento e
        gerenciamento de atividades.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. Uso dos Dados</h2>
      <p className="mb-4">
        Os dados informados durante o uso da plataforma possuem caráter temporal
        e ilustrativo, servindo apenas para demonstrar as funcionalidades do
        sistema. Não há repasse, venda nem armazenamento definitivo de suas
        informações.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Segurança</h2>
      <p className="mb-4">
        Embora este projeto seja fictício, foram adotadas práticas de segurança
        para ilustrar um cenário real de desenvolvimento. Reforçamos que nenhum
        dado pessoal sensível é armazenado ou processado de fato neste ambiente.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. Alterações nesta Política</h2>
      <p className="mb-4">
        Reservamo-nos o direito de alterar esta Política de Privacidade a
        qualquer momento. Quaisquer mudanças serão publicadas nesta página, e o
        uso contínuo do site implicará na aceitação de tais alterações.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Contato</h2>
      <p className="mb-4">
        Em caso de dúvidas ou solicitações relacionadas à privacidade, por
        favor, envie um e-mail para&nbsp;
        <a
          href="mailto:contato@fitmeet.com"
          className="hover:text-blue-800 text-blue-600  underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          contato@fitmeet.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. Desenvolvedora</h2>
      <p className="mb-4">
        Este projeto foi desenvolvido por{" "}
        <strong>Larissa Cristina Benedito</strong>. Para conhecer mais sobre meu
        trabalho ou entrar em contato, acesse meu:&nbsp;
        <a
          href="https://linktr.ee/mewmewdevart"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-800 text-blue-600  underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Linktree
        </a>
        .
      </p>
    </main>
  );
};

export default PrivacyPolicyPage;
