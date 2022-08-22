import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
});

export const csrf = () => api.get('/sanctum/csrf-cookie');
