import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IUserResponse} from './user.client';

//type
export interface ICreateUserRoom {
  userId: string;
  roomId: string;
}
export interface IUpdateUserRoom extends ICreateUserRoom {
  isOnline?: boolean;
}

export interface IUserRoomResponse extends IBaseResponse, ICreateUserRoom {
  isOnline: boolean;
  user: IUserResponse;
}

//function
export function createUserRoom(data: ICreateUserRoom) {
  return api.post<IUserRoomResponse>(API_ENDPOINTS.USERROOM, data);
}

export function updateUserRoom(data: IUpdateUserRoom) {
  return api.patch<IUserRoomResponse>(API_ENDPOINTS.USERROOM, data);
}
