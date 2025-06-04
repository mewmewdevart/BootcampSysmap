import React from "react";
import { Link } from "react-router-dom";

import imageLoginVerticalLogo from "@assets/images/verticalLogo.png";

const TermsOfUsePage: React.FC = () => {
  return (
    <main
      className="container max-w-4xl mx-auto px-4 py-8"
      role="main"
      aria-labelledby="terms-heading"
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
      <h1 id="page-title" className="text-3xl font-bold mb-6 text-center">
        Termos de Uso
      </h1>

      <p className="mb-4">
        Bem-vindo ao FitMeet! Esta plataforma é um projeto fictício, desenvolvido para
        fins de demonstração e testes técnicos, onde avaliamos habilidades de
        desenvolvimento e solução de problemas. Ao acessar e utilizar nosso site,
        você concorda com os termos e condições aqui estabelecidos.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Aceitação dos Termos</h2>
      <p className="mb-4">
        Ao acessar e se registrar no FitMeet, você declara que leu, entendeu e aceita todas
        as disposições destes Termos de Uso. Caso não concorde com alguma das condições
        descritas, pedimos que não utilize nossa plataforma.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. Descrição do Serviço</h2>
      <p className="mb-4">
        O FitMeet é uma aplicação que simula uma plataforma para agendamento de encontros e
        atividades físicas ao ar livre. Todas as funcionalidades, design e regras contidas
        neste site fazem parte de um desafio técnico e não representam um serviço comercial
        ativo.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Modificações e Atualizações</h2>
      <p className="mb-4">
        Reservamo-nos o direito de atualizar ou modificar estes Termos de Uso a qualquer
        momento, sem aviso prévio. Recomendamos que você revise esta página periodicamente
        para se manter informado sobre quaisquer alterações.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. Propriedade Intelectual</h2>
      <p className="mb-4">
        Todo o conteúdo presente nesta plataforma, incluindo textos, imagens, códigos e layouts,
        é protegido por direitos autorais e outras leis de propriedade intelectual. Qualquer
        reprodução ou distribuição não autorizada é expressamente proibida.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Limitação de Responsabilidade</h2>
      <p className="mb-4">
        O FitMeet é fornecido "no estado em que se encontra", sem garantias de qualquer tipo,
        expressas ou implícitas. Não nos responsabilizamos por eventuais falhas, perdas de dados
        ou danos decorrentes do uso ou da incapacidade de uso da plataforma.
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. Contato</h2>
      <p className="mb-4">
        Para dúvidas, sugestões ou esclarecimentos sobre estes Termos de Uso, entre em contato
        pelo e-mail&nbsp;
        <a
          href="mailto:contato@fitmeet.com"
          className="hover:text-blue-800 text-blue-600  underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          contato@fitmeet.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-2">7. Desenvolvedora</h2>
      <p className="mb-4">
        Este projeto foi desenvolvido por{" "}
        <strong>Larissa Cristina Benedito</strong>. Caso deseje entrar em contato ou conhecer
        mais sobre meu trabalho, acesse meu&nbsp;
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

export default TermsOfUsePage;
