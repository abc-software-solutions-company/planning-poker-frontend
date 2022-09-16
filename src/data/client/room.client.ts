import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import api from '../http';
import {IStoryResponse} from './story.client';
import {IUserRoomResponse} from './userRoom.client';

//
export interface IRoomCreate {
  name: string;
}
export interface IRoomGet {
  id: string;
}
export interface IRoomResponse extends IBaseResponse, IRoomCreate, IRoomGet {
  hostUserId: string;
  userRooms: IUserRoomResponse[];
  stories: IStoryResponse[];
}
//function
export function getRoom({id}: IRoomGet) {
  return api.get<IRoomResponse>(API_ENDPOINTS.ROOM + '/' + id);
}
export function allRoom() {
  return api.get<IRoomResponse[]>(API_ENDPOINTS.ROOM);
}
export function createRoom(data: IRoomCreate) {
  return api.post<IRoomResponse>(API_ENDPOINTS.ROOM, data);
}
