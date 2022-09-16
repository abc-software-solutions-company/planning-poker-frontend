import axios from 'axios';

import {ROUTES} from '@/configs/routes.config';
import Cookie from '@/utils/cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    config.headers = {...config.headers};
    if (typeof window !== 'undefined') {
      const accessToken = Cookie.accessToken.get();
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => Promise.reject(err)
);

api.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
    }
    return Promise.reject(err);
  }
);

export default api;
