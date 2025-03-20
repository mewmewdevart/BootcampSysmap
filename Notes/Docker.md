## 🐳 O que é Docker?

Docker é uma plataforma que permite **criar, empacotar, distribuir e executar aplicações em containers** — ambientes leves e isolados que rodam em qualquer lugar.

## Por que usar Docker?

- 📦 **Portabilidade**: "Funciona na minha máquina" agora funciona em qualquer lugar.
- ⚡ **Agilidade**: Subida rápida de ambientes e aplicações.
- 🔐 **Isolamento**: Cada container roda de forma independente, sem interferir no sistema.
- 🔄 **Reprodutibilidade**: Ambientes consistentes entre desenvolvimento, testes e produção.
- ☁️ **Facilidade de deploy**: Ideal para CI/CD, microsserviços e cloud.

## 🚀 Exemplo:
```bash
docker run -it ubuntu bash
```

### Baixar Imagens
Você pode baixar imagens do Docker Hub: [Docker Hub](https://hub.docker.com/)

## 🐳 Docker explicado com a analogia da casa

### 🖼️ **Imagem = Planta da Casa**
- A imagem Docker é como a **planta arquitetônica** de uma casa.
- Define tudo o que a casa precisa: estrutura, materiais, móveis (dependências, bibliotecas, sistema).
- É **um modelo reutilizável**: você pode construir várias casas iguais a partir dela.

### 🏠 **Container = Casa construída**
- O container é a **casa real construída** a partir da planta (imagem).
- Funciona de forma isolada: cada casa/container tem seus próprios cômodos, móveis e moradores (dados e processos).
- Você pode ter **várias casas (containers)** diferentes ou iguais, cada uma com sua função.

### 🛠️ **Docker Engine = Construtora**
- A construtora (Docker Engine) **pega a planta (imagem)** e **constrói casas (containers)** prontas pra uso.

## 💡 Exemplo prático com PostgreSQL

Imagine que a **planta (imagem)** do PostgreSQL já tem tudo pronto: o banco de dados, as configurações e ferramentas.

### 📦 Rodando uma "casa/container PostgreSQL":
```bash
docker run --name meu-postgres -e POSTGRES_PASSWORD=senha123 -p 5432:5432 -d postgres
```

### O que esse comando faz?
- 🏠 Constrói uma casa (container) com a planta do PostgreSQL.
- 🔐 Define a senha do morador (usuário padrão do banco).
- 🔌 Abre a porta da casa (porta 5432) para você acessar de fora.
- 🏷️ Dá o nome para a casa: `meu-postgres`.

Agora você tem um **banco de dados funcional** isolado, portátil e pronto para uso, sem precisar instalar o PostgreSQL no seu sistema manualmente.

### ✨ Benefícios de usar Docker:
- Montagem rápida e padronizada.
- Casas (containers) que não interferem uma na outra.
- Você pode destruir e recriar quando quiser, com um comando.
- Ótimo para times, projetos, testes e produção.

## Configuração + Comandos

### 1. **Verificar se o Docker e o Docker Compose estão instalados**
Primeiro, você precisa garantir que o Docker e o Docker Compose estão instalados. 

#### Para verificar o Docker:
Abra o terminal e digite:
```bash
docker --version
```
Isso deve retornar a versão do Docker, indicando que está instalado corretamente. Caso contrário, você precisará instalar o Docker.

#### Para verificar o Docker Compose:
```bash
docker compose --version
```
Se o Docker Compose estiver instalado corretamente, você verá a versão dele. Caso contrário, você precisará instalá-lo.

### 1.2 Configure o arquivo docker-compose.yml

```yml
services:
  postgresql:  # Nome do serviço para o container PostgreSQL (pode ser qualquer nome)
    image: postgres  # Imagem Docker para o PostgreSQL
    container_name: db  # Nome do container (pode ser qualquer nome) em que o PostgreSQL será executado
    environment:
      POSTGRES_USER: bootcamp  # Nome de usuário do banco de dados
      POSTGRES_PASSWORD: bootcamp  # Senha do banco de dados
      POSTGRES_DB: bootcamp  # Nome do banco de dados a ser criado
    ports:
      - "5433:5432"  # Mapeamento de portas entre o host (esquerda) e o container (direita) - Porta padrão do PostgreSQL para conexões de banco de dados

# Nota: O serviço postgresql define um container. Se você quiser adicionar mais serviços, 
# como outro banco de dados ou containers de aplicação, você precisa criar serviços adicionais 
# dentro deste arquivo, seguindo a mesma estrutura. Cada serviço será seu próprio container.
```

### 2. **Subir o container com o `docker compose.yml`**

Depois de verificar que tudo está instalado, você pode iniciar o container do PostgreSQL com o Docker Compose.

#### **Comando para rodar o Docker Compose**:
Em **um único terminal**, vá até o diretório onde está o arquivo `docker compose.yml` e digite:
```bash
sudo docker compose up -d
```
- **`up -d`**: Isso inicializa o container em modo "desapegado", ou seja, ele fica rodando em segundo plano (background), sem ocupar o terminal.

Isso vai iniciar o PostgreSQL e qualquer outro serviço que você tenha configurado no `docker compose.yml`.

### 3. **Verificar se o container está rodando**

Agora, você pode verificar se o PostgreSQL (e outros containers) está rodando corretamente.

#### **Comando para ver os containers em execução**:
Em **um único terminal**, digite:
```bash
sudo docker compose ps
```
Isso vai listar todos os containers que o Docker Compose está gerenciando. Se tudo estiver certo, você verá o serviço `postgresql` na lista, como por exemplo:

```bash
   Name                 Command               State           Ports         
------------------------------------------------------------------------
db                     docker-entrypoint.sh   Up      0.0.0.0:5433->5432/tcp
```

### 4. **Conectar ao banco de dados dentro do container**

Para acessar o PostgreSQL dentro do container, você usará o comando `docker exec`.

#### **Comando para acessar o PostgreSQL dentro do container**:
Abra **um novo terminal** (se preferir) e digite:

```bash
sudo docker exec -it db psql -U bootcamp -d bootcamp
```
Aqui está o que cada parte faz:
- **`exec -it`**: Isso permite abrir um terminal interativo dentro do container.
- **`db`**: Esse é o nome do container do PostgreSQL (que você definiu em `docker compose.yml`).
- **`psql -U bootcamp -d bootcamp`**: Este comando abre o PostgreSQL e se conecta ao banco de dados chamado `bootcamp` com o usuário `bootcamp`.

### 5. **Acessar o banco de dados de fora do container (se não estiver usando o terminal do container)**

Caso você queira acessar o banco de dados de fora do container, você pode usar o cliente `psql` ou outro software de banco de dados. O Docker mapeou a porta 5433 do seu computador para a porta 5432 do container.

#### **Comando para acessar o PostgreSQL de fora do container**:

Em **um terminal normal**, fora do container, digite:

```bash
psql -h localhost -p 5433 -U bootcamp -d bootcamp
```

Aqui está o que cada parte faz:
- **`localhost`**: A conexão será feita ao seu próprio computador (onde o Docker está rodando).
- **`-p 5433`**: Você mapeou a porta 5433 no seu computador para a porta 5432 dentro do container (a porta padrão do PostgreSQL).
- **`-U bootcamp`**: O usuário do banco de dados é `bootcamp`, conforme definido no `docker compose.yml`.
- **`-d bootcamp`**: O nome do banco de dados é `bootcamp`, conforme definido no `docker compose.yml`.

### 6. **Verificar os logs do container (opcional)**

Se você estiver tendo problemas ou quiser ver mais informações sobre o que está acontecendo dentro do seu container PostgreSQL, pode verificar os logs.

#### **Comando para ver os logs do container**:
Em **um único terminal**, digite:

```bash
sudo docker compose logs postgresql
```

Esse comando vai mostrar os logs gerados pelo serviço PostgreSQL, o que pode ajudar a depurar possíveis erros.

### 7. **Parar o Docker Compose**

Caso você queira parar o container, você pode usar o comando abaixo:

#### **Comando para parar o Docker Compose**:
Em **um único terminal**, digite:

```bash
sudo docker compose down
```

Esse comando vai parar e remover todos os containers que o Docker Compose criou.

### Resumo:

- **`docker compose up -d`**: Inicializa o container em segundo plano.
- **`docker compose ps`**: Verifica se o container está rodando.
- **`docker exec -it db psql -U bootcamp -d bootcamp`**: Acessa o banco de dados dentro do container.
- **`psql -h localhost -p 5433 -U bootcamp -d bootcamp`**: Acessa o banco de dados de fora do container (pelo computador).
- **`docker compose logs postgresql`**: Verifica os logs do container.
- **`docker compose down`**: Para os containers.

Você só precisa abrir **um segundo terminal** se quiser executar algum comando dentro do container enquanto ele estiver rodando em segundo plano. Se você for acessar o banco de dados de fora do container ou verificar os logs, não precisa de outro terminal.


