#!/bin/sh
set -e

echo "Gerando Prisma Client..."
npx prisma generate

echo "Aplicando as migrações..."
npx prisma migrate deploy

## Porque em ambiente de produção não é necessário popular os dados iniciais
if [ "$NODE_ENV" != "production" ]; then
  echo "Populando dados iniciais..."
  npm run seed
fi

echo "Compilando arquivos TypeScript..."
npm run build

echo "Iniciando a aplicação..."
npm start
