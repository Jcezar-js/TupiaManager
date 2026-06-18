import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import app from './app';

const DB_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 3001;

if (!DB_URL) {
  console.error('DATABASE_URL não está definido nas variáveis de ambiente.');
  process.exit(1);
}

async function bootstrap() {
  await mongoose.connect(DB_URL!);
  console.log('Conectado ao MongoDB');

  const server = app.listen(PORT, () => console.log('Server iniciado na porta', PORT));

  const shutdown = async () => {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
  console.error('Falha ao inicializar servidor:', err);
  process.exit(1);
});
