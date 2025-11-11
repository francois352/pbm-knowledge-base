/**
 * API Client
 */

import axios from 'axios';
import type { ApiResponse } from '@pbm-knowledge-hub/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetcher = async <T>(url: string): Promise<T> => {
  const { data } = await apiClient.get<ApiResponse<T>>(url);
  if (!data.success || !data.data) {
    throw new Error(data.error?.message || 'Request failed');
  }
  return data.data;
};
