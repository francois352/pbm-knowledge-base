/**
 * Shared Constants
 * Application-wide constant values
 */

// API Configuration
export const API_VERSION = 'v1';
export const API_BASE_PATH = `/api/${API_VERSION}`;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// HRV Session
export const DEFAULT_SESSION_DURATION = 300; // 5 minutes in seconds
export const MIN_SESSION_DURATION = 60; // 1 minute
export const MAX_SESSION_DURATION = 1800; // 30 minutes

// Content
export const MAX_ARTICLE_LENGTH = 50000; // characters
export const MAX_COMMENT_LENGTH = 5000; // characters
export const MAX_POST_TITLE_LENGTH = 200;
export const MAX_TAGS_PER_ARTICLE = 10;

// Search
export const MIN_SEARCH_QUERY_LENGTH = 2;
export const MAX_SEARCH_RESULTS = 100;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_PDF_TYPE = 'application/pdf';

// Rate Limiting
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

// JWT
export const JWT_ACCESS_EXPIRY = '15m';
export const JWT_REFRESH_EXPIRY = '7d';

// GDPR
export const CONSENT_VERSION = '1.0';
export const DATA_RETENTION_DAYS = 365 * 3; // 3 years

// Email
export const ADMIN_EMAIL = 'contact@neurofeedback-luxembourg.com';
export const NOTIFICATION_EMAIL = 'notifications@neurofeedback-luxembourg.com';

// Products
export const PACK_AUTONOMIE_PRICE = 3700; // EUR
export const PACK_GUIDE_PRICE = 4000; // EUR
export const CURRENCY = 'EUR';

// Feature Flags
export const FEATURES = {
  FORUM_ENABLED: true,
  HRV_TRACKING_ENABLED: true,
  SYMPTOM_TRACKING_ENABLED: true,
  RESEARCH_LIBRARY_ENABLED: true,
  LEARNING_PATHS_ENABLED: true,
  ACHIEVEMENTS_ENABLED: true,
} as const;
