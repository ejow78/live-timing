import { startWebServer } from './web/server.js';
import { liveTimingService } from './services/livetiming.service.js';

console.log('🚀 Iniciando Portal Web & API de Live Timing...');

const server = startWebServer(null);

const shutdown = (signal: string) => {
  console.log(`\n🛑 Recibida señal ${signal}. Deteniendo servicios...`);
  liveTimingService.stop();
  server.close(() => {
    console.log('✅ Servidor detenido correctamente.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
