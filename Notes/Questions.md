No Express com TypeScript, a utilização de tipos genéricos no objeto Request permite tipar corretamente os parâmetros da URL, o corpo da requisição e os query params.
- Verdadeiro


Qual é a principal vantagem de usar TypeScript em um projeto Express?&nbsp;
-  Permite detectar erros em tempo de desenvolvimento, melhorando a manutenção e a escalabilidade.

No Express, ao utilizar middlewares assíncronos com async/await, é necessário capturar manualmente os erros para evitar que a aplicação quebre.
- Verdadeo


Qual dessas afirmações NÃO está correta sobre o uso de express.Router() no TypeScript?&nbsp;
-  O express.Router() substitui completamente a necessidade de utilizar app no Express


Ao definir variáveis de ambiente no Express com TypeScript, é obrigatório utilizar a biblioteca dotenv para carregar as configurações do .env.
- Falso

No TypeScript, o uso da palavra-chave interface e da palavra-chave type é intercambiável, sem diferenças práticas entre elas.
- Falso

Qual das seguintes características não é uma vantagem direta do TypeScript em relação ao JavaScript puro?
- Execução mais rápida do código no ambiente Node.js.

O Prisma ORM pode ser utilizado apenas com bancos de dados SQL, como PostgreSQL e MySQL, não oferecendo suporte a bancos NoSQL.
- Falso

Ao usar o Prisma, é necessário rodar o comando prisma generate dev toda vez que há mudanças no schema.prisma para que as alterações entrem em vigor.
- Falso

Qual é a principal função do comando prisma migrate dev?
-  Aplicar e rastrear mudanças no esquema do banco de dados durante o desenvolvimento.

O Prisma Client é a camada de acesso ao banco gerada automaticamente pelo Prisma e permite que os desenvolvedores realizem consultas usando um formato tipado e intuitivo.&nbsp;
- Verdadeiro

Qual é a principal função do comando prisma migrate deploy no Prisma?
-  Aplicar todas as migrações pendentes no banco de dados de produção ou em qualquer outro ambiente específico.

Os cabeçalhos HTTP podem ser utilizados para fornecer informações adicionais sobre a requisição ou a resposta, como tipo de conteúdo, autenticação e controle de cache.
- Verdadeiro

Qual das seguintes afirmações sobre o método HTTP POST é verdadeira, considerando suas características e implicações no protocolo HTTP?
-  O método POST pode ser usado para criar ou modificar recursos no servidor, mas não possui garantias sobre o resultado quando enviado múltiplas vezes, o que pode causar efeitos colaterais como duplicação de dados.

Qual das seguintes afirmações sobre o Node.js é falsa?
- O Node.js é monolítico, ou seja, ele executa código JavaScript de forma síncrona, bloqueando outras requisições enquanto um processo é executado.

Os JWTs são tipicamente usados para autenticação em APIs RESTful, e a segurança do token depende da chave secreta usada para assiná-lo, já que o token não pode ser alterado após a assinatura sem invalidá-lo.
- Verdadeiro

Em um JWT, o que significa a parte "payload" e qual seu papel dentro do token?
-  A "payload" contém dados como informações de usuário e permissões, mas não pode ser modificada sem invalidar a assinatura.

Qual das alternativas a seguir descreve corretamente a função do campo "exp" (expiration) dentro de um JSON Web Token (JWT)?
-  O campo "exp" armazena a data em que o servidor deve invalidar o token, impedindo seu uso após esse horário.


Qual das alternativas a seguir não é uma característica do formato JSON?&nbsp;
-  JSON é estritamente tipado, o que significa que todos os valores devem ser especificados com um tipo de dados explícito, como inteiro ou string

Qual é a principal diferença entre imagens e containers no Docker?
- Uma imagem é um arquivo de sistema operacional base, enquanto um container é uma execução isolada de uma aplicação baseada nessa imagem.

O Docker garante que todos os containers criados a partir da mesma imagem terão o mesmo comportamento e configuração, independentemente de quando ou onde eles são executados.&nbsp;
- Verdadeiro

Quais das seguintes opções descrevem corretamente o funcionamento do Docker Compose?&nbsp;
-  O Docker Compose é uma ferramenta para gerenciar múltiplos containers de forma simplificada, permitindo que eles sejam definidos e executados a partir de um único arquivo de configuração YAML.

Qual das alternativas a seguir melhor descreve o conceito de volumes no Docker?
- Volumes são usados para armazenar dados persistentes fora do sistema de arquivos do container, permitindo que os dados sejam preservados mesmo após o container ser removido.


Qual é a principal vantagem de utilizar serviços de mensageria em sistemas distribuídos?
- Permitem comunicação assíncrona entre componentes, melhorando escalabilidade e desacoplamento entre sistemas.

No RabbitMQ, qual das seguintes afirmações sobre exchanges está correta?&nbsp;
- Uma exchange define as regras de roteamento para distribuir mensagens para as filas, podendo ser do tipo direct, fanout, topic ou headers.

Em arquiteturas baseadas em serviços de mensageria, um publish-subscribe (pub/sub) é um modelo no qual um produtor pode enviar mensagens para múltiplos consumidores simultaneamente, sem precisar conhecer previamente quais serviços irão processar as mensagens.
- Verdadeiro

No contexto da programação estruturada, como o Princípio da Responsabilidade Única (SRP) do S.O.L.I.D deve ser aplicado a funções?&nbsp;
-  Cada função deve ter uma única responsabilidade bem definida, evitando que execute múltiplas tarefas distintas.

De acordo com o Teorema CAP, um banco de dados distribuído pode garantir simultaneamente consistência, disponibilidade e tolerância à partição sem nenhuma limitação técnica.
- Falso

Qual das alternativas abaixo descreve corretamente a característica de modularização na programação estruturada?
-  Modularização permite dividir o código em funções ou procedimentos independentes, facilitando a manutenção e reutilização.

Qual das alternativas abaixo descreve corretamente a principal diferença entre Git e GitHub?
-  Git é um sistema de controle de versão distribuído que permite versionar o código localmente, enquanto GitHub é uma plataforma online que hospeda repositórios Git e facilita o trabalho colaborativo.
