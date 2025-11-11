/**
 * Environment Configuration
 */

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  API_URL: z.string().url().default('http://localhost:3001'),

  // Database
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.string().default('5432'),
  DB_NAME: z.string().default('pbm_knowledge_hub'),
  DB_USER: z.string().default('postgres'),
  DB_PASSWORD: z.string().default('postgres'),
  DB_SSL: z.string().transform(val => val === 'true').default('false'),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),

  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),

  // File Storage
  UPLOAD_DIR: z.string().default('./uploads'),
  MAX_FILE_SIZE: z.string().default('10485760'), // 10MB

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'), // 15 minutes
  RATE_LIMIT_MAX: z.string().default('100'),
});

const parsedEnv = envSchema.parse(process.env);

export const config = {
  env: parsedEnv.NODE_ENV,
  isDevelopment: parsedEnv.NODE_ENV === 'development',
  isProduction: parsedEnv.NODE_ENV === 'production',
  isTest: parsedEnv.NODE_ENV === 'test',

  server: {
    port: parseInt(parsedEnv.PORT, 10),
    apiUrl: parsedEnv.API_URL,
  },

  db: {
    host: parsedEnv.DB_HOST,
    port: parseInt(parsedEnv.DB_PORT, 10),
    name: parsedEnv.DB_NAME,
    user: parsedEnv.DB_USER,
    password: parsedEnv.DB_PASSWORD,
    ssl: parsedEnv.DB_SSL,
  },

  jwt: {
    secret: parsedEnv.JWT_SECRET,
    refreshSecret: parsedEnv.JWT_REFRESH_SECRET,
  },

  email: {
    host: parsedEnv.SMTP_HOST,
    port: parsedEnv.SMTP_PORT ? parseInt(parsedEnv.SMTP_PORT, 10) : undefined,
    user: parsedEnv.SMTP_USER,
    password: parsedEnv.SMTP_PASSWORD,
    from: parsedEnv.SMTP_FROM || 'noreply@pbm-knowledge-hub.com',
  },

  upload: {
    dir: parsedEnv.UPLOAD_DIR,
    maxFileSize: parseInt(parsedEnv.MAX_FILE_SIZE, 10),
  },

  cors: {
    origin: parsedEnv.CORS_ORIGIN.split(',').map(url => url.trim()),
  },

  rateLimit: {
    windowMs: parseInt(parsedEnv.RATE_LIMIT_WINDOW_MS, 10),
    max: parseInt(parsedEnv.RATE_LIMIT_MAX, 10),
  },
};
