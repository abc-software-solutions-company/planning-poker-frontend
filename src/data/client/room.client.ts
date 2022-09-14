import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IStoryResponse} from './story.client';
import {IUserRoomResponse} from './userRoom.client';

//
export interface ICreateRoom {
  name: string;
  hostUserId: string;
}
export interface IGetRoom {
  id: string;
}
export interface IRoomResponse extends IBaseResponse, ICreateRoom, IGetRoom {
  userRooms: IUserRoomResponse[];
  stories: IStoryResponse[];
}
//function
export function getRoom({id}: IGetRoom) {
  return api.get<IRoomResponse>(API_ENDPOINTS.ROOM + '/' + id);
}
export function allRoom() {
  return api.get<IRoomResponse[]>(API_ENDPOINTS.ROOM);
}
export function createRoom(data: ICreateRoom) {
  return api.post<IRoomResponse>(API_ENDPOINTS.ROOM, data);
}
