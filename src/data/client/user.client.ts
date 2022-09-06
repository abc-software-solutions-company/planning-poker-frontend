import {API_ENDPOINTS} from '@/configs/endpoint.config';
import {IBaseResponse} from '@/types';

import API from '../API';
import {IResultRespone} from './Result.client';

//type
export interface ICreateUser {
  name: string;
}

export interface IGetUser {
  id: string;
}

export interface IUserResponse extends IBaseResponse, ICreateUser, IGetUser {
  results: IResultRespone[];
}

//function
export function createUser(data: ICreateUser) {
  return API.post<IUserResponse>(API_ENDPOINTS.USER, data);
}

export function getUser({id}: IGetUser) {
  return API.get<IUserResponse>(`${API_ENDPOINTS.USER}/${id}`);
}
