/**
 * Backend Server Entry Point
 */

import app from './app';
import { config } from './config/env';
import { logger } from './utils/logger';
import knex from 'knex';
import { databaseConfig } from './config/database';

const db = knex(databaseConfig);

// Test database connection
db.raw('SELECT 1')
  .then(() => {
    logger.info('Database connection established');
  })
  .catch(err => {
    logger.error('Database connection failed:', err);
    process.exit(1);
  });

const server = app.listen(config.server.port, () => {
  logger.info(`Server running on port ${config.server.port}`);
  logger.info(`Environment: ${config.env}`);
  logger.info(`API URL: ${config.server.apiUrl}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  logger.info('Received shutdown signal, closing server...');
  server.close(() => {
    logger.info('Server closed');
    db.destroy()
      .then(() => {
        logger.info('Database connection closed');
        process.exit(0);
      })
      .catch(err => {
        logger.error('Error closing database connection:', err);
        process.exit(1);
      });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
