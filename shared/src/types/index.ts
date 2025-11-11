/**
 * Shared Types Index
 * Central export for all type definitions
 */

export * from './user.types';
export * from './content.types';
export * from './hrv.types';
export * from './wellness.types';
export * from './forum.types';
export * from './leads.types';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  hasMore?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// Search types
export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
  sort?: SortOptions;
  pagination?: {
    page: number;
    limit: number;
  };
}

export interface SearchFilters {
  category?: string[];
  tags?: string[];
  difficulty?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

export interface SearchResult<T> {
  item: T;
  score: number;
  highlights?: Record<string, string>;
}
