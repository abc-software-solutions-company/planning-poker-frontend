import qs from 'qs';

import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateRoom, ICreateStory, ICreateUser, IRoom, IStory, IUser} from '@/types';
import {HttpClient} from '@/utils/http-client';

class HttpBase {
  users = {
    get: async (id: string) => {
      return HttpClient.get<IUser>(`${API_ENDPOINTS.USER}/${id}`);
    },
    post: async (data: ICreateUser) => {
      return HttpClient.post<IUser>(`${API_ENDPOINTS.USER}`, data);
    }
  };

  rooms = {
    get: async (id: string) => {
      return HttpClient.get<IRoom>(`${API_ENDPOINTS.ROOM}/${id}`);
    },
    post: async (data: ICreateRoom) => {
      return HttpClient.post<IRoom>(`${API_ENDPOINTS.ROOM}`, data);
    }
  };

  stories = {
    all: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IStory>(`${API_ENDPOINTS.STORY}${query}`);
    },
    get: async (params?: unknown) => {
      const query = qs.stringify(params, {encodeValuesOnly: true});
      return HttpClient.get<IStory>(`${API_ENDPOINTS.STORY}${query}`);
    },
    post: async (data: ICreateStory) => {
      return HttpClient.post<IStory>(`${API_ENDPOINTS.STORY}`, data);
    }
  };
}

export default new HttpBase();
