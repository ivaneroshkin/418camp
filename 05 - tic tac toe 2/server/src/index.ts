import app from './server.js';
import { config } from './config.js';
import { logger } from './lib/logger.js';

app.listen(config.port, () => {
  logger.log(`Tic-tac-toe listening on port ${config.port}!`);
  logger.log(`Environment: ${config.nodeEnv}`);
});
