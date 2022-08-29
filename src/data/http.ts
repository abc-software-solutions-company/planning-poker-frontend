import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {ICreateRoom, ICreateStory, ICreateUser, IGetUSR, IRoom, IStory, IUser} from '@/types';
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
    get: async (id: string) => {
      return HttpClient.get<IStory>(`${API_ENDPOINTS.STORY}/${id}`);
    },
    post: async (data: ICreateStory) => {
      return HttpClient.post<IStory>(`${API_ENDPOINTS.STORY}`, data);
    }
  };

  usr = {
    get: async (params: IGetUSR) => {
      const {userId, storyId, roomId} = params;
      return HttpClient.get<IStory>(`${API_ENDPOINTS.STORY}/${userId}/${storyId}/${roomId}`);
    },
    post: async (data: ICreateStory) => {
      return HttpClient.post<IStory>(`${API_ENDPOINTS.STORY}`, data);
    }
  };
}

export default new HttpBase();
