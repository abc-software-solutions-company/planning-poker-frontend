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
      const token = Cookie.get('_userId');
      if (token) config.headers.Authorization = token;
    }

    return config;
  },
  err => err
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
    return err;
  }
);

export default api;
