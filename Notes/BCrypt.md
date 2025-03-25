# BCrypt

## Sumário
1. [O que é o BCrypt?](#o-que-é-o-bcrypt)
2. [Como o BCrypt Funciona](#como-o-bcrypt-funciona)
3. [Instalação](#instalação)
4. [Exemplo Prático de Uso do BCrypt](#exemplo-prático-de-uso-do-bcrypt)
5. [Conclusão](#conclusão)

### O que é o BCrypt?
O **BCrypt** é uma função de hashing de senha projetada para ser computacionalmente intensiva, tornando mais difícil para atacantes realizarem ataques de força bruta. Ele é amplamente utilizado para armazenar senhas de forma segura em sistemas web.

### Como o BCrypt Funciona
O BCrypt utiliza um algoritmo de hashing adaptativo que incorpora um fator de custo, o que significa que o tempo necessário para calcular o hash pode ser aumentado conforme o poder computacional aumenta. Isso ajuda a proteger contra ataques de força bruta.

### Instalação
Para usar o BCrypt em Node.js, você precisa instalar o pacote `bcrypt`. Você pode fazer isso usando o npm (Node Package Manager). Execute o seguinte comando no seu terminal:

```bash
npm install bcrypt

npm install @types/bcrypt --dev
```

### Exemplo Prático de Uso do BCrypt

1. **Hashing de Senha**:
   Para criar um hash de uma senha, você pode usar o método `hash` do pacote `bcrypt`.

   ```javascript
   const bcrypt = require('bcrypt');
   const saltRounds = 10;
   const plainPassword = 'mysecretpassword';

   bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
     if (err) {
       console.error(err);
     } else {
       console.log('Hashed password:', hash);
     }
   });
   ```

2. **Verificação de Senha**:
   Para verificar se uma senha fornecida corresponde ao hash armazenado, você pode usar o método `compare`.

   ```javascript
   const hashedPassword = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Fjs9Z8a.5j5g5g5g5g5g5'; // Exemplo de hash

   bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
     if (err) {
       console.error(err);
     } else if (result) {
       console.log('Password matches!');
     } else {
       console.log('Password does not match.');
     }
   });
   ```

### Conclusão

- O BCrypt é uma ferramenta poderosa para hashing de senhas, oferecendo segurança adicional contra ataques de força bruta.
- Ele utiliza um fator de custo adaptativo, permitindo que o tempo de cálculo do hash seja ajustado conforme necessário.
- O pacote `bcrypt` pode ser facilmente instalado e usado em projetos Node.js para criar e verificar hashes de senhas.
