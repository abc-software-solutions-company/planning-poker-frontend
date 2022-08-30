import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// const token = process.env.NEXT_STRAPI_API_TOKEN;

// // Change request
// AxiosInstance.interceptors.request.use(config => {
//   config.headers = {
//     ...config.headers
//   };

//   if (token) config.headers.Authorization = `Bearer ${token}`;

//   return config;
// });

// Change response
AxiosInstance.interceptors.response.use(
  response => response,
  error => error
);

export class HttpClient {
  static async get<T>(url: string) {
    const response = await AxiosInstance.get<T>(url);
    return response;
  }

  static async post<T>(url: string, data: unknown, options?: any) {
    const response = await AxiosInstance.post<T>(url, data, options);
    return response;
  }

  static async patch<T>(url: string, data: unknown) {
    const response = await AxiosInstance.patch<T>(url, data);
    return response;
  }

  static async delete<T>(url: string) {
    const response = await AxiosInstance.delete<T>(url);
    return response;
  }
}
