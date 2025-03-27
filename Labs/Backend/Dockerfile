# Define a imagem base como Node.js na versão 20.18.0
FROM node:20.18.0

# Define o diretório de trabalho dentro do container como /app
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto usando npm
RUN npm install

# Copia todos os arquivos do diretório atual para o diretório de trabalho no container
COPY . .

# Gera os arquivos do Prisma (ORM) com base no esquema definido
RUN npx prisma generate

# Compila o código do projeto
RUN npm run build

# Expõe a porta 3000 para que o container possa ser acessado externamente
EXPOSE 3000

# Define o comando padrão para iniciar a aplicação
CMD ["npm", "start"]