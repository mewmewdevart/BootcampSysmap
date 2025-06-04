import 'dotenv/config';
import app from './app';
import figlet from 'figlet';

const font = 'Slant';

async function startServer(): Promise<void> {
  const basePort = parseInt(process.env.PORT || '3001', 10);
  const maxAttempts = 5;

  for (let i = 0; i < maxAttempts; i++) {
    const port = basePort + i;

    try {
      await new Promise<void>((resolve, reject) => {
        const server = app.listen(port, () => resolve());
        server.on('error', (err: NodeJS.ErrnoException) => {
          if (err.code === 'EADDRINUSE') {
            console.error(`⚠️ | Porta ${port} já está em uso. Tentando a próxima...`);
            reject(err);
          } else {
            reject(err);
          }
        });
      });

      figlet('SysBack', { font }, (err, data) => {
        if (err) {
          console.log(
            'Oops, algo deu errado ao gerar a Arte ASCII. Tente novamente mais tarde.',
            err
          );
          return;
        }

        console.log('Bem vindo(a), ao projeto:');
        console.log(
          data,
          '/ Desafio Tecnico do Modulo BackEnd - P. SysMap, Full Stack 6ª edição.'
        );
        console.log(
          '----------------------------------------------------------------------------------------------------------------------------'
        );
        console.log('❗ | Dê uma olhadinha no README antes de iniciar o projeto.');
        console.log(
          '----------------------------------------------------------------------------------------------------------------------------'
        );
        console.log(`🌐 | O servidor está rodando/ouvindo na porta [${port}]!`);
      });

      return; 
    } catch (error) {
      if (error instanceof Error && (error as NodeJS.ErrnoException).code !== 'EADDRINUSE') {
        console.error(`❌ | Erro inesperado ao iniciar o servidor na porta ${port}:`, error.message);
        process.exit(1);
      }
    }
  }

  console.error('❌ | Todas as tentativas de iniciar o servidor falharam. Verifique as portas disponíveis.');
  process.exit(1);
}

startServer();
