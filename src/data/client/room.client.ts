import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import API from '../API';
import {IActResponse} from './Atc.client';
import {IStoryResponse} from './story.client';

//
export interface ICreateRoom {
  name: string;
  hostUserId: string;
}
export interface IGetRoom {
  id: number;
}
export interface IRoomResponse extends IBaseResponse, ICreateRoom, IGetRoom {
  acts: IActResponse[];
  stories: IStoryResponse[];
}
//function
export function getRoom({id}: IGetRoom) {
  return API.get<IRoomResponse>(`${API_ENDPOINTS.ROOM}/${id}`);
}
export function allRoom() {
  return API.get<IRoomResponse[]>(API_ENDPOINTS.ROOM);
}
export function createRoom(data: ICreateRoom) {
  return API.post<IRoomResponse>(API_ENDPOINTS.ROOM, data);
}
