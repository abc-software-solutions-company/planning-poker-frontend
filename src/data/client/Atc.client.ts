import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import API from '../API';
import {IUserResponse} from './user.client';

//type
export interface ICreateAtc {
  userId: string;
  roomId: number;
}
export interface IUpdateAtc extends ICreateAtc {
  isOnline?: boolean;
}

export interface IActResponse extends IBaseResponse, ICreateAtc {
  isOnline: boolean;
  user: IUserResponse;
}

//function
export function createAtc(data: ICreateAtc) {
  return API.post<IActResponse>(API_ENDPOINTS.ACT, data);
}

export function updateAtc(data: IUpdateAtc) {
  return API.patch<IActResponse>(API_ENDPOINTS.ACT, data);
}
