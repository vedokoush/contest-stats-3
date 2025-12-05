import axios, { AxiosInstance } from 'axios';

/**
 * API client for interacting with the FastAPI backend
 * Configured with base URL and default headers
 */
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export { api };
