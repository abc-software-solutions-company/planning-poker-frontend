import tracking from '@/components/common/third-party/tracking';
import {API_ENDPOINTS} from '@/configs/endpoint.config';
import http from '@/utils/http';

import {IAuthInfor, IAuthLogin, IAuthResponse} from './types/auth.type';
import {IRoomCreate, IRoomFullResponse, IRoomGet, IRoomResponse} from './types/room.type';
import {IStoryComplete, IStoryCreate, IStoryResponse, IStoryUpdate} from './types/story.type';
import {IUserRoomCreate, IUserRoomUpdate} from './types/userRoom.type';
import {IUserStoryCreate, IUserStoryResponse, IUserStoryUpdate} from './types/userStory.type';

const api = {
  auth: {
    login: (data: IAuthLogin) => {
      tracking.event({name: 'Login'});
      return http.post<IAuthResponse>(API_ENDPOINTS.AUTH + '/login', data);
    },
    verify: () => http.get<IAuthInfor>(API_ENDPOINTS.AUTH + '/verify'),
    update: (data: IAuthLogin) => {
      tracking.event({name: 'Update Name'});
      return http.patch<IAuthInfor>(API_ENDPOINTS.AUTH, data);
    }
  },
  room: {
    all: () => http.get<IRoomResponse[]>(API_ENDPOINTS.ROOM),
    get: ({id}: IRoomGet) => http.get<IRoomFullResponse>(API_ENDPOINTS.ROOM + '/' + id),
    create: (data: IRoomCreate) => {
      tracking.event({name: 'Create Rroom'});
      return http.post<IRoomResponse>(API_ENDPOINTS.ROOM, data);
    }
  },
  story: {
    create: (data: IStoryCreate) => {
      tracking.event({name: 'Create Story'});
      return http.post<IStoryResponse>(API_ENDPOINTS.STORY, data);
    },
    update: (data: IStoryUpdate) => {
      tracking.event({name: 'Update Story'});
      return http.patch<IStoryResponse>(API_ENDPOINTS.STORY, data);
    },
    complete: (data: IStoryComplete) => {
      tracking.event({name: 'Complete Story'});
      return http.patch<IStoryResponse>(API_ENDPOINTS.STORY + '/complete', data);
    }
  },
  userRoom: {
    create: (data: IUserRoomCreate) => {
      tracking.event({name: 'Join Room'});
      return http.post<IRoomResponse>(API_ENDPOINTS.USERROOM, data);
    },
    update: (data: IUserRoomUpdate) => {
      if (data.isOnline) tracking.event({name: 'Online'});
      else tracking.event({name: 'Offline'});
      return http.patch<IRoomResponse>(API_ENDPOINTS.USERROOM, data);
    }
  },
  userStory: {
    create: (data: IUserStoryCreate) => {
      tracking.event({name: 'Join Story'});
      return http.post<IUserStoryResponse>(API_ENDPOINTS.USERSTORY, data);
    },
    update: (data: IUserStoryUpdate) => {
      tracking.event({name: 'Update Story'});
      return http.patch<IUserStoryResponse>(API_ENDPOINTS.USERSTORY, data);
    }
  }
};

export default api;
