# Guia Completo de Docker 🐳

## Sumário
- [O que é Docker?](#o-que-é-docker)
- [Por que usar Docker?](#por-que-usar-docker)
- [Exemplo básico](#exemplo-básico)
- [Docker explicado com analogias](#docker-explicado-com-analogias)
- [Exemplo prático com PostgreSQL](#exemplo-prático-com-postgresql)
- [Configuração e Comandos](#configuração-e-comandos)
- [Dockerfile do Projeto Backend](#dockerfile-do-projeto-backend)
- [Arquivo `.dockerignore`](#arquivo-dockerignore)
- [Perguntas Frequentes (FAQ)](#perguntas-frequentes-faq)
- [Como rodar uma aplicação com Docker Compose](#como-rodar-uma-aplicação-com-docker-compose)

---

## O que é Docker?

Docker é uma plataforma que permite **criar, empacotar, distribuir e executar aplicações em containers** — ambientes leves e isolados que rodam em qualquer lugar.

---

## Por que usar Docker?

- 📦 **Portabilidade**: Funciona em qualquer lugar.
- ⚡ **Agilidade**: Subida rápida de ambientes.
- 🔐 **Isolamento**: Containers independentes.
- 🔄 **Reprodutibilidade**: Ambientes consistentes.
- ☁️ **Facilidade de deploy**: Ideal para CI/CD e microsserviços.

---

## Exemplo básico

Rodando um container Ubuntu interativo:
```bash
docker run -it ubuntu bash
```

Baixe imagens do [Docker Hub](https://hub.docker.com/).

---

## Docker explicado com analogias

- **Imagem = Planta da Casa**: Modelo reutilizável com dependências e configurações.
- **Container = Casa construída**: Instância funcional e isolada da imagem.
- **Docker Engine = Construtora**: Constrói containers a partir das imagens.

---

## Exemplo prático com PostgreSQL

Rodando um container PostgreSQL:
```bash
docker run --name meu-postgres -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres
```

### O que o comando faz?
- 🏠 Cria um container PostgreSQL.
- 🔐 Define a senha do usuário.
- 🔌 Mapeia a porta 5432.
- 🏷️ Nomeia o container como `meu-postgres`.

### Benefícios:
- Configuração rápida e padronizada.
- Containers isolados e descartáveis.

---

## Configuração e Comandos

### Verificar instalação:
```bash
docker --version
docker compose --version
```

### Exemplo de `docker-compose.yml`:
```yml
services:
  postgresql:
    image: postgres
    container_name: db
    environment:
      POSTGRES_USER: bootcamp
      POSTGRES_PASSWORD: bootcamp
      POSTGRES_DB: bootcamp
    ports:
      - "5433:5432"
```

### Comandos úteis:
- **Subir containers**:
  ```bash
  sudo docker compose up -d
  ```
- **Verificar containers**:
  ```bash
  sudo docker compose ps
  ```
- **Acessar PostgreSQL no container**:
  ```bash
  sudo docker exec -it db psql -U bootcamp -d bootcamp
  ```
- **Acessar PostgreSQL fora do container**:
  ```bash
  psql -h localhost -p 5433 -U bootcamp -d bootcamp
  ```
- **Parar containers**:
  ```bash
  sudo docker compose down
  ```

---

## Dockerfile do Projeto Backend

### Estrutura:
1. **Base**: Define a imagem base como Node.js.
2. **Diretório de trabalho**: Define `/app` como diretório de trabalho.
3. **Instalação de dependências**:
   ```dockerfile
   COPY package*.json ./
   RUN npm install
   ```
4. **Cópia do código**:
   ```dockerfile
   COPY . .
   ```
5. **Prisma e build**:
   ```dockerfile
   RUN npx prisma generate
   RUN npm run build
   ```
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

### Exemplo de `Dockerfile`:
```dockerfile
FROM node:20.18.0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Comandos:
- **Construir imagem**:
  ```bash
  sudo docker build -t api .
  ```
- **Rodar container**:
  ```bash
  docker run -p 3000:3000 api
  ```


Agora você pode rodar um container baseado nessa imagem. Siga os passos abaixo:

Próximos passos:
Rodar o container: Execute o seguinte comando para rodar o container e mapear a porta 3000 do container para a porta 3000 do host:

Verificar se o container está rodando: Use o comando abaixo para listar os containers em execução:

Acessar a aplicação: Abra o navegador ou use uma ferramenta como curl para acessar a aplicação na URL:

Verificar logs do container (opcional): Caso precise verificar os logs do container, use:

Se precisar de mais ajuda, é só perguntar!

## 📂 Arquivo `.dockerignore`

O arquivo `.dockerignore` é usado para excluir arquivos e diretórios desnecessários ao construir a imagem Docker, reduzindo o tamanho da imagem e melhorando a performance.

### Exemplo de `.dockerignore`:
```
node_modules
npm-debug.log
.env
```

### Benefícios:
- Evita incluir arquivos sensíveis ou desnecessários na imagem.
- Melhora o desempenho do build.

---

## ❓ Perguntas Frequentes (FAQ)

### 1. **O que é uma imagem Docker?**
Uma imagem Docker é um modelo imutável que contém tudo o que é necessário para rodar uma aplicação, incluindo o código, bibliotecas, dependências e configurações.

### 2. **Qual a diferença entre uma imagem e um container?**
- **Imagem**: É um modelo estático, como um blueprint.
- **Container**: É uma instância em execução de uma imagem, como uma casa construída a partir de uma planta.

### 3. **Como listar todos os containers em execução?**
Use o comando:
```bash
docker ps
```
Para listar todos os containers (incluindo os parados):
```bash
docker ps -a
```

### 4. **Como parar e remover um container?**
- Para parar um container:
  ```bash
  docker stop <container_id>
  ```
- Para remover um container:
  ```bash
  docker rm <container_id>
  ```

### 5. **Como remover imagens não utilizadas?**
Use o comando:
```bash
docker image prune
```
Para remover todas as imagens não utilizadas:
```bash
docker image prune -a
```

### 6. **Como verificar o espaço usado pelo Docker?**
Use o comando:
```bash
docker system df
```

### 7. **Como limpar recursos não utilizados pelo Docker?**
Para limpar containers, imagens, volumes e redes não utilizados:
```bash
docker system prune
```

### 8. **Como acessar logs de um container?**
Use o comando:
```bash
docker logs <container_id>
```

### 9. **Como executar um comando dentro de um container em execução?**
Use o comando:
```bash
docker exec -it <container_id> <comando>
```
Por exemplo, para abrir um terminal bash dentro do container:
```bash
docker exec -it <container_id> bash
```

### 10. **Como criar um volume para persistir dados?**
Crie um volume com:
```bash
docker volume create <nome_do_volume>
```
E use-o no `docker run`:
```bash
docker run -v <nome_do_volume>:/caminho/no/container <imagem>
```

### 11. **Como compartilhar arquivos entre o host e o container?**
Use o comando:
```bash
docker run -v /caminho/no/host:/caminho/no/container <imagem>
```

### 12. **Como reiniciar automaticamente um container?**
Use a flag `--restart` ao rodar o container:
```bash
docker run --restart always <imagem>
```

### 13. **Como inspecionar detalhes de um container ou imagem?**
- Para containers:
  ```bash
  docker inspect <container_id>
  ```
- Para imagens:
  ```bash
  docker inspect <image_id>
  ```

### 14. **Como verificar a versão do Docker?**
Use o comando:
```bash
docker --version
```

### 15. **Como criar uma rede personalizada no Docker?**
Crie uma rede com:
```bash
docker network create <nome_da_rede>
```
E conecte containers a ela:
```bash
docker run --network <nome_da_rede> <imagem>
```

### 16. **O que é o Docker Compose?**
O Docker Compose é uma ferramenta para definir e gerenciar múltiplos containers usando um arquivo `docker-compose.yml`. Ele facilita a orquestração de serviços.

### 17. **Como subir serviços com o Docker Compose?**
Use o comando:
```bash
docker compose up -d
```

### 18. **Como parar serviços do Docker Compose?**
Use o comando:
```bash
docker compose down
```

### 19. **Como atualizar uma imagem Docker?**
Baixe a versão mais recente da imagem:
```bash
docker pull <imagem>
```
E recrie o container com a nova imagem.

### 20. **Como verificar as portas expostas por um container?**
Use o comando:
```bash
docker port <container_id>
```

---

## Como rodar uma aplicação com Docker Compose

### Passos para rodar a aplicação:

1. **Construir e subir os containers**:
   Use o comando abaixo para construir as imagens e subir os containers definidos no arquivo `docker-compose.yml`:
   ```bash
   sudo docker compose up -d --build
   ```

2. **Verificar se os containers estão rodando**:
   Após subir os containers, use o comando abaixo para listar os containers em execução:
   ```bash
   sudo docker compose ps
   ```

3. **Verificar os logs da aplicação**:
   Para garantir que a aplicação está funcionando corretamente, veja os logs do container da aplicação:
   ```bash
   sudo docker compose logs -f app
   ```

4. **Acessar a aplicação**:
   Abra o navegador ou use `curl` para acessar a aplicação na URL:
   ```
   http://localhost:3000
   ```

### Como saber se funcionou?

- **Containers rodando**: O comando `sudo docker compose ps` deve mostrar os containers `app` e `postgres` com o status `running`.
- **Logs da aplicação**: Os logs do container da aplicação (`sudo docker compose logs -f app`) devem indicar que o servidor está ouvindo na porta 3000, como:
  ```
  Server listening on port 3000
  ```
- **Teste da API**: Use ferramentas como Postman ou `curl` para testar os endpoints da API e verificar se estão respondendo corretamente.

### Parar os serviços (opcional):
Caso precise parar os serviços, use o comando:
```bash
sudo docker compose down
```

### Limpar recursos (opcional):
Para limpar imagens, volumes e redes não utilizados, use:
```bash
sudo docker system prune
```

---


