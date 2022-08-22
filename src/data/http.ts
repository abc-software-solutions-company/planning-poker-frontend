import qs from 'qs';

import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateUser, IUser} from '@/types';
import {HttpClient} from '@/utils/http-client';

class HttpBase {
  users = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IUser>(`${API_ENDPOINTS.USER}${query}`);
    },
    get: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IUser>(`${API_ENDPOINTS.USER}${query}`);
    },
    post: async (data: ICreateUser) => {
      return HttpClient.post<IUser>(`${API_ENDPOINTS.USER}`, data);
    }
  };
}

export default new HttpBase();
