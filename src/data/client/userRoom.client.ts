import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IUserResponse} from './user.client';

//type
export interface IUserRoomCreate {
  roomId: string;
}
export interface IUserRoomUpdate extends IUserRoomCreate {
  isOnline: boolean;
}

export interface IUserRoomResponse extends IBaseResponse, IUserRoomCreate {
  userId: string;
  user: IUserResponse;
}

//function
export function createUserRoom(data: IUserRoomCreate) {
  return api.post<IUserRoomResponse>(API_ENDPOINTS.USERROOM, data);
}

export function updateUserRoom(data: IUserRoomUpdate) {
  return api.patch<IUserRoomResponse>(API_ENDPOINTS.USERROOM, data);
}
