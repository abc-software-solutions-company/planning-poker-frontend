import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {
  ICreateRoom,
  ICreateStory,
  ICreateUser,
  ICreateUSR,
  IFullUSR,
  IGetUSR,
  IRoom,
  IStory,
  IUpdateUSR,
  IUser,
  IUSR
} from '@/types';
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
    all: async () => {
      return HttpClient.get<IRoom[]>(`${API_ENDPOINTS.ROOM}`);
    },
    get: async (id: string) => {
      return HttpClient.get<IRoom>(`${API_ENDPOINTS.ROOM}/${id}`);
    },
    post: async (data: ICreateRoom) => {
      return HttpClient.post<IRoom>(`${API_ENDPOINTS.ROOM}`, data);
    }
  };

  stories = {
    get: async (id: string) => {
      return HttpClient.get<IStory>(`${API_ENDPOINTS.STORY}/${id}`);
    },
    post: async (data: ICreateStory) => {
      return HttpClient.post<IStory>(`${API_ENDPOINTS.STORY}`, data);
    },
    finish: async (id: string) => {
      return HttpClient.get<IStory>(`${API_ENDPOINTS.STORY}/finish/${id}`);
    }
  };

  usrs = {
    allbyRoom: async (params: IGetUSR) => {
      const {roomId} = params;
      return HttpClient.get<IFullUSR[]>(`${API_ENDPOINTS.USR}/all/${roomId}`);
    },
    get: async (params: IGetUSR) => {
      const {roomId} = params;
      return HttpClient.get<IFullUSR>(`${API_ENDPOINTS.USR}/${roomId}`);
    },
    post: async (data: ICreateUSR) => {
      return HttpClient.post<IUSR>(`${API_ENDPOINTS.USR}`, data);
    },
    patch: async (data: IUpdateUSR) => {
      return HttpClient.patch<IUSR>(`${API_ENDPOINTS.USR}`, data);
    }
  };
}

export default new HttpBase();
