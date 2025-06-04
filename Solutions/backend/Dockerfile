FROM node:20.18.3

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3001

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "start"]
