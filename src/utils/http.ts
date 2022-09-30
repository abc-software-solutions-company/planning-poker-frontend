import axios from 'axios';

import {ROUTES} from '@/configs/routes.config';
import Cookie from '@/utils/cookie';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    api_key: process.env.NEXT_PUBLIC_API_KEY || '',
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  config => {
    config.headers = {...config.headers};
    console.log(config.headers.api_key);
    if (typeof window !== 'undefined') {
      const accessToken = Cookie.accessToken.get();
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => err
);

http.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err?.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = ROUTES.LOGIN;
      }
    }
    console.log(err.response);
    return err;
  }
);

export default http;
