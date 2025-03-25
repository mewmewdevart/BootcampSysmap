# JSON Web Token (JWT)

## Sumário
1. [O que é um JWT?](#o-que-é-um-jwt)
2. [Estrutura de um JWT](#estrutura-de-um-jwt)
3. [Ciclo de Vida e Expiração do JWT](#ciclo-de-vida-e-expiração-do-jwt)
4. [Exemplo Prático de Criação e Uso do JWT](#exemplo-prático-de-criação-e-uso-do-jwt)
5. [Conclusão](#conclusão)
6. [Instalação](#instalação)

### O que é um JWT?
O **JSON Web Token (JWT)** é uma maneira de transmitir informações de forma segura entre duas partes (como um servidor e um cliente). Ele é usado principalmente para autenticação e autorização em APIs e sistemas web.

### Estrutura de um JWT
Um JWT é composto por três partes, separadas por pontos (`.`). Essas partes são:

1. **Header (Cabeçalho)**:
   - Contém informações sobre o tipo de token e o algoritmo de assinatura.
   - Exemplo:
     ```json
     {
       "alg": "HS256",
       "typ": "JWT"
     }
     ```

2. **Payload (Corpo)**:
   - Contém os **dados** que você deseja transmitir, como o ID do usuário ou permissões. Esses dados são chamados de **claims**.
   - Existem três tipos de **claims**:
     - **Registered Claims**: Informações padronizadas, como `exp` (data de expiração).
     - **Public Claims**: Informações definidas pela aplicação, como `username` ou `role`.
     - **Private Claims**: Informações que você cria para atender a necessidades específicas da sua aplicação.
   - Exemplo:
     ```json
     {
       "sub": "1234567890",
       "name": "John Doe",
       "admin": true
     }
     ```

3. **Signature (Assinatura)**:
   - Garante que o token não foi alterado. Ela é criada usando:
     - O **header** codificado em Base64.
     - O **payload** codificado em Base64.
     - Um segredo (ou chave privada, dependendo do algoritmo).
     - O algoritmo especificado no header (como HMAC SHA256 ou RSA).
   - Exemplo de pseudocódigo para criar a assinatura:
     ```javascript
     HMACSHA256(
       base64UrlEncode(header) + "." +
       base64UrlEncode(payload),
       secret)
     ```

O **JWT** final é a concatenação dessas três partes codificadas em Base64, separadas por pontos:
```
header.payload.signature
```

### Ciclo de Vida e Expiração do JWT

- **Expiração do JWT (Claim `exp`)**:
  - Um token pode ter um tempo de expiração, definido pela claim `exp` no payload. Esse tempo pode ser ajustado de acordo com a necessidade da aplicação (exemplo: 1 hora, 1 dia, etc.).
  - Exemplo de claim `exp`:
    ```json
    {
      "exp": 1618321542
    }
    ```
  - Isso significa que o token expira no momento representado pelo timestamp Unix `1618321542`.

- **Como Funciona a Expiração**:
  - Quando o servidor gera o token, ele pode incluir a data e hora de expiração. O cliente (usuário ou API) deve verificar se o token ainda é válido.
  - Se o token expirar, ele não pode mais ser usado para autenticação ou autorização. Nesse caso, o cliente pode precisar pedir um novo token (por exemplo, usando um refresh token).

- **Ciclo de Vida**:
  - **Geração do Token**: O servidor gera um token quando o usuário faz login ou se autentica.
  - **Uso do Token**: O cliente usa o token para fazer requisições autenticadas ao servidor, incluindo o token no cabeçalho da requisição.
  - **Expiração**: Após o tempo definido no `exp`, o token expira e o cliente precisa obter um novo token.

### Exemplo Prático de Criação e Uso do JWT

1. **Criação do Token**:
   O servidor gera o token após o login do usuário.

   ```javascript
   const jwt = require('jsonwebtoken');
   
   const payload = {
     sub: '1234567890', // ID do usuário
     name: 'John Doe',
     admin: true
   };
   
   const secret = 'mysecretkey'; // segredo usado para assinar o token
   
   const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Expira em 1 hora
   console.log(token);
   ```

2. **Uso do Token**:
   O cliente envia o token em cada requisição para autenticar-se no servidor.

   ```javascript
   const axios = require('axios');

   axios.get('http://api.example.com/protected', {
     headers: {
       Authorization: `Bearer ${token}`
     }
   })
   .then(response => console.log(response.data))
   .catch(error => console.error(error));
   ```

3. **Verificação do Token**:
   O servidor valida o token, verificando sua assinatura e a data de expiração.

   ```javascript
   jwt.verify(token, secret, (err, decoded) => {
     if (err) {
       console.log('Token inválido ou expirado');
     } else {
       console.log('Token válido:', decoded);
     }
   });
   ```

### Conclusão

- O JWT é uma maneira segura de transmitir informações entre as partes.
- Ele tem um **header**, um **payload** com os dados e uma **signature** para garantir a integridade.
- O token pode expirar após um certo tempo e, nesse caso, o cliente precisará obter um novo token.

https://jwt.io/

### Instalação

Para trabalhar com JWT em Node.js, você precisa instalar o pacote `jsonwebtoken`. Você pode fazer isso usando o npm (Node Package Manager). Execute o seguinte comando no seu terminal:

```bash
npm install jsonwebtoken
```

Isso instalará o pacote `jsonwebtoken` e você poderá usá-lo em seu projeto Node.js para criar, assinar e verificar tokens JWT.